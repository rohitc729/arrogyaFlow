import { Alert, SupportedLanguage } from "../types";
import { t, getLanguage } from "../i18n/translations";
import { speakAlert } from "../services/speech";
import { FacilityOperationalDataService } from "../services/FacilityOperationalDataService";

export function showCriticalAlarmModal(
  alert: Alert,
  onAcknowledge?: () => void,
  onApproveTransfer?: () => void
) {
  const existing = document.getElementById("critical-alarm-modal");
  if (existing) existing.remove();

  const lang = getLanguage();
  const tr = t();
  const messageText = alert.message[lang] || alert.message.en;

  const overlay = document.createElement("div");
  overlay.id = "critical-alarm-modal";
  overlay.className = "modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const modal = document.createElement("div");
  modal.className = "clay-card alarm-active";
  modal.style.maxWidth = "620px";
  modal.style.width = "100%";
  modal.style.border = "2px solid var(--color-coral)";
  modal.style.background = "#fff8f8";

  const transfer = alert.recommendedTransfer;

  modal.innerHTML = `
    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem;">
      <div style="width:52px; height:52px; border-radius:50%; background:var(--color-coral); display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.8rem; box-shadow:0 0 15px rgba(225,29,72,0.6);">
        🚨
      </div>
      <div>
        <span class="clay-badge clay-badge-critical">${tr.alerts.criticalPopupTitle}</span>
        <h2 style="font-size:1.25rem; font-weight:800; color:var(--text-heading); margin-top:0.25rem;">
          ${alert.phcName} (${alert.district}, ${alert.state})
        </h2>
      </div>
    </div>

    <div style="background:#ffffff; border-radius:var(--radius-md); padding:1rem 1.25rem; box-shadow:var(--clay-shadow-soft); margin-bottom:1.25rem; border-left:4px solid var(--color-coral);">
      <p style="font-size:1.05rem; font-weight:700; color:#9f1239; line-height:1.4;">
        ${messageText}
      </p>
      <div style="display:flex; gap:1.5rem; margin-top:0.75rem; font-size:0.85rem; color:var(--text-muted);">
        <span><strong>${tr.phcDetail.currentStock}:</strong> ${alert.currentLevel}</span>
        <span><strong>${tr.phcDetail.minSafeLevel}:</strong> ${alert.minLevel}</span>
        <span><strong>${tr.phcDetail.daysRemaining}:</strong> <span style="color:var(--color-coral); font-weight:800;">${alert.daysRemaining} days</span></span>
      </div>
    </div>

    ${transfer ? `
      <div style="background:var(--color-blue-tint); border-radius:var(--radius-md); padding:1rem 1.25rem; margin-bottom:1.25rem; border:1px solid rgba(26,107,191,0.2);">
        <h4 style="font-size:0.9rem; font-weight:700; color:var(--color-blue-dark); margin-bottom:0.4rem;">
          ⚡ ${tr.forecast.redistributionTitle}
        </h4>
        <p style="font-size:0.88rem; color:var(--text-main);">
          <strong>${tr.forecast.fromSource}:</strong> ${transfer.sourcePhcName} (${transfer.distanceKm} km)<br>
          <strong>${tr.forecast.resourceReq}:</strong> ${transfer.recommendedQuantity} ${transfer.unit} of ${transfer.resourceName}<br>
          <strong>${tr.forecast.urgency}:</strong> <span class="clay-badge clay-badge-critical" style="font-size:0.75rem;">${transfer.urgency}</span>
        </p>
      </div>
    ` : ""}

    <!-- Simulated Multi-Channel Notification Status -->
    <div style="background:#ffffff; border-radius:var(--radius-md); padding:0.85rem 1rem; margin-bottom:1.25rem; font-size:0.82rem; box-shadow:var(--clay-shadow-soft);">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.4rem;">
        <span style="font-weight:700; color:var(--text-heading);">${tr.alerts.channelStatus}:</span>
        <span class="clay-badge clay-badge-stable">✓ Broadcast Dispatched</span>
      </div>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
        <span class="clay-badge" style="background:#e0f2fe; color:#0369a1;">📱 SMS (MoHFW Gateway)</span>
        <span class="clay-badge" style="background:#dcfce7; color:#15803d;">💬 WhatsApp Health Bot</span>
        <span class="clay-badge" style="background:#fef3c7; color:#b45309;">✉️ District NIC Email</span>
        <span class="clay-badge" style="background:#f3e8ff; color:#7e22ce;">🌐 State Intranet Portal</span>
      </div>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; flex-wrap:wrap;">
      <button class="clay-btn" id="modal-speech-btn" style="background:#fff;">
        🔊 ${tr.alerts.playAudioBtn}
      </button>

      ${transfer && transfer.status === "pending" ? `
        <button class="clay-btn clay-btn-primary" id="modal-approve-btn">
          ✓ ${tr.forecast.approveTransfer}
        </button>
      ` : ""}

      <button class="clay-btn clay-btn-danger" id="modal-ack-btn">
        ${tr.alerts.acknowledgeBtn}
      </button>

      <button class="clay-btn" id="modal-close-btn" style="background:#e2e8f0;">
        ✕
      </button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Play audio announcement immediately
  speakAlert(messageText, lang);

  // Handlers
  modal.querySelector("#modal-speech-btn")?.addEventListener("click", () => {
    speakAlert(messageText, lang);
  });

  modal.querySelector("#modal-close-btn")?.addEventListener("click", () => {
    overlay.remove();
  });

  modal.querySelector("#modal-ack-btn")?.addEventListener("click", () => {
    FacilityOperationalDataService.getInstance().acknowledgeAlert(alert.id);
    if (onAcknowledge) onAcknowledge();
    overlay.remove();
  });

  modal.querySelector("#modal-approve-btn")?.addEventListener("click", () => {
    if (transfer) {
      FacilityOperationalDataService.getInstance().approveTransfer(transfer.id);
      if (onApproveTransfer) onApproveTransfer();
      alert.status = "acknowledged";
    }
    overlay.remove();
  });
}
