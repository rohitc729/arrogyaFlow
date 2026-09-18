import { t, getLanguage } from "../i18n/translations";
import { FacilityOperationalDataService } from "../services/FacilityOperationalDataService";
import { GeminiForecastService } from "../services/GeminiForecastService";
import { ForecastResult, PHC } from "../types";

export interface ForecastViewProps {
  initialPhcId?: string;
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export function renderForecastView(props: ForecastViewProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "page-fade-in";

  const dataService = FacilityOperationalDataService.getInstance();
  const allPhcs = dataService.getPhcs();
  let currentPhcId = props.initialPhcId || "PHC-BXR-012";
  let selectedHorizon: 7 | 15 | 30 = 7;
  let activeForecast: ForecastResult | null = null;
  let isLoading = false;

  const tr = t();
  const lang = getLanguage();

  const render = () => {
    const currentPhc = dataService.getPhcById(currentPhcId) || allPhcs[0];

    container.innerHTML = `
      <!-- Header / Configuration Banner -->
      <div class="clay-card" style="margin-bottom: 1.75rem; padding: 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
          <div>
            <div class="clay-badge clay-badge-info" style="margin-bottom:0.4rem;">
              🤖 Gemini Multimodal Agent & Predictive Logistics
            </div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-heading);">
              ${tr.forecast.title}
            </h2>
            <p style="font-size: 0.9rem; color: var(--text-muted);">
              ${tr.forecast.subtitle}
            </p>
          </div>

          <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
            <!-- Select PHC -->
            <div>
              <label class="filter-label" style="display:block; margin-bottom:0.3rem;">Target Health Centre</label>
              <select class="clay-select" id="forecast-phc-select" style="min-width:240px;">
                ${allPhcs.map(p => `
                  <option value="${p.id}" ${p.id === currentPhc.id ? "selected" : ""}>
                    ${p.name} (${p.district})
                  </option>
                `).join("")}
              </select>
            </div>

            <!-- Horizon Selector -->
            <div>
              <label class="filter-label" style="display:block; margin-bottom:0.3rem;">Time Horizon</label>
              <div style="display:flex; gap:0.35rem;">
                <button class="clay-btn horizon-btn ${selectedHorizon === 7 ? "clay-btn-primary" : ""}" data-days="7">7 Days</button>
                <button class="clay-btn horizon-btn ${selectedHorizon === 15 ? "clay-btn-primary" : ""}" data-days="15">15 Days</button>
                <button class="clay-btn horizon-btn ${selectedHorizon === 30 ? "clay-btn-primary" : ""}" data-days="30">30 Days</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(162,178,200,0.3); padding-top:1rem; flex-wrap:wrap; gap:0.75rem;">
          <span style="font-size:0.85rem; color:var(--text-muted);">
            Active Model: <strong style="color:var(--color-blue);">${activeForecast ? activeForecast.modelUsed : "Gemini 1.5 Flash (Free Tier) / Auto Fallback"}</strong>
          </span>

          <button class="clay-btn clay-btn-primary" id="btn-run-forecast" ${isLoading ? "disabled" : ""} style="padding:0.75rem 1.6rem; font-size:0.95rem;">
            ${isLoading ? "⏳ Generating Predictions..." : `⚡ ${tr.forecast.runForecastBtn}`}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      ${isLoading ? `
        <div class="clay-card skeleton" style="height: 380px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:1rem; margin-bottom:1.75rem;">
          <div style="font-size:2.5rem;">🤖</div>
          <strong style="color:var(--text-heading);">${tr.forecast.aiAnalyzing}</strong>
          <p style="font-size:0.85rem; color:var(--text-muted);">Aggregating regional patient footfall velocity, drug consumption rates & buffer limits...</p>
        </div>
      ` : ""}

      <!-- Forecast Content Section -->
      ${activeForecast && !isLoading ? renderForecastResults(activeForecast, tr) : ""}

      <!-- Human in the Loop Mandatory Disclaimer -->
      <div class="clay-card-flat" style="background:#fef3c7; border:1px solid #fde68a; border-radius:var(--radius-md); padding:1rem 1.25rem; margin-top:2rem;">
        <p style="font-size:0.84rem; color:#92400e; display:flex; align-items:center; gap:0.5rem;">
          <span>⚖️</span>
          <span><strong>Human Verification Mandate:</strong> ${tr.forecast.disclaimer}</span>
        </p>
      </div>
    `;

    // Handlers
    container.querySelector("#forecast-phc-select")?.addEventListener("change", (e) => {
      currentPhcId = (e.target as HTMLSelectElement).value;
      activeForecast = null;
      render();
    });

    container.querySelectorAll(".horizon-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedHorizon = Number((btn as HTMLElement).dataset.days) as 7 | 15 | 30;
        render();
      });
    });

    container.querySelector("#btn-run-forecast")?.addEventListener("click", async () => {
      isLoading = true;
      render();

      try {
        const phc = dataService.getPhcById(currentPhcId) || allPhcs[0];
        activeForecast = await GeminiForecastService.generateForecast(phc, selectedHorizon, lang);
      } finally {
        isLoading = false;
        render();
      }
    });

    // Transfer and Contact handlers
    container.querySelectorAll(".btn-approve-transfer").forEach(btn => {
      btn.addEventListener("click", () => {
        const transferId = (btn as HTMLElement).dataset.transferId;
        if (transferId) {
          dataService.approveTransfer(transferId);
          alert(tr.forecast.approvedSuccess);
          render();
        }
      });
    });

    container.querySelectorAll(".btn-contact-phc").forEach(btn => {
      btn.addEventListener("click", () => {
        const phcName = (btn as HTMLElement).dataset.phcName;
        alert(`Connecting to Emergency Logistics Coordinator at ${phcName} via Hotline: +91 94318 44004 / VHF Radio Channel 4.`);
      });
    });
  };

  // Initial auto-run for default critical PHC
  setTimeout(async () => {
    const phc = dataService.getPhcById(currentPhcId) || allPhcs[0];
    activeForecast = await GeminiForecastService.generateForecast(phc, selectedHorizon, lang);
    render();
  }, 100);

  render();
  return container;
}

function renderForecastResults(fc: ForecastResult, tr: any): string {
  const isCritical = fc.riskLevel === "CRITICAL";

  return `
    <!-- Explainable AI Summary Card -->
    <div class="clay-card" style="margin-bottom: 1.75rem; border-left: 5px solid ${isCritical ? "var(--color-coral)" : "var(--color-blue)"};">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:1rem;">
        <div>
          <span class="clay-badge ${isCritical ? "clay-badge-critical" : "clay-badge-info"}">
            Forecast Risk: ${fc.riskLevel}
          </span>
          <span class="clay-badge" style="background:#edf3f8; color:var(--text-muted); margin-left:0.5rem;">
            Horizon: Next ${fc.forecastDays} Days
          </span>
        </div>
        <div style="font-size:0.8rem; color:var(--text-muted);">
          Estimated Earliest Stock-Out: <strong style="color:var(--color-coral);">${fc.predictedStockOutDate}</strong>
        </div>
      </div>

      <!-- Why is this predicted -->
      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-heading); margin-bottom:0.4rem;">
          ❓ ${tr.forecast.whyRisk}
        </h4>
        <p style="font-size:0.95rem; color:var(--text-main); line-height:1.5;">
          ${fc.explanation}
        </p>
      </div>

      <!-- Signals Grid -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
        <div class="clay-card-flat">
          <h5 style="font-size:0.9rem; font-weight:700; color:var(--color-blue); margin-bottom:0.5rem;">
            📡 ${tr.forecast.signals}
          </h5>
          <ul style="padding-left:1.2rem; font-size:0.85rem; color:var(--text-main); line-height:1.6;">
            ${fc.dataSignals.map(s => `<li>${s}</li>`).join("")}
          </ul>
        </div>

        <div class="clay-card-flat">
          <h5 style="font-size:0.9rem; font-weight:700; color:var(--color-teal); margin-bottom:0.5rem;">
            💡 ${tr.forecast.recommendedActions}
          </h5>
          <ul style="padding-left:1.2rem; font-size:0.85rem; color:var(--text-main); line-height:1.6;">
            ${fc.recommendedActions.map(a => `<li>${a}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>

    <!-- Cross-District Redistribution Plans -->
    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-heading); margin-bottom: 1rem;">
      🚚 ${tr.forecast.redistributionTitle}
    </h3>

    ${fc.redistributionPlan.length === 0 ? `
      <div class="clay-card" style="text-align:center; padding:2rem; color:var(--text-muted);">
        No external resource transfer required. All essentials safely stocked above buffer thresholds.
      </div>
    ` : `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
        ${fc.redistributionPlan.map(plan => `
          <div class="clay-card" style="display:flex; flex-direction:column; justify-content:space-between; border-top:4px solid var(--color-blue);">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <span class="clay-badge clay-badge-info">Transfer Order #${plan.id}</span>
                <span class="clay-badge ${plan.status === "approved" ? "clay-badge-stable" : "clay-badge-moderate"}">
                  ${plan.status.toUpperCase()}
                </span>
              </div>

              <h4 style="font-size:1.15rem; font-weight:800; color:var(--text-heading); margin-bottom:0.75rem;">
                ${plan.recommendedQuantity} ${plan.unit} of ${plan.resourceName}
              </h4>

              <div style="background:#f8fafc; border-radius:var(--radius-sm); padding:0.85rem; font-size:0.85rem; line-height:1.6; margin-bottom:1rem;">
                <strong>${tr.forecast.fromSource}:</strong> ${plan.sourcePhcName}<br/>
                <strong>${tr.forecast.toDestination}:</strong> ${plan.destinationPhcName}<br/>
                <strong>${tr.forecast.distance}:</strong> <span style="color:var(--color-blue); font-weight:700;">${plan.distanceKm} km</span> (~55 mins transit)<br/>
                <strong>${tr.forecast.urgency}:</strong> <span class="clay-badge clay-badge-critical" style="font-size:0.75rem;">${plan.urgency}</span>
              </div>
            </div>

            <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
              ${plan.status === "pending" ? `
                <button class="clay-btn clay-btn-primary btn-approve-transfer" data-transfer-id="${plan.id}" style="flex:1;">
                  ✓ ${tr.forecast.approveTransfer}
                </button>
              ` : `
                <button class="clay-btn clay-btn-success" disabled style="flex:1;">
                  ✓ Authorized & Scheduled
                </button>
              `}
              <button class="clay-btn btn-contact-phc" data-phc-name="${plan.sourcePhcName}">
                📞 ${tr.forecast.contactNearby}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `}
  `;
}
