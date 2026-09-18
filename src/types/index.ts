export type DataSourceType = "open-gov" | "facility-live" | "baseline-fallback";

export type RiskLevel = "stable" | "moderate" | "critical";

export type ResourceCategory = "medicine" | "beds" | "doctors" | "nurses" | "oxygen" | "equipment";

export interface PHC {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  subDistrict: string;
  coordinates: [number, number]; // [lat, lng]
  pincode: string;
  contactPhone: string;
  contactEmail: string;
  operationalStatus: "Active" | "High Load" | "Under Resourced";
  lastUpdated: string;
  dataSource: DataSourceType;
  overallRisk: RiskLevel;
}

export interface InventoryItem {
  id: string;
  phcId: string;
  medicineName: string;
  category: "Essential" | "Maternal & Child" | "Antibiotics" | "Emergency" | "Chronic Disease" | "Vaccines";
  unit: string;
  currentStock: number;
  minSafeLevel: number;
  maxCapacity: number;
  dailyConsumptionRate: number;
  expiryDate: string;
  batchNumber: string;
  lastRestocked: string;
  predictedDaysRemaining: number;
  riskStatus: RiskLevel;
}

export interface StaffMemberAggregate {
  phcId: string;
  doctorsMBBS: number;
  doctorsPediatrician: number;
  doctorsGynecologist: number;
  doctorsEmergency: number;
  pharmacists: number;
  nurses: number;
  labTechs: number;
  totalPresentToday: number;
  minimumRequired: number;
  riskStatus: RiskLevel;
}

export interface BedStatus {
  phcId: string;
  totalBeds: number;
  generalBedsOccupied: number;
  generalBedsAvailable: number;
  oxygenBedsOccupied: number;
  oxygenBedsAvailable: number;
  icuBedsOccupied: number;
  icuBedsAvailable: number;
  occupancyRatePercent: number;
  riskStatus: RiskLevel;
}

export interface EquipmentStatus {
  phcId: string;
  oxygenCylindersFilled: number;
  oxygenCylindersEmpty: number;
  ambulancesAvailable: number;
  testKitsRapid: number;
  testKitsPCR: number;
  bloodUnitsAvailable: number;
  ivFluidsBags: number;
  ppeKitsAvailable: number;
}

export interface FootfallRecord {
  phcId: string;
  date: string;
  outPatients: number;
  emergencyPatients: number;
  referralsOut: number;
}

export interface TransferRecommendation {
  id: string;
  sourcePhcId: string;
  sourcePhcName: string;
  destinationPhcId: string;
  destinationPhcName: string;
  resourceCategory: ResourceCategory;
  resourceName: string;
  recommendedQuantity: number;
  unit: string;
  distanceKm: number;
  urgency: "Immediate (Within 6h)" | "High (Within 24h)" | "Routine (Within 48h)";
  estimatedStockOutDate: string;
  status: "pending" | "approved" | "dispatched" | "completed";
}

export interface Alert {
  id: string;
  phcId: string;
  phcName: string;
  district: string;
  state: string;
  resourceCategory: ResourceCategory;
  resourceName: string;
  severity: "critical" | "warning" | "info";
  currentLevel: number;
  minLevel: number;
  daysRemaining: number;
  status: "active" | "acknowledged" | "resolved";
  createdAt: string;
  message: {
    en: string;
    hi: string;
    bho: string;
  };
  recommendedTransfer?: TransferRecommendation;
}

export interface NearbyNotification {
  hospitalName: string;
  district: string;
  distanceKm: number;
  resourceRequested: string;
  quantityRequested: string;
  urgency: string;
  channels: {
    inApp: boolean;
    sms: boolean;
    whatsapp: boolean;
    email: boolean;
  };
}

export interface ForecastResult {
  phcId: string;
  phcName: string;
  district: string;
  riskLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  forecastDays: 7 | 15 | 30;
  predictedStockOutDate: string;
  affectedResources: string[];
  explanation: string;
  dataSignals: string[];
  recommendedActions: string[];
  nearbyFacilityNotifications: NearbyNotification[];
  redistributionPlan: TransferRecommendation[];
  isFallback: boolean;
  modelUsed: string;
  generatedAt: string;
}

export interface AuditLog {
  id: string;
  phcId: string;
  phcName: string;
  timestamp: string;
  updatedByRole: string;
  summary: string;
  category: string;
}

export type SupportedLanguage = "en" | "hi" | "bho";
