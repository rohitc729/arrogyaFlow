import { t, getLanguage } from "../i18n/translations";
import { FacilityOperationalDataService } from "../services/FacilityOperationalDataService";
import { speakAlert } from "../services/speech";
import { showCriticalAlarmModal } from "../components/AlarmModal";
import { Alert, SupportedLanguage } from "../types";

export interface AlertCentreViewProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export function renderAlertCentreView(props: AlertCentreViewProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "page-fade-in";

  const dataService = FacilityOperationalDataService.getInstance();
  const alerts = dataService.getAlerts();
  let severityFilter: "all" | "critical" | "warning" | "resolved" = "all";

  const tr = t();
  const lang = getLanguage();

  const render = () => {
    let filteredAlerts = alerts;
    if (severityFilter === "critical") {
      filteredAlerts = alerts.filter(a => a.severity === "critical" && a.status !== "resolved");
    } else if (severityFilter === "warning") {
      filteredAlerts = alerts.filter(a => a.severity === "warning" && a.status !== "resolved");
    } else if (severityFilter === "resolved") {
      filteredAlerts = alerts.filter(a => a.status === "resolved");
    }

    const activeCriticalCount = alerts.filter(a => a.severity === "critical" && a.status === "active").length;

    container.innerHTML = `
      <!-- Header Banner with Urgent Alarm Button -->
      <div class="clay-card ${activeCriticalCount > 0 ? "alarm-active" : ""}" style="margin-bottom: 1.75rem; padding: 1.5rem; border: 2px solid ${activeCriticalCount > 0 ? "var(--color-coral)" : "var(--color-blue)"};">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
              <span class="clay-badge clay-badge-critical">
                🚨 ${activeCriticalCount} Critical Life-Saving Alarms
              </span>
              <span class="clay-badge clay-badge-info">Automated Triage Active</span>
            </div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-heading);">
              ${tr.alerts.title}
            </h2>
            <p style="font-size: 0.9rem; color: var(--text-muted);">
              ${tr.alerts.subtitle}
            </p>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <button class="clay-btn clay-btn-danger" id="btn-trigger-top-alarm">
              ⚡ Launch Emergency Alarm Popup
            </button>
            <button class="clay-btn" id="btn-broadcast-all" style="background:#fff;">
              📢 ${tr.alerts.dispatchNotificationBtn}
            </button>
          </div>
        </div>
      </div>

      <!-- Severity Filter Pills -->
      <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; flex-wrap:wrap;">
        <button class="clay-btn filter-btn ${severityFilter === "all" ? "clay-btn-primary" : ""}" data-sev="all">
          All Alerts (${alerts.length})
        </button>
        <button class="clay-btn filter-btn ${severityFilter === "critical" ? "clay-btn-danger" : ""}" data-sev="critical">
          Critical (${alerts.filter(a => a.severity === "critical" && a.status !== "resolved").length})
        </button>
        <button class="clay-btn filter-btn ${severityFilter === "resolved" ? "clay-btn-success" : ""}" data-sev="resolved">
          Resolved (${alerts.filter(a => a.status === "resolved").length})
        </button>
      </div>

      <!-- Alert Feed -->
      <div style="display:flex; flex-direction:column; gap:1.25rem; margin-bottom:2.5rem;">
        ${filteredAlerts.length === 0 ? `
          <div class="clay-card" style="text-align:center; padding:3rem; color:var(--text-muted);">
            No alerts currently in this category. All facilities operational.
          </div>
        ` : filteredAlerts.map(alert => renderAlertCard(alert, lang, tr)).join("")}
      </div>

      <!-- Simulated Multi-Channel Notification Dispatch Panel -->
      <div class="clay-card" id="dispatch-panel" style="margin-bottom:2rem; padding:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading);">
              📡 Simulated Emergency Dispatch Broadcast Network
            </h3>
            <p style="font-size: 0.82rem; color: var(--text-muted);">
              Automated multi-channel push to nearby hospitals, CMOs, and cold-chain ambulances
            </p>
          </div>
          <span class="clay-badge clay-badge-stable">Integrated MoHFW SMS/NIC Gateway</span>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
          <!-- Recipient 1 -->
          <div class="clay-card-flat" style="border-left: 4px solid var(--color-blue);">
            <strong style="font-size:0.95rem; color:var(--text-heading);">PHC Ara Rural (Sector 04)</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0.25rem 0 0.5rem 0;">
              📍 Distance: 38.5 km · Bhojpur District
            </p>
            <div style="font-size:0.8rem; line-height:1.5; margin-bottom:0.6rem;">
              <strong>Resource:</strong> 500 ORS Sachets (Immediate)<br/>
              <strong>Status:</strong> <span class="clay-badge clay-badge-stable" style="font-size:0.7rem;">SMS Sent & Read</span>
            </div>
            <div style="font-size:0.72rem; color:var(--text-light);">Dispatched to: MOIC Dr. S. Tiwary (+91 94318 44004)</div>
          </div>

          <!-- Recipient 2 -->
          <div class="clay-card-flat" style="border-left: 4px solid var(--color-blue);">
            <strong style="font-size:0.95rem; color:var(--text-heading);">Buxar Sub-Divisional Hospital (SDH Dumraon)</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0.25rem 0 0.5rem 0;">
              📍 Distance: 18.2 km · Buxar District
            </p>
            <div style="font-size:0.8rem; line-height:1.5; margin-bottom:0.6rem;">
              <strong>Resource:</strong> 4 Oxygen Cylinders, 10 ASV Vials<br/>
              <strong>Status:</strong> <span class="clay-badge clay-badge-stable" style="font-size:0.7rem;">WhatsApp Bot Confirmed</span>
            </div>
            <div style="font-size:0.72rem; color:var(--text-light);">Dispatched to: Hospital Superintendent (+91 94318 99120)</div>
          </div>

          <!-- Recipient 3 -->
          <div class="clay-card-flat" style="border-left: 4px solid var(--color-blue);">
            <strong style="font-size:0.95rem; color:var(--text-heading);">Patna Medical Cold-Chain Depot</strong>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:0.25rem 0 0.5rem 0;">
              📍 Distance: 120 km · Patna State Hub
            </p>
            <div style="font-size:0.8rem; line-height:1.5; margin-bottom:0.6rem;">
              <strong>Resource:</strong> Rabies Vaccine & Paracetamol Batch<br/>
              <strong>Status:</strong> <span class="clay-badge" style="background:#fef3c7; color:#b45309; font-size:0.7rem;">Warehouse Queueing</span>
            </div>
            <div style="font-size:0.72rem; color:var(--text-light);">e-Aushadhi Indent ID: EA-2026-98124</div>
          </div>
        </div>
      </div>
    `;

    // Handlers
    container.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        severityFilter = (btn as HTMLElement).dataset.sev as any;
        render();
      });
    });

    container.querySelector("#btn-trigger-top-alarm")?.addEventListener("click", () => {
      const topAlert = alerts.find(a => a.severity === "critical" && a.status === "active") || alerts[0];
      showCriticalAlarmModal(topAlert, () => render(), () => render());
    });

    container.querySelector("#btn-broadcast-all")?.addEventListener("click", () => {
      alert(tr.alerts.dispatchedSuccess);
      container.querySelector("#dispatch-panel")?.scrollIntoView({ behavior: "smooth" });
    });

    // Alert card actions
    container.querySelectorAll(".btn-speak-alert").forEach(btn => {
      btn.addEventListener("click", () => {
        const text = (btn as HTMLElement).dataset.message || "";
        speakAlert(text, lang);
      });
    });

    container.querySelectorAll(".btn-ack-alert").forEach(btn => {
      btn.addEventListener("click", () => {
        const alertId = (btn as HTMLElement).dataset.alertId || "";
        dataService.acknowledgeAlert(alertId);
        render();
      });
    });

    container.querySelectorAll(".btn-resolve-alert").forEach(btn => {
      btn.addEventListener("click", () => {
        const alertId = (btn as HTMLElement).dataset.alertId || "";
        dataService.resolveAlert(alertId);
        render();
      });
    });

    container.querySelectorAll(".btn-modal-open").forEach(btn => {
      btn.addEventListener("click", () => {
        const alertId = (btn as HTMLElement).dataset.alertId || "";
        const targetAlert = alerts.find(a => a.id === alertId);
        if (targetAlert) {
          showCriticalAlarmModal(targetAlert, () => render(), () => render());
        }
      });
    });
  };

  render();
  return container;
}

function renderAlertCard(alert: Alert, lang: SupportedLanguage, tr: any): string {
  const msg = alert.message[lang] || alert.message.en;
  const isCritical = alert.severity === "critical";
  const isResolved = alert.status === "resolved";

  return `
    <div class="clay-card ${isCritical && alert.status === "active" ? "alarm-active" : ""}" style="border-left: 6px solid ${isCritical ? "var(--color-coral)" : "var(--color-amber)"};">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            <span class="clay-badge ${isCritical ? "clay-badge-critical" : "clay-badge-moderate"}">
              ${alert.severity.toUpperCase()}
            </span>
            <span class="clay-badge" style="background:#edf3f8; color:var(--text-muted); font-size:0.75rem;">
              Category: ${alert.resourceCategory.toUpperCase()}
            </span>
            <span class="clay-badge ${alert.status === "resolved" ? "clay-badge-stable" : alert.status === "acknowledged" ? "clay-badge-info" : "clay-badge-critical"}">
              Status: ${alert.status.toUpperCase()}
            </span>
          </div>
          <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-heading);">
            ${alert.phcName} (${alert.district}, ${alert.state})
          </h3>
        </div>

        <span style="font-size:0.78rem; color:var(--text-light);">
          Logged: ${alert.createdAt}
        </span>
      </div>

      <!-- Message text -->
      <p style="font-size:0.95rem; font-weight:600; color:${isCritical ? "#9f1239" : "var(--text-main)"}; line-height:1.5; margin-bottom:1rem; background:#fff; padding:0.75rem 1rem; border-radius:var(--radius-sm); box-shadow:inset 1px 1px 3px rgba(0,0,0,0.05);">
        ${msg}
      </p>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-top:1px solid rgba(162,178,200,0.25); padding-top:0.75rem;">
        <div style="font-size:0.82rem; color:var(--text-muted); display:flex; gap:1.25rem;">
          <span>Current Stock: <strong>${alert.currentLevel}</strong></span>
          <span>Buffer Need: <strong>${alert.minLevel}</strong></span>
          <span>Days Remaining: <strong style="color:var(--color-coral);">${alert.daysRemaining} days</strong></span>
        </div>

        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button class="clay-btn btn-speak-alert" data-message="${msg.replace(/"/g, "&quot;")}" style="font-size:0.8rem; padding:0.4rem 0.8rem;">
            🔊 ${tr.alerts.playAudioBtn}
          </button>

          <button class="clay-btn btn-modal-open" data-alert-id="${alert.id}" style="font-size:0.8rem; padding:0.4rem 0.8rem;">
            🚨 Urgent Modal
          </button>

          ${alert.status === "active" ? `
            <button class="clay-btn clay-btn-danger btn-ack-alert" data-alert-id="${alert.id}" style="font-size:0.8rem; padding:0.4rem 0.8rem;">
              ${tr.alerts.acknowledgeBtn}
            </button>
          ` : ""}

          ${!isResolved ? `
            <button class="clay-btn clay-btn-success btn-resolve-alert" data-alert-id="${alert.id}" style="font-size:0.8rem; padding:0.4rem 0.8rem;">
              ✓ ${tr.alerts.resolveBtn}
            </button>
          ` : ""}
        </div>
      </div>
    </div>
  `;
}
