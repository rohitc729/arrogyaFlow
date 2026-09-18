import {
  PHC,
  InventoryItem,
  StaffMemberAggregate,
  BedStatus,
  EquipmentStatus,
  FootfallRecord,
  Alert,
  TransferRecommendation,
  AuditLog
} from "../types";
import {
  INITIAL_PHCS,
  INITIAL_INVENTORY,
  INITIAL_STAFF,
  INITIAL_BEDS,
  INITIAL_EQUIPMENT,
  INITIAL_FOOTFALL,
  INITIAL_ALERTS,
  INITIAL_TRANSFERS,
  INITIAL_AUDIT_LOGS
} from "./seedData";

const STORAGE_KEYS = {
  PHCS: "aarogya_phcs",
  INVENTORY: "aarogya_inventory",
  STAFF: "aarogya_staff",
  BEDS: "aarogya_beds",
  EQUIPMENT: "aarogya_equipment",
  FOOTFALL: "aarogya_footfall",
  ALERTS: "aarogya_alerts",
  TRANSFERS: "aarogya_transfers",
  AUDIT: "aarogya_audit"
};

export class FacilityOperationalDataService {
  private static instance: FacilityOperationalDataService;

  private phcs: PHC[] = [];
  private inventory: InventoryItem[] = [];
  private staff: StaffMemberAggregate[] = [];
  private beds: BedStatus[] = [];
  private equipment: EquipmentStatus[] = [];
  private footfall: FootfallRecord[] = [];
  private alerts: Alert[] = [];
  private transfers: TransferRecommendation[] = [];
  private auditLogs: AuditLog[] = [];

  private constructor() {
    this.loadFromStorageOrSeed();
  }

  public static getInstance(): FacilityOperationalDataService {
    if (!FacilityOperationalDataService.instance) {
      FacilityOperationalDataService.instance = new FacilityOperationalDataService();
    }
    return FacilityOperationalDataService.instance;
  }

  private loadFromStorageOrSeed() {
    const savedPhcs = localStorage.getItem(STORAGE_KEYS.PHCS);
    if (savedPhcs) {
      try {
        this.phcs = JSON.parse(savedPhcs);
        this.inventory = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY) || "[]");
        this.staff = JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF) || "[]");
        this.beds = JSON.parse(localStorage.getItem(STORAGE_KEYS.BEDS) || "[]");
        this.equipment = JSON.parse(localStorage.getItem(STORAGE_KEYS.EQUIPMENT) || "[]");
        this.footfall = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOTFALL) || "[]");
        this.alerts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALERTS) || "[]");
        this.transfers = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSFERS) || "[]");
        this.auditLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT) || "[]");
        return;
      } catch (e) {
        console.error("Failed to parse localStorage, resetting seed.", e);
      }
    }
    this.resetToSeed();
  }

  public resetToSeed() {
    this.phcs = JSON.parse(JSON.stringify(INITIAL_PHCS));
    this.inventory = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
    this.staff = JSON.parse(JSON.stringify(INITIAL_STAFF));
    this.beds = JSON.parse(JSON.stringify(INITIAL_BEDS));
    this.equipment = JSON.parse(JSON.stringify(INITIAL_EQUIPMENT));
    this.footfall = JSON.parse(JSON.stringify(INITIAL_FOOTFALL));
    this.alerts = JSON.parse(JSON.stringify(INITIAL_ALERTS));
    this.transfers = JSON.parse(JSON.stringify(INITIAL_TRANSFERS));
    this.auditLogs = JSON.parse(JSON.stringify(INITIAL_AUDIT_LOGS));
    this.saveAll();
  }

  private saveAll() {
    localStorage.setItem(STORAGE_KEYS.PHCS, JSON.stringify(this.phcs));
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(this.inventory));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(this.staff));
    localStorage.setItem(STORAGE_KEYS.BEDS, JSON.stringify(this.beds));
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(this.equipment));
    localStorage.setItem(STORAGE_KEYS.FOOTFALL, JSON.stringify(this.footfall));
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(this.alerts));
    localStorage.setItem(STORAGE_KEYS.TRANSFERS, JSON.stringify(this.transfers));
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(this.auditLogs));
  }

  // Getters
  public getPhcs(): PHC[] {
    return this.phcs;
  }

  public getPhcById(id: string): PHC | undefined {
    return this.phcs.find(p => p.id === id);
  }

  public getInventoryByPhc(phcId: string): InventoryItem[] {
    return this.inventory.filter(i => i.phcId === phcId);
  }

  public getAllInventory(): InventoryItem[] {
    return this.inventory;
  }

  public getStaffByPhc(phcId: string): StaffMemberAggregate | undefined {
    return this.staff.find(s => s.phcId === phcId);
  }

  public getBedsByPhc(phcId: string): BedStatus | undefined {
    return this.beds.find(b => b.phcId === phcId);
  }

  public getEquipmentByPhc(phcId: string): EquipmentStatus | undefined {
    return this.equipment.find(e => e.phcId === phcId);
  }

  public getFootfallByPhc(phcId: string): FootfallRecord[] {
    return this.footfall.filter(f => f.phcId === phcId);
  }

  public getAlerts(): Alert[] {
    return this.alerts;
  }

  public getTransfers(): TransferRecommendation[] {
    return this.transfers;
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  // State Mutators
  public updatePhcRisk(phcId: string) {
    const phc = this.phcs.find(p => p.id === phcId);
    if (!phc) return;
    const inv = this.getInventoryByPhc(phcId);
    const hasCritical = inv.some(i => i.riskStatus === "critical");
    const hasModerate = inv.some(i => i.riskStatus === "moderate");
    phc.overallRisk = hasCritical ? "critical" : hasModerate ? "moderate" : "stable";
    this.saveAll();
  }

  public updateMedicineStock(
    phcId: string,
    medicineName: string,
    newStock: number,
    dailyBurnRate?: number,
    role: string = "Medical Officer"
  ) {
    let item = this.inventory.find(i => i.phcId === phcId && i.medicineName.toLowerCase().includes(medicineName.toLowerCase()));
    const phc = this.getPhcById(phcId);

    if (item) {
      const prev = item.currentStock;
      item.currentStock = newStock;
      if (dailyBurnRate !== undefined) item.dailyConsumptionRate = dailyBurnRate;
      item.predictedDaysRemaining = Math.max(0, Number((item.currentStock / (item.dailyConsumptionRate || 1)).toFixed(1)));
      item.riskStatus = item.predictedDaysRemaining <= 3 ? "critical" : item.predictedDaysRemaining <= 7 ? "moderate" : "stable";
      item.lastRestocked = new Date().toISOString().split("T")[0];

      this.auditLogs.unshift({
        id: "AUD-" + Date.now().toString().slice(-4),
        phcId,
        phcName: phc ? phc.name : phcId,
        timestamp: new Date().toLocaleString(),
        updatedByRole: role,
        summary: `Updated ${item.medicineName}: ${prev} -> ${newStock} ${item.unit}. Days left: ${item.predictedDaysRemaining}`,
        category: "Medicine Stock"
      });
    }

    this.updatePhcRisk(phcId);
    this.saveAll();
  }

  public updateBedOccupancy(phcId: string, generalOcc: number, oxygenOcc: number, role: string = "Nursing Supervisor") {
    const bed = this.beds.find(b => b.phcId === phcId);
    const phc = this.getPhcById(phcId);
    if (bed) {
      bed.generalBedsOccupied = generalOcc;
      bed.generalBedsAvailable = Math.max(0, (bed.totalBeds - 4) - generalOcc);
      bed.oxygenBedsOccupied = oxygenOcc;
      bed.oxygenBedsAvailable = Math.max(0, 4 - oxygenOcc);
      const totalOccupied = generalOcc + oxygenOcc;
      bed.occupancyRatePercent = Number(((totalOccupied / bed.totalBeds) * 100).toFixed(1));
      bed.riskStatus = bed.occupancyRatePercent > 85 ? "critical" : bed.occupancyRatePercent > 70 ? "moderate" : "stable";

      this.auditLogs.unshift({
        id: "AUD-" + Date.now().toString().slice(-4),
        phcId,
        phcName: phc ? phc.name : phcId,
        timestamp: new Date().toLocaleString(),
        updatedByRole: role,
        summary: `Bed occupancy updated: General ${generalOcc}, Oxygen ${oxygenOcc}. Occupancy rate: ${bed.occupancyRatePercent}%`,
        category: "Beds"
      });
      this.saveAll();
    }
  }

  public updateStaffRoster(
    phcId: string,
    mbbs: number,
    pediatrician: number,
    gynecologist: number,
    emergency: number,
    nurses: number,
    role: string = "Administrative Officer"
  ) {
    const s = this.staff.find(st => st.phcId === phcId);
    const phc = this.getPhcById(phcId);
    if (s) {
      s.doctorsMBBS = mbbs;
      s.doctorsPediatrician = pediatrician;
      s.doctorsGynecologist = gynecologist;
      s.doctorsEmergency = emergency;
      s.nurses = nurses;
      s.totalPresentToday = mbbs + pediatrician + gynecologist + emergency + s.pharmacists + nurses + s.labTechs;
      s.riskStatus = s.totalPresentToday < s.minimumRequired * 0.6 ? "critical" : s.totalPresentToday < s.minimumRequired ? "moderate" : "stable";

      this.auditLogs.unshift({
        id: "AUD-" + Date.now().toString().slice(-4),
        phcId,
        phcName: phc ? phc.name : phcId,
        timestamp: new Date().toLocaleString(),
        updatedByRole: role,
        summary: `Staff roster update: Doctors present: ${mbbs + pediatrician + gynecologist + emergency}, Nurses: ${nurses}`,
        category: "Staff Attendance"
      });
      this.saveAll();
    }
  }

  public updateEquipment(
    phcId: string,
    filledO2: number,
    ambulances: number,
    rapidKits: number,
    role: string = "Equipment In-Charge"
  ) {
    const eq = this.equipment.find(e => e.phcId === phcId);
    const phc = this.getPhcById(phcId);
    if (eq) {
      eq.oxygenCylindersFilled = filledO2;
      eq.ambulancesAvailable = ambulances;
      eq.testKitsRapid = rapidKits;

      this.auditLogs.unshift({
        id: "AUD-" + Date.now().toString().slice(-4),
        phcId,
        phcName: phc ? phc.name : phcId,
        timestamp: new Date().toLocaleString(),
        updatedByRole: role,
        summary: `Equipment logged: Filled O2: ${filledO2}, Ambulances: ${ambulances}, Test Kits: ${rapidKits}`,
        category: "Equipment"
      });
      this.saveAll();
    }
  }

  public recordPatientFootfall(phcId: string, outPatients: number, emergencyPatients: number) {
    const today = new Date().toISOString().split("T")[0];
    const existing = this.footfall.find(f => f.phcId === phcId && f.date === today);
    if (existing) {
      existing.outPatients = outPatients;
      existing.emergencyPatients = emergencyPatients;
    } else {
      this.footfall.push({
        phcId,
        date: today,
        outPatients,
        emergencyPatients,
        referralsOut: Math.round(emergencyPatients * 0.25)
      });
    }
    this.saveAll();
  }

  public approveTransfer(transferId: string): boolean {
    const transfer = this.transfers.find(t => t.id === transferId);
    if (!transfer) return false;
    transfer.status = "approved";

    // Adjust local stocks between source and destination
    const srcItem = this.inventory.find(
      i => i.phcId === transfer.sourcePhcId && i.medicineName === transfer.resourceName
    );
    const destItem = this.inventory.find(
      i => i.phcId === transfer.destinationPhcId && i.medicineName === transfer.resourceName
    );

    if (srcItem && destItem) {
      srcItem.currentStock -= transfer.recommendedQuantity;
      destItem.currentStock += transfer.recommendedQuantity;
      destItem.predictedDaysRemaining = Number((destItem.currentStock / (destItem.dailyConsumptionRate || 1)).toFixed(1));
      destItem.riskStatus = destItem.predictedDaysRemaining <= 3 ? "critical" : destItem.predictedDaysRemaining <= 7 ? "moderate" : "stable";

      this.updatePhcRisk(transfer.sourcePhcId);
      this.updatePhcRisk(transfer.destinationPhcId);
    }

    // Acknowledge associated alert if any
    const alert = this.alerts.find(a => a.phcId === transfer.destinationPhcId && a.resourceName === transfer.resourceName);
    if (alert) {
      alert.status = "acknowledged";
    }

    this.auditLogs.unshift({
      id: "AUD-" + Date.now().toString().slice(-4),
      phcId: transfer.destinationPhcId,
      phcName: transfer.destinationPhcName,
      timestamp: new Date().toLocaleString(),
      updatedByRole: "Chief Medical Officer (CMO)",
      summary: `Approved inter-PHC transfer: ${transfer.recommendedQuantity} ${transfer.unit} of ${transfer.resourceName} from ${transfer.sourcePhcName}`,
      category: "Redistribution"
    });

    this.saveAll();
    return true;
  }

  public acknowledgeAlert(alertId: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = "acknowledged";
      this.saveAll();
    }
  }

  public resolveAlert(alertId: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = "resolved";
      this.saveAll();
    }
  }

  // CSV Bulk Import Parser
  public importFromCsv(
    csvText: string,
    phcId: string
  ): { success: boolean; importedCount: number; errors: string[] } {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) {
      return { success: false, importedCount: 0, errors: ["CSV file is empty or missing headers."] };
    }

    const rows = lines.slice(1);
    const errors: string[] = [];
    let count = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cols = row.split(",").map(c => c.trim().replace(/^"|"$/g, ""));
      if (cols.length < 3) {
        errors.push(`Row ${i + 2}: Insufficient columns`);
        continue;
      }

      // Expected columns: MedicineName, CurrentStock, DailyBurnRate, ExpiryDate
      const medName = cols[0];
      const stock = parseInt(cols[1], 10);
      const burn = parseFloat(cols[2]);

      if (!medName) {
        errors.push(`Row ${i + 2}: Medicine name cannot be blank`);
        continue;
      }
      if (isNaN(stock) || stock < 0) {
        errors.push(`Row ${i + 2}: Invalid stock value "${cols[1]}"`);
        continue;
      }

      this.updateMedicineStock(phcId, medName, stock, isNaN(burn) ? undefined : burn, "CSV Batch Upload");
      count++;
    }

    return {
      success: count > 0,
      importedCount: count,
      errors
    };
  }
}
