import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

function geminiProxyPlugin() {
  return {
    name: "gemini-proxy-plugin",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === "/api/forecast" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk;
          });

          req.on("end", async () => {
            try {
              const payload = JSON.parse(body || "{}");
              const apiKey = process.env.GEMINI_API_KEY;
              const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

              if (!apiKey) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                  isFallback: true,
                  modelUsed: "AarogyaFlow Deterministic Engine (GEMINI_API_KEY omitted in .env)"
                }));
                return;
              }

              const prompt = `
You are AarogyaFlow AI, India's National Primary Health Centre supply-chain intelligence agent.
Analyze the following aggregated PHC facility data and provide a forecast and cross-district redistribution recommendation.
Language to formulate explanations: ${payload.language || "en"}.

Facility Data:
${JSON.stringify(payload, null, 2)}

Return ONLY valid JSON matching this schema exactly (no markdown backticks, no preamble):
{
  "riskLevel": "CRITICAL" | "HIGH" | "MODERATE" | "LOW",
  "predictedStockOutDate": "YYYY-MM-DD",
  "affectedResources": ["Resource name and reason"],
  "explanation": "Clear explanation of why this risk is predicted",
  "dataSignals": ["Signal 1", "Signal 2", "Signal 3"],
  "recommendedActions": ["Action 1", "Action 2", "Action 3"],
  "nearbyFacilityNotifications": [
    {
      "hospitalName": "Nearby Hospital Name",
      "district": "District",
      "distanceKm": 35.0,
      "resourceRequested": "Medicine/Resource name",
      "quantityRequested": "Quantity and unit",
      "urgency": "Immediate (Within 6h)" | "High (Within 24h)" | "Routine",
      "channels": { "inApp": true, "sms": true, "whatsapp": true, "email": true }
    }
  ],
  "redistributionPlan": [
    {
      "id": "TR-GEN-01",
      "sourcePhcId": "Surplus PHC ID",
      "sourcePhcName": "Surplus PHC Name",
      "destinationPhcId": "${payload.phc?.id || "PHC-BXR-012"}",
      "destinationPhcName": "${payload.phc?.name || "PHC"}",
      "resourceCategory": "medicine",
      "resourceName": "Medicine name",
      "recommendedQuantity": 500,
      "unit": "Sachets/Strips/Vials",
      "distanceKm": 38.5,
      "urgency": "Immediate (Within 6h)",
      "estimatedStockOutDate": "2026-09-20",
      "status": "pending"
    }
  ]
}
`;

              const geminiRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                      temperature: 0.2,
                      responseMimeType: "application/json"
                    }
                  })
                }
              );

              if (!geminiRes.ok) {
                const errText = await geminiRes.text();
                console.warn("Gemini API error response:", errText);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                  isFallback: true,
                  modelUsed: `AarogyaFlow Fallback (Gemini API HTTP ${geminiRes.status})`
                }));
                return;
              }

              const geminiData = await geminiRes.json();
              const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

              if (candidateText) {
                const cleanJson = candidateText.replace(/^```json\s*|```$/gi, "").trim();
                const parsed = JSON.parse(cleanJson);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                  ...parsed,
                  isFallback: false,
                  modelUsed: `Gemini API (${model})`
                }));
                return;
              }

              throw new Error("Empty candidate response from Gemini API");
            } catch (err: any) {
              console.warn("Gemini Proxy exception:", err.message);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({
                isFallback: true,
                modelUsed: "AarogyaFlow Fallback Engine"
              }));
            }
          });
          return;
        }

        if (req.url === "/api/datagov/status" && req.method === "GET") {
          const key = process.env.DATA_GOV_IN_API_KEY;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            live: Boolean(key && key.trim().length > 0),
            message: key
              ? "Connected to data.gov.in API Gateway."
              : "data.gov.in API key not configured. Using certified historical baseline."
          }));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [geminiProxyPlugin()],
  server: {
    port: 5173
  }
});
