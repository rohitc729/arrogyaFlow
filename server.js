import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    appName: "AarogyaFlow AI",
    timestamp: new Date().toISOString()
  });
});

// 2. Data.gov.in Status
app.get("/api/datagov/status", (req, res) => {
  const key = process.env.DATA_GOV_IN_API_KEY;
  res.json({
    live: Boolean(key && key.trim().length > 0),
    message: key
      ? "Connected to data.gov.in API Gateway."
      : "data.gov.in API key not configured. Using certified historical baseline."
  });
});

// 3. Gemini Forecast Proxy Endpoint (Keeps API Key Secure)
app.post("/api/forecast", async (req, res) => {
  try {
    const payload = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

    if (!apiKey) {
      return res.json({
        isFallback: true,
        modelUsed: "AarogyaFlow Deterministic Engine (GEMINI_API_KEY omitted in .env)"
      });
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
      return res.json({
        isFallback: true,
        modelUsed: `AarogyaFlow Fallback (Gemini API HTTP ${geminiRes.status})`
      });
    }

    const geminiData = await geminiRes.json();
    const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText) {
      const cleanJson = candidateText.replace(/^```json\s*|```$/gi, "").trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({
        ...parsed,
        isFallback: false,
        modelUsed: `Gemini API (${model})`
      });
    }

    throw new Error("Empty candidate response from Gemini API");
  } catch (err) {
    console.warn("Gemini Server Proxy Exception:", err.message);
    return res.json({
      isFallback: true,
      modelUsed: "AarogyaFlow Fallback Engine"
    });
  }
});

// Serve production static assets if built
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"), (err) => {
    if (err) {
      res.send("AarogyaFlow AI server running. In development mode, run `npm run dev` to access the Vite frontend.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 AarogyaFlow AI Server listening on http://localhost:${PORT}`);
  console.log(`🔒 Gemini API Key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
  console.log(`🤖 Model Target: ${process.env.GEMINI_MODEL || "gemini-1.5-flash"}`);
  console.log(`======================================================\n`);
});
