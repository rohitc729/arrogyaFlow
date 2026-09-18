import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import { t } from "../i18n/translations";
import { FacilityOperationalDataService } from "../services/FacilityOperationalDataService";
import { PHC, RiskLevel } from "../types";

export interface CommandCentreViewProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
  routeParams?: Record<string, string>;
}

export function renderCommandCentreView(props: CommandCentreViewProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "page-fade-in";

  const dataService = FacilityOperationalDataService.getInstance();
  let allPhcs = dataService.getPhcs();
  const allInventory = dataService.getAllInventory();
  const alerts = dataService.getAlerts();
  const transfers = dataService.getTransfers();
  const tr = t();

  // Apply filters from routeParams
  if (props.routeParams) {
    if (props.routeParams.state) {
      allPhcs = allPhcs.filter(p => p.state === props.routeParams!.state);
    }
    if (props.routeParams.district) {
      allPhcs = allPhcs.filter(p => p.district === props.routeParams!.district);
    }
    if (props.routeParams.risk) {
      allPhcs = allPhcs.filter(p => p.overallRisk === props.routeParams!.risk);
    }
    if (props.routeParams.resource) {
      allPhcs = allPhcs.filter(p => {
        const inv = dataService.getInventoryByPhc(p.id);
        return inv.some(i => i.category === props.routeParams!.resource);
      });
    }
  }

  // Compute aggregated KPIs
  const totalPhcs = allPhcs.length;
  const criticalMedicines = allInventory.filter(i => i.riskStatus === "critical").length;
  let totalAvailableBeds = 0;
  let totalDoctors = 0;
  let totalNurses = 0;

  allPhcs.forEach(p => {
    const b = dataService.getBedsByPhc(p.id);
    if (b) totalAvailableBeds += (b.generalBedsAvailable + b.oxygenBedsAvailable);
    const s = dataService.getStaffByPhc(p.id);
    if (s) {
      totalDoctors += (s.doctorsMBBS + s.doctorsPediatrician + s.doctorsGynecologist + s.doctorsEmergency);
      totalNurses += s.nurses;
    }
  });

  const activeAlertsCount = alerts.filter(a => a.status === "active").length;

  container.innerHTML = `
    <!-- Top Filter Bar -->
    <div class="clay-card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">${tr.filters.state}</label>
          <select class="clay-select" id="filter-state">
            <option value="all">${tr.filters.allStates}</option>
            <option value="Bihar">Bihar</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">${tr.filters.district}</label>
          <select class="clay-select" id="filter-district">
            <option value="all">${tr.filters.allDistricts}</option>
            <option value="Buxar">Buxar</option>
            <option value="Bhojpur">Bhojpur (Ara)</option>
            <option value="Patna">Patna</option>
            <option value="Nalanda">Nalanda</option>
            <option value="Varanasi">Varanasi</option>
            <option value="Prayagraj">Prayagraj</option>
            <option value="Gorakhpur">Gorakhpur</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">${tr.filters.riskLevel}</label>
          <select class="clay-select" id="filter-risk">
            <option value="all">${tr.filters.allRisks}</option>
            <option value="critical">Critical Risk Only</option>
            <option value="moderate">Moderate Risk Only</option>
            <option value="stable">Stable Only</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">${tr.filters.resource}</label>
          <select class="clay-select" id="filter-resource">
            <option value="all">${tr.filters.allCategories}</option>
            <option value="Essential">Essential (ORS, Paracetamol)</option>
            <option value="Antibiotics">Antibiotics (Amoxicillin)</option>
            <option value="Emergency">Emergency (ASV, Rabies)</option>
            <option value="Maternal & Child">Maternal (Oxytocin)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 6 KPI Summary Cards -->
    <div class="kpi-grid">
      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">${tr.kpi.totalPhcs}</span>
          <div class="kpi-icon" style="background: var(--color-blue-tint); color: var(--color-blue);">🏥</div>
        </div>
        <div class="kpi-value">${totalPhcs}</div>
        <div class="kpi-desc">${tr.kpi.phcsMonitoredDesc}</div>
      </div>

      <div class="clay-card kpi-card" style="border-left: 4px solid var(--color-coral);">
        <div class="kpi-header">
          <span class="kpi-label">${tr.kpi.criticalRisks}</span>
          <div class="kpi-icon" style="background: var(--color-coral-tint); color: var(--color-coral);">⚠️</div>
        </div>
        <div class="kpi-value" style="color: var(--color-coral);">${criticalMedicines}</div>
        <div class="kpi-desc">${tr.kpi.criticalRisksDesc}</div>
      </div>

      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">${tr.kpi.availableBeds}</span>
          <div class="kpi-icon" style="background: var(--color-green-tint); color: var(--color-green);">🛏️</div>
        </div>
        <div class="kpi-value" style="color: var(--color-green);">${totalAvailableBeds}</div>
        <div class="kpi-desc">${tr.kpi.bedsOccupancyDesc}</div>
      </div>

      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">${tr.kpi.doctorsPresent}</span>
          <div class="kpi-icon" style="background: var(--color-teal-tint); color: var(--color-teal);">👨‍⚕️</div>
        </div>
        <div class="kpi-value">${totalDoctors}</div>
        <div class="kpi-desc">${tr.kpi.doctorDutyDesc}</div>
      </div>

      <div class="clay-card kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">${tr.kpi.nursesPresent}</span>
          <div class="kpi-icon" style="background: var(--color-lavender-tint); color: var(--color-lavender);">👩‍⚕️</div>
        </div>
        <div class="kpi-value">${totalNurses}</div>
        <div class="kpi-desc">${tr.kpi.nurseDutyDesc}</div>
      </div>

      <div class="clay-card kpi-card" style="${activeAlertsCount > 0 ? "border: 2px solid var(--color-coral);" : ""}">
        <div class="kpi-header">
          <span class="kpi-label">${tr.kpi.emergencyAlerts}</span>
          <div class="kpi-icon" style="background: var(--color-coral-tint); color: var(--color-coral);">🚨</div>
        </div>
        <div class="kpi-value" style="color: var(--color-coral);">${activeAlertsCount}</div>
        <div class="kpi-desc">${tr.kpi.unresolvedDesc}</div>
      </div>
    </div>

    <!-- Main Map & Live Ticker Layout -->
    <div class="dashboard-main-grid">
      <!-- Interactive India Leaflet Map -->
      <div class="clay-card" style="padding: 1.25rem; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-heading);">
              🗺️ National Health Resource Geo-Grid
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">
              Color-coded markers indicate live supply risk & incoming cross-district transfers
            </p>
          </div>
          <!-- Legend -->
          <div style="display: flex; gap: 0.5rem; font-size: 0.75rem; font-weight: 600;">
            <span class="clay-badge clay-badge-stable">● Stable</span>
            <span class="clay-badge clay-badge-moderate">● Low</span>
            <span class="clay-badge clay-badge-critical">● Critical</span>
            <span class="clay-badge" style="background: #e0f2fe; color: #0284c7;">● Incoming</span>
          </div>
        </div>

        <div id="national-leaflet-map" class="map-container"></div>
      </div>

      <!-- Quick Ticker & Risk List -->
      <div class="clay-card" style="padding: 1.25rem; display: flex; flex-direction: column;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.25rem;">
          ⚠️ Urgent Attention List
        </h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
          PHCs with stocks or capacities requiring immediate intervention
        </p>

        <div id="urgent-phc-list" style="display: flex; flex-direction: column; gap: 0.85rem; overflow-y: auto; max-height: 400px; padding-right: 0.25rem;">
          ${renderUrgentList(allPhcs, dataService)}
        </div>
      </div>
    </div>

    <!-- 5 Charts Grid -->
    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-heading); margin-bottom: 1rem;">
      📈 Operational Trend & Predictive Analytics
    </h3>

    <div class="chart-grid-dual">
      <!-- Chart 1: Medicine Consumption Trend -->
      <div class="clay-card chart-card">
        <h4 class="chart-title">1. Daily Medicine Consumption Velocity</h4>
        <p class="chart-subtitle">High-turnover drugs burn rate (Units consumed per day)</p>
        <div class="chart-canvas-wrapper">
          <canvas id="chart-medicine-consumption"></canvas>
        </div>
      </div>

      <!-- Chart 2: Patient Footfall Forecast -->
      <div class="clay-card chart-card">
        <h4 class="chart-title">2. Outpatient & Emergency Footfall Projection</h4>
        <p class="chart-subtitle">Observed vs projected patient arrivals across key sectors</p>
        <div class="chart-canvas-wrapper">
          <canvas id="chart-footfall-forecast"></canvas>
        </div>
      </div>
    </div>

    <div class="chart-grid-dual">
      <!-- Chart 3: Bed Occupancy Trend -->
      <div class="clay-card chart-card">
        <h4 class="chart-title">3. Inpatient Bed Occupancy by Facility</h4>
        <p class="chart-subtitle">General vs Oxygen beds utilization breakdown</p>
        <div class="chart-canvas-wrapper">
          <canvas id="chart-bed-occupancy"></canvas>
        </div>
      </div>

      <!-- Chart 4: Staff Availability by District -->
      <div class="clay-card chart-card">
        <h4 class="chart-title">4. Medical Staff Availability by District</h4>
        <p class="chart-subtitle">Doctors vs Nurses active on clinical duty today</p>
        <div class="chart-canvas-wrapper">
          <canvas id="chart-staff-availability"></canvas>
        </div>
      </div>
    </div>

    <!-- Chart 5: Stock-out Risk by Medicine -->
    <div class="clay-card chart-card" style="margin-bottom: 2rem;">
      <h4 class="chart-title">5. Stock-Out Risk Distribution by Medicine Class</h4>
      <p class="chart-subtitle">Proportion of drugs in Critical, Moderate, and Stable safety thresholds</p>
      <div class="chart-canvas-wrapper" style="max-height: 280px;">
        <canvas id="chart-stockout-distribution"></canvas>
      </div>
    </div>
  `;

  // Initialize Map and Charts after mounting
  setTimeout(() => {
    initLeafletMap(container, allPhcs, transfers, props.onNavigate);
    initCharts(container, allPhcs, dataService);
    initFilters(container, allPhcs, props.onNavigate, props.routeParams);
  }, 100);

  return container;
}

function renderUrgentList(allPhcs: PHC[], dataService: FacilityOperationalDataService): string {
  const criticalPhcs = allPhcs.filter(p => p.overallRisk === "critical" || p.overallRisk === "moderate");

  return criticalPhcs.map(phc => {
    const inv = dataService.getInventoryByPhc(phc.id);
    const topLow = inv.find(i => i.riskStatus === "critical") || inv[0];
    const isCritical = phc.overallRisk === "critical";

    return `
      <div class="clay-card-flat" style="border-left: 4px solid ${isCritical ? "var(--color-coral)" : "var(--color-amber)"}; cursor: pointer;" data-phc-id="${phc.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
          <strong style="font-size: 0.95rem; color: var(--text-heading);">${phc.name}</strong>
          <span class="clay-badge ${isCritical ? "clay-badge-critical" : "clay-badge-moderate"}">
            ${isCritical ? "Critical" : "Moderate"}
          </span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted);">
          📍 ${phc.district}, ${phc.state} · <strong>Shortage:</strong> ${topLow ? `${topLow.medicineName} (${topLow.predictedDaysRemaining}d remaining)` : "Staff/Beds"}
        </p>
        <div style="display: flex; justify-content: flex-end; margin-top: 0.4rem;">
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-blue);">Inspect Inventory →</span>
        </div>
      </div>
    `;
  }).join("");
}

function initLeafletMap(
  container: HTMLElement,
  phcs: PHC[],
  transfers: any[],
  onNavigate: (route: string, params?: Record<string, string>) => void
) {
  const mapElement = container.querySelector("#national-leaflet-map") as HTMLElement;
  if (!mapElement) return;

  // Center on Northern/Eastern India (Bihar & UP coordinates)
  const map = L.map(mapElement).setView([25.45, 83.8], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Markers
  phcs.forEach(phc => {
    const isIncoming = transfers.some(t => t.destinationPhcId === phc.id && t.status === "pending");
    let color = "#059669"; // Green
    if (isIncoming) color = "#0284c7"; // Blue
    else if (phc.overallRisk === "critical") color = "#e11d48"; // Red
    else if (phc.overallRisk === "moderate") color = "#d97706"; // Amber

    const customIcon = L.divIcon({
      className: "custom-clay-pin",
      html: `
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid #ffffff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 13px;
          font-weight: bold;
          ${phc.overallRisk === "critical" ? "animation: pulse-coral 1.5s infinite;" : ""}
        ">
          ${isIncoming ? "🚚" : "✚"}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const marker = L.marker(phc.coordinates, { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="padding: 0.5rem; font-family: system-ui;">
        <strong style="font-size: 1rem; color: #0b1c2d;">${phc.name}</strong><br/>
        <span style="font-size: 0.8rem; color: #4b6279;">📍 ${phc.district}, ${phc.state} (${phc.code})</span><br/>
        <div style="margin-top: 0.4rem; font-size: 0.85rem;">
          <strong>Risk Status:</strong> <span style="color:${color}; font-weight:bold;">${phc.overallRisk.toUpperCase()}</span><br/>
          <strong>Provenance:</strong> <span style="font-size:0.75rem; background:#edf3f8; padding:2px 6px; border-radius:4px;">${phc.dataSource}</span>
        </div>
        <button id="btn-inspect-${phc.id}" style="
          margin-top: 0.6rem;
          width: 100%;
          background: #1a6bbf;
          color: #fff;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.8rem;
        ">
          View Detail & Inventory →
        </button>
      </div>
    `);

    marker.on("popupopen", () => {
      document.getElementById(`btn-inspect-${phc.id}`)?.addEventListener("click", () => {
        onNavigate("phcDetail", { phcId: phc.id });
      });
    });
  });

  // Attach click listener for urgent list items
  container.querySelectorAll("[data-phc-id]").forEach(item => {
    item.addEventListener("click", () => {
      const phcId = (item as HTMLElement).dataset.phcId;
      if (phcId) onNavigate("phcDetail", { phcId });
    });
  });
}

function initCharts(container: HTMLElement, allPhcs: PHC[], dataService: FacilityOperationalDataService) {
  // Chart 1: Medicine Consumption Trend
  const c1Canvas = container.querySelector("#chart-medicine-consumption") as HTMLCanvasElement;
  if (c1Canvas) {
    new Chart(c1Canvas, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
        datasets: [
          {
            label: "ORS (Sachets)",
            data: [32, 38, 41, 45, 50, 48, 55],
            borderColor: "#1a6bbf",
            backgroundColor: "rgba(26, 107, 191, 0.1)",
            fill: true,
            tension: 0.4
          },
          {
            label: "Paracetamol 500mg",
            data: [45, 52, 48, 60, 58, 64, 70],
            borderColor: "#0d9488",
            backgroundColor: "transparent",
            tension: 0.4
          },
          {
            label: "Amoxicillin 500mg",
            data: [20, 22, 25, 24, 28, 26, 30],
            borderColor: "#d97706",
            backgroundColor: "transparent",
            tension: 0.4
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 2: Footfall Forecast
  const c2Canvas = container.querySelector("#chart-footfall-forecast") as HTMLCanvasElement;
  if (c2Canvas) {
    new Chart(c2Canvas, {
      type: "bar",
      data: {
        labels: ["Buxar Sadar", "Ara Rural", "Danapur", "Rajgir", "Varanasi", "Prayagraj", "Campierganj"],
        datasets: [
          {
            label: "Outpatient Footfall",
            data: [158, 115, 192, 85, 175, 140, 110],
            backgroundColor: "#1a6bbf",
            borderRadius: 6
          },
          {
            label: "Emergency Cases",
            data: [22, 11, 26, 8, 20, 15, 18],
            backgroundColor: "#e11d48",
            borderRadius: 6
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 3: Bed Occupancy
  const c3Canvas = container.querySelector("#chart-bed-occupancy") as HTMLCanvasElement;
  if (c3Canvas) {
    new Chart(c3Canvas, {
      type: "bar",
      data: {
        labels: ["Buxar Sadar", "Ara Rural", "Danapur", "Rajgir", "Varanasi", "Campierganj"],
        datasets: [
          {
            label: "Occupied Beds",
            data: [12, 11, 19, 5, 14, 8],
            backgroundColor: "#d97706",
            borderRadius: 6
          },
          {
            label: "Available Beds",
            data: [2, 9, 5, 5, 4, 1],
            backgroundColor: "#059669",
            borderRadius: 6
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
    });
  }

  // Chart 4: Staff Availability
  const c4Canvas = container.querySelector("#chart-staff-availability") as HTMLCanvasElement;
  if (c4Canvas) {
    new Chart(c4Canvas, {
      type: "bar",
      data: {
        labels: ["Buxar", "Bhojpur", "Patna", "Nalanda", "Varanasi", "Gorakhpur"],
        datasets: [
          {
            label: "Doctors Present",
            data: [2, 6, 5, 3, 5, 1],
            backgroundColor: "#0d9488",
            borderRadius: 6
          },
          {
            label: "Nurses Present",
            data: [4, 8, 6, 5, 7, 3],
            backgroundColor: "#6366f1",
            borderRadius: 6
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 5: Stock-out Distribution
  const c5Canvas = container.querySelector("#chart-stockout-distribution") as HTMLCanvasElement;
  if (c5Canvas) {
    new Chart(c5Canvas, {
      type: "doughnut",
      data: {
        labels: ["Stable (> 15 days buffer)", "Moderate Risk (4 - 7 days buffer)", "Critical Shortage (≤ 3 days)"],
        datasets: [
          {
            data: [14, 4, 4],
            backgroundColor: ["#059669", "#d97706", "#e11d48"],
            borderWidth: 2
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

function initFilters(
  container: HTMLElement,
  allPhcs: PHC[],
  onNavigate: (route: string, params?: Record<string, string>) => void,
  routeParams?: Record<string, string>
) {
  const stateFilter = container.querySelector("#filter-state") as HTMLSelectElement;
  const districtFilter = container.querySelector("#filter-district") as HTMLSelectElement;
  const riskFilter = container.querySelector("#filter-risk") as HTMLSelectElement;
  const resourceFilter = container.querySelector("#filter-resource") as HTMLSelectElement;

  if (routeParams) {
    if (routeParams.state && stateFilter) stateFilter.value = routeParams.state;
    if (routeParams.district && districtFilter) districtFilter.value = routeParams.district;
    if (routeParams.risk && riskFilter) riskFilter.value = routeParams.risk;
    if (routeParams.resource && resourceFilter) resourceFilter.value = routeParams.resource;
  }

  const applyFilters = () => {
    const selectedState = stateFilter?.value || "all";
    const selectedDistrict = districtFilter?.value || "all";
    const selectedRisk = riskFilter?.value || "all";
    const selectedResource = resourceFilter?.value || "all";

    const params: Record<string, string> = {};
    if (selectedState !== "all") params.state = selectedState;
    if (selectedDistrict !== "all") params.district = selectedDistrict;
    if (selectedRisk !== "all") params.risk = selectedRisk;
    if (selectedResource !== "all") params.resource = selectedResource;

    onNavigate("commandCentre", params);
  };

  stateFilter?.addEventListener("change", applyFilters);
  districtFilter?.addEventListener("change", applyFilters);
  riskFilter?.addEventListener("change", applyFilters);
  resourceFilter?.addEventListener("change", applyFilters);
}

