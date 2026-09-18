import { t } from "../i18n/translations";
import { FacilityOperationalDataService } from "../services/FacilityOperationalDataService";

export interface ResourceUpdateViewProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export function renderResourceUpdateView(props: ResourceUpdateViewProps): HTMLElement {
  const container = document.createElement("div");
  container.className = "page-fade-in";

  const dataService = FacilityOperationalDataService.getInstance();
  const allPhcs = dataService.getPhcs();
  let selectedPhcId = allPhcs[0].id;
  const tr = t();

  const render = () => {
    const phc = dataService.getPhcById(selectedPhcId) || allPhcs[0];
    const inventory = dataService.getInventoryByPhc(phc.id);
    const beds = dataService.getBedsByPhc(phc.id);
    const staff = dataService.getStaffByPhc(phc.id);
    const equipment = dataService.getEquipmentByPhc(phc.id);
    const auditLogs = dataService.getAuditLogs();

    container.innerHTML = `
      <!-- Header / Zero PII Guarantee Banner -->
      <div class="clay-card" style="margin-bottom: 1.75rem; padding: 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <div>
            <div class="clay-badge clay-badge-stable" style="margin-bottom:0.4rem;">
              🔒 Authenticated Medical Officer Portal
            </div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-heading);">
              ${tr.resourceUpdate.title}
            </h2>
            <p style="font-size: 0.9rem; color: var(--text-muted);">
              ${tr.resourceUpdate.subtitle}
            </p>
          </div>

          <!-- Select Facility -->
          <div style="min-width:260px;">
            <label class="filter-label" style="display:block; margin-bottom:0.35rem;">Active Facility</label>
            <select class="clay-select" id="update-facility-select">
              ${allPhcs.map(p => `
                <option value="${p.id}" ${p.id === phc.id ? "selected" : ""}>
                  ${p.name} (${p.district})
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <!-- Zero PII Notice -->
        <div class="clay-card-flat" style="background:#e0f2fe; border:1px solid #bae6fd; font-size:0.85rem; color:#0369a1; padding:0.85rem 1rem;">
          🛡️ <strong>Zero Personal Health Information (PII) Policy:</strong> ${tr.resourceUpdate.privacyNotice}
        </div>
      </div>

      <!-- Quick Dual Layout: Interactive Form & CSV Upload -->
      <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap:1.75rem; margin-bottom:2rem;">
        <!-- Left: Operational Data Submission Form -->
        <div class="clay-card">
          <h3 style="font-size:1.25rem; font-weight:800; color:var(--text-heading); margin-bottom:1.25rem;">
            📝 Daily Clinical Log Entry
          </h3>

          <form id="facility-update-form" style="display:flex; flex-direction:column; gap:1.25rem;">
            <!-- Medicine Quick Adjust -->
            <div class="clay-card-flat">
              <h4 style="font-size:0.95rem; font-weight:700; color:var(--color-blue); margin-bottom:0.6rem;">
                💊 ${tr.resourceUpdate.medicineStock}
              </h4>
              <div style="display:grid; grid-template-columns: 1.4fr 1fr 1fr; gap:0.75rem; align-items:end;">
                <div>
                  <label class="filter-label">Medicine</label>
                  <select class="clay-select" id="form-med-name">
                    ${inventory.map(i => `<option value="${i.medicineName}">${i.medicineName} (${i.currentStock} ${i.unit})</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="filter-label">New Stock</label>
                  <input type="number" class="clay-input" id="form-med-stock" placeholder="e.g. 500" min="0" required />
                </div>
                <div>
                  <label class="filter-label">Daily Burn</label>
                  <input type="number" class="clay-input" id="form-med-burn" placeholder="e.g. 45" min="0" step="0.5" />
                </div>
              </div>
            </div>

            <!-- Beds Occupancy -->
            <div class="clay-card-flat">
              <h4 style="font-size:0.95rem; font-weight:700; color:var(--color-teal); margin-bottom:0.6rem;">
                🛏️ ${tr.resourceUpdate.bedOccupancy}
              </h4>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
                <div>
                  <label class="filter-label">General Beds Occupied (Max: ${beds ? beds.totalBeds - 4 : 10})</label>
                  <input type="number" class="clay-input" id="form-beds-gen" value="${beds?.generalBedsOccupied || 0}" min="0" />
                </div>
                <div>
                  <label class="filter-label">Oxygen Beds Occupied (Max: 4)</label>
                  <input type="number" class="clay-input" id="form-beds-o2" value="${beds?.oxygenBedsOccupied || 0}" min="0" max="4" />
                </div>
              </div>
            </div>

            <!-- Staff Roster by Speciality -->
            <div class="clay-card-flat">
              <h4 style="font-size:0.95rem; font-weight:700; color:var(--color-lavender); margin-bottom:0.6rem;">
                👨‍⚕️ ${tr.resourceUpdate.doctorAttendance}
              </h4>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:0.5rem;">
                <div>
                  <label class="filter-label">MBBS/Gen</label>
                  <input type="number" class="clay-input" id="form-doc-mbbs" value="${staff?.doctorsMBBS || 0}" min="0" />
                </div>
                <div>
                  <label class="filter-label">Paediatric</label>
                  <input type="number" class="clay-input" id="form-doc-ped" value="${staff?.doctorsPediatrician || 0}" min="0" />
                </div>
                <div>
                  <label class="filter-label">Gynae</label>
                  <input type="number" class="clay-input" id="form-doc-gyn" value="${staff?.doctorsGynecologist || 0}" min="0" />
                </div>
                <div>
                  <label class="filter-label">Casualty</label>
                  <input type="number" class="clay-input" id="form-doc-emg" value="${staff?.doctorsEmergency || 0}" min="0" />
                </div>
                <div>
                  <label class="filter-label">Nurses</label>
                  <input type="number" class="clay-input" id="form-staff-nurses" value="${staff?.nurses || 0}" min="0" />
                </div>
              </div>
            </div>

            <!-- Footfall & Equipment -->
            <div class="clay-card-flat">
              <h4 style="font-size:0.95rem; font-weight:700; color:var(--color-amber); margin-bottom:0.6rem;">
                🩺 Equipment & Patient Footfall
              </h4>
              <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0.75rem;">
                <div>
                  <label class="filter-label">OPD Footfall</label>
                  <input type="number" class="clay-input" id="form-footfall-opd" value="150" min="0" />
                </div>
                <div>
                  <label class="filter-label">Filled O2 Cylinders</label>
                  <input type="number" class="clay-input" id="form-o2-filled" value="${equipment?.oxygenCylindersFilled || 2}" min="0" />
                </div>
                <div>
                  <label class="filter-label">Ambulances</label>
                  <input type="number" class="clay-input" id="form-ambulances" value="${equipment?.ambulancesAvailable || 1}" min="0" />
                </div>
              </div>
            </div>

            <!-- Role Signature -->
            <div>
              <label class="filter-label">Authorized Submitter Role & Name</label>
              <input type="text" class="clay-input" id="form-submitter-role" value="Medical Officer In-Charge (MOIC)" required />
            </div>

            <button type="submit" class="clay-btn clay-btn-primary" style="padding:0.85rem; font-size:1rem; margin-top:0.5rem;">
              ✓ ${tr.resourceUpdate.submitUpdate}
            </button>
          </form>
        </div>

        <!-- Right: CSV Bulk Upload & Template -->
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          <div class="clay-card">
            <h3 style="font-size:1.25rem; font-weight:800; color:var(--text-heading); margin-bottom:0.75rem;">
              📁 ${tr.resourceUpdate.csvImportTitle}
            </h3>
            <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:1.25rem; line-height:1.5;">
              Authorized facility coordinators can upload bulk bin-card medicine balances via standardized offline CSV files.
            </p>

            <button class="clay-btn" id="btn-download-csv-sample" style="width:100%; margin-bottom:1rem; background:#fff;">
              📥 ${tr.resourceUpdate.downloadSample}
            </button>

            <!-- File Upload Dropzone -->
            <div style="border: 2px dashed rgba(162,178,200,0.6); border-radius:var(--radius-md); padding:1.5rem; text-align:center; background:#fdfefe; cursor:pointer;" id="dropzone-area">
              <input type="file" id="csv-file-input" accept=".csv" style="display:none;" />
              <div style="font-size:2rem; margin-bottom:0.5rem;">📤</div>
              <strong style="font-size:0.95rem; color:var(--text-heading);">Click to browse CSV file</strong>
              <p style="font-size:0.78rem; color:var(--text-light); margin-top:0.25rem;">Supports UTF-8 CSV up to 5MB</p>
            </div>

            <div id="csv-feedback" style="margin-top:1rem; font-size:0.85rem;"></div>
          </div>

          <!-- Audit Timeline -->
          <div class="clay-card" style="flex:1;">
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-heading); margin-bottom:0.75rem;">
              📜 ${tr.resourceUpdate.auditLogTitle}
            </h3>
            <div style="display:flex; flex-direction:column; gap:0.75rem; max-height:280px; overflow-y:auto; padding-right:0.25rem;">
              ${auditLogs.slice(0, 6).map(log => `
                <div class="clay-card-flat" style="padding:0.75rem; font-size:0.82rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
                    <strong style="color:var(--color-blue);">${log.phcName}</strong>
                    <span style="font-size:0.72rem; color:var(--text-light);">${log.timestamp}</span>
                  </div>
                  <div style="color:var(--text-main); line-height:1.4;">${log.summary}</div>
                  <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.25rem;">By: ${log.updatedByRole}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    // Facility switcher
    container.querySelector("#update-facility-select")?.addEventListener("change", (e) => {
      selectedPhcId = (e.target as HTMLSelectElement).value;
      render();
    });

    // Download Sample CSV
    container.querySelector("#btn-download-csv-sample")?.addEventListener("click", () => {
      const csvContent = "data:text/csv;charset=utf-8," +
        "MedicineName,CurrentStock,DailyBurnRate,ExpiryDate\n" +
        "Oral Rehydration Salts (ORS 21.8g),1200,45,2027-06-30\n" +
        "Paracetamol 500mg Tablets,2500,60,2027-09-30\n" +
        "Amoxicillin 500mg Capsules,800,25,2026-12-31\n" +
        "Anti-Snake Venom (ASV Polyvalent),25,1.2,2027-08-31\n" +
        "Oxytocin Injection 5 IU/ml,150,6,2027-02-28\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `AarogyaFlow_Sample_Inventory_${phc.code}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

    // Form Submit
    const form = container.querySelector("#facility-update-form") as HTMLFormElement;
    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const medName = (container.querySelector("#form-med-name") as HTMLSelectElement).value;
      const medStock = parseInt((container.querySelector("#form-med-stock") as HTMLInputElement).value, 10);
      const medBurn = parseFloat((container.querySelector("#form-med-burn") as HTMLInputElement).value);
      const genBeds = parseInt((container.querySelector("#form-beds-gen") as HTMLInputElement).value, 10);
      const o2Beds = parseInt((container.querySelector("#form-beds-o2") as HTMLInputElement).value, 10);
      const docMbbs = parseInt((container.querySelector("#form-doc-mbbs") as HTMLInputElement).value, 10);
      const docPed = parseInt((container.querySelector("#form-doc-ped") as HTMLInputElement).value, 10);
      const docGyn = parseInt((container.querySelector("#form-doc-gyn") as HTMLInputElement).value, 10);
      const docEmg = parseInt((container.querySelector("#form-doc-emg") as HTMLInputElement).value, 10);
      const nurses = parseInt((container.querySelector("#form-staff-nurses") as HTMLInputElement).value, 10);
      const footfall = parseInt((container.querySelector("#form-footfall-opd") as HTMLInputElement).value, 10);
      const o2Filled = parseInt((container.querySelector("#form-o2-filled") as HTMLInputElement).value, 10);
      const ambulances = parseInt((container.querySelector("#form-ambulances") as HTMLInputElement).value, 10);
      const role = (container.querySelector("#form-submitter-role") as HTMLInputElement).value;

      if (!isNaN(medStock)) {
        dataService.updateMedicineStock(phc.id, medName, medStock, isNaN(medBurn) ? undefined : medBurn, role);
      }
      dataService.updateBedOccupancy(phc.id, genBeds, o2Beds, role);
      dataService.updateStaffRoster(phc.id, docMbbs, docPed, docGyn, docEmg, nurses, role);
      dataService.updateEquipment(phc.id, o2Filled, ambulances, 50, role);
      dataService.recordPatientFootfall(phc.id, footfall, Math.round(footfall * 0.12));

      alert(tr.resourceUpdate.updateSuccess);
      render();
    });

    // CSV Dropzone
    const dropzone = container.querySelector("#dropzone-area");
    const fileInput = container.querySelector("#csv-file-input") as HTMLInputElement;
    const feedback = container.querySelector("#csv-feedback");

    dropzone?.addEventListener("click", () => fileInput?.click());

    fileInput?.addEventListener("change", (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        const res = dataService.importFromCsv(text, phc.id);

        if (res.success && feedback) {
          feedback.innerHTML = `
            <div class="clay-badge clay-badge-stable" style="width:100%; justify-content:center; padding:0.6rem;">
              ✓ Successfully imported ${res.importedCount} medicines from ${file.name}!
            </div>
          `;
          setTimeout(() => render(), 1200);
        } else if (feedback) {
          feedback.innerHTML = `
            <div class="clay-badge clay-badge-critical" style="width:100%; justify-content:center; padding:0.6rem;">
              ⚠️ Import Error: ${res.errors.join(", ")}
            </div>
          `;
        }
      };
      reader.readAsText(file);
    });
  };

  render();
  return container;
}
