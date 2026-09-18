import { t } from "../i18n/translations";

export interface FederatedLearningViewProps {
  onNavigate: (route: string) => void;
}

export function renderFederatedLearningView(props: FederatedLearningViewProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "page-fade-in";

  let modelVersion = "v2.4-global-phc";
  let aggregationRound = 142;
  let epsilonPrivacy = "0.85 ε (High DP)";
  let isTraining = false;

  const tr = t();

  const render = () => {
    container.innerHTML = `
      <!-- Header / Concept Banner -->
      <div class="clay-card" style="margin-bottom: 1.75rem; padding: 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
          <div>
            <div class="clay-badge clay-badge-info" style="margin-bottom:0.4rem;">
              🛡️ Data Sovereignty & Differential Privacy
            </div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-heading);">
              ${tr.federated.title}
            </h2>
            <p style="font-size: 0.9rem; color: var(--text-muted);">
              ${tr.federated.subtitle}
            </p>
          </div>

          <div style="display:flex; gap:0.75rem; align-items:center;">
            <button class="clay-btn clay-btn-primary" id="btn-simulate-round" ${isTraining ? "disabled" : ""} style="padding:0.75rem 1.4rem;">
              ${isTraining ? "⚡ Aggregating Weights..." : "🔄 Simulate Federated Round"}
            </button>
          </div>
        </div>

        <!-- Global Synchronized Model Stats -->
        <div style="display:flex; gap:2rem; flex-wrap:wrap; border-top:1px solid rgba(162,178,200,0.3); padding-top:1rem; font-size:0.88rem;">
          <div><strong>Global Model:</strong> <span class="clay-badge clay-badge-info" style="margin-left:0.3rem;">${modelVersion}</span></div>
          <div><strong>Federated Round:</strong> <span style="font-weight:700; color:var(--color-blue);">${aggregationRound}</span></div>
          <div><strong>Privacy Budget:</strong> <span style="font-weight:700; color:var(--color-green);">${epsilonPrivacy}</span></div>
          <div><strong>Differential Privacy:</strong> <span class="clay-badge clay-badge-stable">Gaussian Noise Injection Active</span></div>
        </div>
      </div>

      <!-- 3-Tier Architecture Diagram Visualizer -->
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-heading); margin-bottom: 1rem;">
        ⚙️ ${tr.federated.howItWorks}
      </h3>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
        <!-- Step 1: Local Edge -->
        <div class="clay-card">
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
            <div style="width:42px; height:42px; border-radius:var(--radius-sm); background:var(--color-blue-tint); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
              🏥
            </div>
            <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-heading);">
              ${tr.federated.localTrainingTitle}
            </h4>
          </div>
          <p style="font-size:0.86rem; color:var(--text-main); line-height:1.5; margin-bottom:0.75rem;">
            ${tr.federated.localTrainingDesc}
          </p>
          <div class="clay-badge clay-badge-stable" style="font-size:0.75rem;">
            ✓ Raw Records Never Leave PHC
          </div>
        </div>

        <!-- Step 2: Secure Aggregation -->
        <div class="clay-card">
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
            <div style="width:42px; height:42px; border-radius:var(--radius-sm); background:var(--color-lavender-tint); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
              🔐
            </div>
            <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-heading);">
              ${tr.federated.secureAggregationTitle}
            </h4>
          </div>
          <p style="font-size:0.86rem; color:var(--text-main); line-height:1.5; margin-bottom:0.75rem;">
            ${tr.federated.secureAggregationDesc}
          </p>
          <div class="clay-badge clay-badge-info" style="font-size:0.75rem;">
            ✓ Homomorphic Encryption Guard
          </div>
        </div>

        <!-- Step 3: Global Broadcast -->
        <div class="clay-card">
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
            <div style="width:42px; height:42px; border-radius:var(--radius-sm); background:var(--color-teal-tint); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
              🌐
            </div>
            <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-heading);">
              ${tr.federated.globalModelTitle}
            </h4>
          </div>
          <p style="font-size:0.86rem; color:var(--text-main); line-height:1.5; margin-bottom:0.75rem;">
            ${tr.federated.globalModelDesc}
          </p>
          <div class="clay-badge clay-badge-stable" style="font-size:0.75rem;">
            ✓ Universal Optimization Broadcast
          </div>
        </div>
      </div>

      <!-- State Federated Nodes Status Grid -->
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-heading); margin-bottom: 1rem;">
        📡 ${tr.federated.stateNodes}
      </h3>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1.25rem; margin-bottom:2rem;">
        <!-- Node 1: Bihar State Node -->
        <div class="clay-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <strong style="font-size:1rem; color:var(--text-heading);">Bihar State Node</strong>
            <span class="clay-badge clay-badge-stable">Online · Sync</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Active PHCs: <strong>2,140</strong> · Gateway: Patna SDC
          </p>
          <div style="font-size:0.78rem; color:var(--text-main); line-height:1.5;">
            Local Epochs: <strong>150 / 150</strong><br/>
            Gradient Variance: <strong>0.0042</strong><br/>
            Transit Latency: <strong>34 ms</strong>
          </div>
        </div>

        <!-- Node 2: UP State Node -->
        <div class="clay-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <strong style="font-size:1rem; color:var(--text-heading);">Uttar Pradesh Node</strong>
            <span class="clay-badge clay-badge-stable">Online · Sync</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Active PHCs: <strong>3,890</strong> · Gateway: Lucknow SDC
          </p>
          <div style="font-size:0.78rem; color:var(--text-main); line-height:1.5;">
            Local Epochs: <strong>150 / 150</strong><br/>
            Gradient Variance: <strong>0.0039</strong><br/>
            Transit Latency: <strong>41 ms</strong>
          </div>
        </div>

        <!-- Node 3: Maharashtra Node -->
        <div class="clay-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <strong style="font-size:1rem; color:var(--text-heading);">Maharashtra Node</strong>
            <span class="clay-badge clay-badge-stable">Online · Sync</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Active PHCs: <strong>1,860</strong> · Gateway: Pune SDC
          </p>
          <div style="font-size:0.78rem; color:var(--text-main); line-height:1.5;">
            Local Epochs: <strong>150 / 150</strong><br/>
            Gradient Variance: <strong>0.0028</strong><br/>
            Transit Latency: <strong>28 ms</strong>
          </div>
        </div>

        <!-- Node 4: Rajasthan Node -->
        <div class="clay-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <strong style="font-size:1rem; color:var(--text-heading);">Rajasthan Node</strong>
            <span class="clay-badge clay-badge-stable">Online · Sync</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Active PHCs: <strong>1,420</strong> · Gateway: Jaipur SDC
          </p>
          <div style="font-size:0.78rem; color:var(--text-main); line-height:1.5;">
            Local Epochs: <strong>150 / 150</strong><br/>
            Gradient Variance: <strong>0.0031</strong><br/>
            Transit Latency: <strong>38 ms</strong>
          </div>
        </div>
      </div>

      <!-- Legal & Compliance Prototype Disclaimer -->
      <div class="clay-card-flat" style="background:#fffbeb; border:1px solid #fde68a; border-radius:var(--radius-md); padding:1.25rem; margin-bottom:2rem;">
        <h4 style="font-size:0.95rem; font-weight:700; color:#92400e; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.5rem;">
          <span>⚖️</span> <span>Regulatory & Prototype Simulation Notice</span>
        </h4>
        <p style="font-size:0.85rem; color:#78350f; line-height:1.5;">
          ${tr.federated.prototypeDisclaimer}
        </p>
      </div>
    `;

    // Simulate Federated Round
    container.querySelector("#btn-simulate-round")?.addEventListener("click", () => {
      isTraining = true;
      render();

      setTimeout(() => {
        isTraining = false;
        aggregationRound += 1;
        modelVersion = `v2.${Math.floor(aggregationRound / 10)}-global-phc`;
        alert(`Federated Round #${aggregationRound} Completed! Gradient updates from 9,310 participating PHC nodes aggregated into model ${modelVersion}.`);
        render();
      }, 1500);
    });
  };

  render();
  return container;
}
