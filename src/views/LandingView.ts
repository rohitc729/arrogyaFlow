import { t } from "../i18n/translations";

export interface LandingViewProps {
  onNavigate: (route: string) => void;
}

export function renderLandingView(props: LandingViewProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "page-fade-in";

  const tr = t();

  container.innerHTML = `
    <!-- Hero Section -->
    <div class="clay-card" style="margin-bottom: 2rem; position: relative; overflow: hidden; padding: 3rem 2rem;">
      <!-- Canvas for animated health network -->
      <canvas id="hero-network-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; opacity:0.3; z-index:0;"></canvas>

      <div style="position: relative; z-index: 1; max-width: 860px;">
        <div class="clay-badge clay-badge-info" style="margin-bottom: 1.25rem;">
          ${tr.hero.badge}
        </div>
        <h1 style="font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: var(--text-heading); line-height: 1.15; margin-bottom: 1.25rem;">
          ${tr.hero.title}
        </h1>
        <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 2rem;">
          ${tr.hero.subtitle}
        </p>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="clay-btn clay-btn-primary" id="landing-open-command" style="padding: 0.85rem 1.8rem; font-size: 1.05rem;">
            ⚡ ${tr.hero.ctaPrimary}
          </button>
          <button class="clay-btn" id="landing-open-update" style="padding: 0.85rem 1.8rem; font-size: 1.05rem;">
            📋 ${tr.hero.ctaSecondary}
          </button>
          <button class="clay-btn" id="landing-open-forecast" style="padding: 0.85rem 1.6rem; font-size: 1.05rem;">
            🤖 ${tr.nav.forecast}
          </button>
        </div>
      </div>
    </div>

    <!-- Impact Metrics Cards -->
    <div class="kpi-grid" style="margin-bottom: 2.5rem;">
      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">${tr.kpi.totalPhcs}</span>
          <div class="kpi-icon" style="background: var(--color-blue-tint); color: var(--color-blue);">🏥</div>
        </div>
        <div class="kpi-value count-up" data-target="25840">${tr.hero.statPhcs}</div>
        <div class="kpi-desc">${tr.kpi.phcsMonitoredDesc}</div>
      </div>

      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">Prevented Shortages</span>
          <div class="kpi-icon" style="background: var(--color-green-tint); color: var(--color-green);">🛡️</div>
        </div>
        <div class="kpi-value count-up" data-target="94">${tr.hero.statStockouts}</div>
        <div class="kpi-desc">Stock-out avoidance efficacy</div>
      </div>

      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">Redistributions Completed</span>
          <div class="kpi-icon" style="background: var(--color-amber-tint); color: var(--color-amber);">🔄</div>
        </div>
        <div class="kpi-value count-up" data-target="12480">${tr.hero.statTransfers}</div>
        <div class="kpi-desc">Inter-PHC resource transfers</div>
      </div>

      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">Avg. Emergency Dispatch</span>
          <div class="kpi-icon" style="background: var(--color-coral-tint); color: var(--color-coral);">⚡</div>
        </div>
        <div class="kpi-value">${tr.hero.statResponseTime}</div>
        <div class="kpi-desc">Critical life-saving transit</div>
      </div>
    </div>

    <!-- 3 Pillars Workflow -->
    <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-heading); margin-bottom: 1.25rem;">
      How AarogyaFlow AI Reinvents Health Logistics
    </h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
      <div class="clay-card" style="padding: 1.75rem;">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: var(--color-blue-tint); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem;">
          📊
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.5rem;">
          1. Dynamic Burn-Rate Sensing
        </h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
          Monitors daily medicine bin-cards, outpatient footfall velocity, seasonal infection spikes, and bed capacity in real-time across primary health centres.
        </p>
      </div>

      <div class="clay-card" style="padding: 1.75rem;">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: var(--color-lavender-tint); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem;">
          🧠
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.5rem;">
          2. Gemini AI Supply Forecasting
        </h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
          Predicts 7, 15, and 30-day shortages before stocks deplete. Synthesizes clinical signals into transparent explanations for Chief Medical Officers.
        </p>
      </div>

      <div class="clay-card" style="padding: 1.75rem;">
        <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: var(--color-teal-tint); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem;">
          🚚
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.5rem;">
          3. Automated Cross-PHC Redistribution
        </h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
          Identifies nearby facilities with safe surplus stocks. Computes optimal transit distances and generates instantaneous transfer waybills.
        </p>
      </div>
    </div>
  `;

  // Attach button events
  container.querySelector("#landing-open-command")?.addEventListener("click", () => props.onNavigate("commandCentre"));
  container.querySelector("#landing-open-update")?.addEventListener("click", () => props.onNavigate("resourceUpdate"));
  container.querySelector("#landing-open-forecast")?.addEventListener("click", () => props.onNavigate("forecast"));

  // Hero canvas network animation
  setTimeout(() => {
    const canvas = container.querySelector("#hero-network-canvas") as HTMLCanvasElement;
    if (canvas) {
      initNetworkCanvas(canvas);
    }
  }, 50);

  return container;
}

function initNetworkCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resize = () => {
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 400;
  };
  resize();
  window.addEventListener("resize", resize);

  const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
  const colors = ["#1a6bbf", "#0d9488", "#059669", "#d97706"];

  for (let i = 0; i < 28; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  let animId: number;
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(26, 107, 191, ${0.2 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
    }

    animId = requestAnimationFrame(render);
  };
  render();
}
