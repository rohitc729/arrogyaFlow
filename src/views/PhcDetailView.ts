import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { t } from "../i18n/translations";
import { FacilityOperationalDataService } from "../services/FacilityOperationalDataService";
import { InventoryItem, PHC } from "../types";

export interface PhcDetailViewProps {
  initialPhcId?: string;
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export function renderPhcDetailView(props: PhcDetailViewProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "page-fade-in";

  const dataService = FacilityOperationalDataService.getInstance();
  const allPhcs = dataService.getPhcs();
  let currentPhcId = props.initialPhcId || "PHC-BXR-012";
  let currentPhc = dataService.getPhcById(currentPhcId) || allPhcs[0];

  const tr = t();

  const renderContent = () => {
    currentPhc = dataService.getPhcById(currentPhcId) || allPhcs[0];
    const inventory = dataService.getInventoryByPhc(currentPhc.id);
    const beds = dataService.getBedsByPhc(currentPhc.id);
    const staff = dataService.getStaffByPhc(currentPhc.id);
    const equipment = dataService.getEquipmentByPhc(currentPhc.id);
    const footfall = dataService.getFootfallByPhc(currentPhc.id);
    const todayFootfall = footfall[footfall.length - 1] || { outPatients: 140, emergencyPatients: 16 };

    container.innerHTML = `
      <!-- PHC Selector & Facility Banner -->
      <div class="clay-card" style="margin-bottom: 1.75rem; padding: 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.4rem;">
              <span class="clay-badge ${currentPhc.overallRisk === "critical" ? "clay-badge-critical" : currentPhc.overallRisk === "moderate" ? "clay-badge-moderate" : "clay-badge-stable"}">
                ● Risk: ${currentPhc.overallRisk.toUpperCase()}
              </span>
              <span class="clay-badge clay-badge-info">ID: ${currentPhc.code}</span>
              <span class="clay-badge" style="background:#edf3f8; color:var(--text-muted);">Source: ${currentPhc.dataSource}</span>
            </div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-heading);">
              ${currentPhc.name}
            </h2>
            <p style="font-size: 0.9rem; color: var(--text-muted);">
              📍 District: <strong>${currentPhc.district}</strong> · State: <strong>${currentPhc.state}</strong> · Sub-District: <strong>${currentPhc.subDistrict}</strong> · PIN: <strong>${currentPhc.pincode}</strong>
            </p>
          </div>

          <!-- PHC Selector Dropdown -->
          <div style="min-width: 260px;">
            <label class="filter-label" style="display:block; margin-bottom:0.35rem;">Switch Health Centre</label>
            <select class="clay-select" id="phc-picker">
              ${allPhcs.map(p => `
                <option value="${p.id}" ${p.id === currentPhc.id ? "selected" : ""}>
                  ${p.name} (${p.district})
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <div style="display:flex; gap:1.5rem; flex-wrap:wrap; font-size:0.85rem; color:var(--text-muted); border-top:1px solid rgba(162,178,200,0.3); padding-top:1rem;">
          <div>📞 <strong>${tr.phcDetail.phone}:</strong> ${currentPhc.contactPhone}</div>
          <div>✉️ <strong>Email:</strong> ${currentPhc.contactEmail}</div>
          <div>🕒 <strong>${tr.phcDetail.lastUpdated}:</strong> ${currentPhc.lastUpdated}</div>
          <div>⚡ <strong>Operational Status:</strong> <span class="clay-badge" style="background:#e0f2fe; color:#0369a1;">${currentPhc.operationalStatus}</span></div>
        </div>
      </div>

      <!-- Real-Time Resource Overview Cards -->
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-heading); margin-bottom: 1rem;">
        ⚡ Live Facility Resource & Supply Metrics
      </h3>

      <div class="resource-grid">
        <!-- 1. Medicine Inventory Summary -->
        <div class="clay-card resource-card">
          <div class="resource-card-header">
            <span class="filter-label">Medicine Inventory</span>
            <span class="clay-badge ${inventory.some(i => i.riskStatus === "critical") ? "clay-badge-critical" : "clay-badge-stable"}">
              ${inventory.some(i => i.riskStatus === "critical") ? "Urgent Shortage" : "Adequate"}
            </span>
          </div>
          <div class="resource-metric">
            <span class="resource-count">${inventory.length}</span>
            <span class="resource-unit">Essential drugs tracked</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted);">
            Critical: <strong style="color:var(--color-coral);">${inventory.filter(i => i.riskStatus === "critical").length}</strong> · Moderate: <strong style="color:var(--color-amber);">${inventory.filter(i => i.riskStatus === "moderate").length}</strong>
          </p>
          <div style="margin-top:0.75rem;">
            <button class="clay-btn" id="btn-jump-table" style="font-size:0.8rem; padding:0.4rem 0.85rem; width:100%;">
              View Medicine Table ↓
            </button>
          </div>
        </div>

        <!-- 2. Bed Availability -->
        <div class="clay-card resource-card">
          <div class="resource-card-header">
            <span class="filter-label">Bed Availability</span>
            <span class="clay-badge ${beds?.riskStatus === "critical" ? "clay-badge-critical" : "clay-badge-stable"}">
              ${beds?.occupancyRatePercent}% Occupied
            </span>
          </div>
          <div class="resource-metric">
            <span class="resource-count">${(beds?.generalBedsAvailable || 0) + (beds?.oxygenBedsAvailable || 0)}</span>
            <span class="resource-unit">Free Beds / ${beds?.totalBeds} total</span>
          </div>
          <div class="resource-bar-track">
            <div class="resource-bar-fill" style="width: ${beds?.occupancyRatePercent || 0}%; background: ${beds && beds.occupancyRatePercent > 80 ? "var(--color-coral)" : "var(--color-blue)"};"></div>
          </div>
          <p style="font-size:0.78rem; color:var(--text-muted);">
            General: <strong>${beds?.generalBedsAvailable} free</strong> · Oxygen: <strong>${beds?.oxygenBedsAvailable} free</strong>
          </p>
        </div>

        <!-- 3. Doctor Availability by Speciality -->
        <div class="clay-card resource-card">
          <div class="resource-card-header">
            <span class="filter-label">Doctors on Duty</span>
            <span class="clay-badge ${staff?.riskStatus === "critical" ? "clay-badge-critical" : "clay-badge-stable"}">
              ${staff ? (staff.doctorsMBBS + staff.doctorsPediatrician + staff.doctorsGynecologist + staff.doctorsEmergency) : 0} Active
            </span>
          </div>
          <p style="font-size:0.82rem; color:var(--text-main); line-height:1.6;">
            • MBBS/General: <strong>${staff?.doctorsMBBS || 0}</strong><br/>
            • Paediatrician: <strong>${staff?.doctorsPediatrician || 0}</strong><br/>
            • Gynaecologist: <strong>${staff?.doctorsGynecologist || 0}</strong><br/>
            • Emergency/Casualty: <strong>${staff?.doctorsEmergency || 0}</strong>
          </p>
          <div style="font-size:0.76rem; color:var(--text-muted); margin-top:0.4rem;">
            Minimum Mandated: <strong>${staff?.minimumRequired || 10} personnel</strong>
          </div>
        </div>

        <!-- 4. Nurses & Paramedics -->
        <div class="clay-card resource-card">
          <div class="resource-card-header">
            <span class="filter-label">Nursing Staff</span>
            <span class="clay-badge clay-badge-stable">Roster Synced</span>
          </div>
          <div class="resource-metric">
            <span class="resource-count">${staff?.nurses || 0}</span>
            <span class="resource-unit">Nurses on duty</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted);">
            Pharmacists: <strong>${staff?.pharmacists || 0}</strong> · Lab Technicians: <strong>${staff?.labTechs || 0}</strong>
          </p>
          <div class="resource-bar-track">
            <div class="resource-bar-fill" style="width: 75%; background: var(--color-lavender);"></div>
          </div>
        </div>

        <!-- 5. Oxygen & Life Support -->
        <div class="clay-card resource-card">
          <div class="resource-card-header">
            <span class="filter-label">Medical Oxygen</span>
            <span class="clay-badge ${equipment && equipment.oxygenCylindersFilled < 3 ? "clay-badge-critical" : "clay-badge-stable"}">
              ${equipment?.oxygenCylindersFilled || 0} Filled
            </span>
          </div>
          <div class="resource-metric">
            <span class="resource-count">${equipment?.oxygenCylindersFilled || 0}</span>
            <span class="resource-unit">D-Type Cylinders</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted);">
            Empty / Refill needed: <strong style="color:var(--color-coral);">${equipment?.oxygenCylindersEmpty || 0}</strong> · Safe buffer: <strong>6 units</strong>
          </p>
        </div>

        <!-- 6. Diagnostic Kits & Emergency Supplies -->
        <div class="clay-card resource-card">
          <div class="resource-card-header">
            <span class="filter-label">Emergency Supplies</span>
            <span class="clay-badge clay-badge-stable">Active</span>
          </div>
          <p style="font-size:0.82rem; color:var(--text-main); line-height:1.6;">
            • Rapid Test Kits: <strong>${equipment?.testKitsRapid || 0}</strong><br/>
            • IV Saline Fluids: <strong>${equipment?.ivFluidsBags || 0} bags</strong><br/>
            • Blood Units: <strong>${equipment?.bloodUnitsAvailable || 0} units</strong><br/>
            • 108 Ambulances: <strong>${equipment?.ambulancesAvailable || 0} stationed</strong>
          </p>
        </div>

        <!-- 7. Daily Patient Footfall -->
        <div class="clay-card resource-card">
          <div class="resource-card-header">
            <span class="filter-label">${tr.phcDetail.patientFootfall}</span>
            <span class="clay-badge clay-badge-info">Today's Log</span>
          </div>
          <div class="resource-metric">
            <span class="resource-count">${todayFootfall.outPatients}</span>
            <span class="resource-unit">OPD Visitors</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted);">
            Emergency / Triage: <strong>${todayFootfall.emergencyPatients}</strong> · Higher referrals: <strong>${todayFootfall.referralsOut || 4}</strong>
          </p>
        </div>

        <!-- 8. AI Quick Action -->
        <div class="clay-card resource-card" style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); border: 2px dashed var(--color-blue);">
          <div class="resource-card-header">
            <span class="filter-label" style="color:var(--color-blue);">Gemini Edge Agent</span>
            <span class="clay-badge clay-badge-info">Forecast Ready</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-main); margin-bottom:1rem; line-height:1.4;">
            Run automated multi-factor supply prediction to generate cross-district transfer recommendations for ${currentPhc.name}.
          </p>
          <button class="clay-btn clay-btn-primary" id="btn-jump-forecast" style="width:100%;">
            ⚡ Run AI Forecast →
          </button>
        </div>
      </div>

      <!-- Medicine Inventory Table -->
      <div class="clay-card" id="medicine-table-section" style="margin-bottom: 2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading);">
              💊 ${tr.phcDetail.medicineInventory}
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">
              Current bin-card stocks, burn velocities, and remaining buffer days
            </p>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <input type="text" class="clay-input" id="table-search" placeholder="${tr.phcDetail.tableSearch}" style="width:240px;" />
            <select class="clay-select" id="table-category-filter" style="width:180px;">
              <option value="all">All Categories</option>
              <option value="Essential">Essential</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Emergency">Emergency</option>
              <option value="Maternal & Child">Maternal & Child</option>
              <option value="Vaccines">Vaccines</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="clay-table">
            <thead>
              <tr>
                <th>${tr.phcDetail.medicineCol}</th>
                <th>${tr.phcDetail.categoryCol}</th>
                <th>${tr.phcDetail.stockCol}</th>
                <th>${tr.phcDetail.minSafeLevel}</th>
                <th>${tr.phcDetail.burnCol}</th>
                <th>${tr.phcDetail.daysRemaining}</th>
                <th>${tr.phcDetail.expiryCol}</th>
                <th>${tr.phcDetail.statusBadge}</th>
              </tr>
            </thead>
            <tbody id="inventory-table-body">
              ${renderTableRows(inventory)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Facility Mini Map -->
      <div class="clay-card" style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.5rem;">
          📍 Facility Geographic Location & Transit Access
        </h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
          Coordinates: ${currentPhc.coordinates[0].toFixed(4)}° N, ${currentPhc.coordinates[1].toFixed(4)}° E · Connected to District Medical Cold-Chain Route
        </p>
        <div id="phc-mini-map" style="height: 280px; width: 100%; border-radius: var(--radius-md); overflow: hidden;"></div>
      </div>
    `;

    // Attach Event Listeners
    const phcPicker = container.querySelector("#phc-picker") as HTMLSelectElement;
    phcPicker?.addEventListener("change", () => {
      currentPhcId = phcPicker.value;
      renderContent();
    });

    container.querySelector("#btn-jump-table")?.addEventListener("click", () => {
      container.querySelector("#medicine-table-section")?.scrollIntoView({ behavior: "smooth" });
    });

    container.querySelector("#btn-jump-forecast")?.addEventListener("click", () => {
      props.onNavigate("forecast", { phcId: currentPhc.id });
    });

    // Search and Category Filter
    const searchInput = container.querySelector("#table-search") as HTMLInputElement;
    const catFilter = container.querySelector("#table-category-filter") as HTMLSelectElement;

    const filterTable = () => {
      const q = (searchInput?.value || "").toLowerCase();
      const cat = catFilter?.value || "all";
      let filtered = inventory;
      if (cat !== "all") {
        filtered = filtered.filter(i => i.category === cat);
      }
      if (q) {
        filtered = filtered.filter(i => i.medicineName.toLowerCase().includes(q) || i.batchNumber.toLowerCase().includes(q));
      }
      const tbody = container.querySelector("#inventory-table-body");
      if (tbody) tbody.innerHTML = renderTableRows(filtered);
    };

    searchInput?.addEventListener("input", filterTable);
    catFilter?.addEventListener("change", filterTable);

    // Mini Map
    setTimeout(() => {
      initMiniMap(container, currentPhc);
    }, 50);
  };

  renderContent();
  return container;
}

function renderTableRows(items: InventoryItem[]): string {
  if (items.length === 0) {
    return `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">No medicines matched the filter.</td></tr>`;
  }

  return items.map(item => {
    const isCritical = item.riskStatus === "critical";
    const isModerate = item.riskStatus === "moderate";

    return `
      <tr>
        <td>
          <strong style="color:var(--text-heading);">${item.medicineName}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">Batch: ${item.batchNumber}</div>
        </td>
        <td><span class="clay-badge" style="background:#edf3f8; color:var(--text-main); font-size:0.75rem;">${item.category}</span></td>
        <td><strong>${item.currentStock}</strong> ${item.unit}</td>
        <td>${item.minSafeLevel} ${item.unit}</td>
        <td>${item.dailyConsumptionRate} / day</td>
        <td>
          <span style="font-weight:800; color:${isCritical ? "var(--color-coral)" : isModerate ? "var(--color-amber)" : "var(--color-green)"}; font-size:0.95rem;">
            ${item.predictedDaysRemaining} days
          </span>
        </td>
        <td>${item.expiryDate}</td>
        <td>
          <span class="clay-badge ${isCritical ? "clay-badge-critical" : isModerate ? "clay-badge-moderate" : "clay-badge-stable"}">
            ${isCritical ? "Critical Shortage" : isModerate ? "Low Stock" : "Optimal"}
          </span>
        </td>
      </tr>
    `;
  }).join("");
}

function initMiniMap(container: HTMLElement, phc: PHC) {
  const mapDiv = container.querySelector("#phc-mini-map") as HTMLElement;
  if (!mapDiv) return;

  const map = L.map(mapDiv, { zoomControl: false }).setView(phc.coordinates, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const marker = L.marker(phc.coordinates).addTo(map);
  marker.bindPopup(`<strong>${phc.name}</strong><br/>${phc.district}`).openPopup();
}
