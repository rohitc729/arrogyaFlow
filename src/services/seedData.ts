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

export const INITIAL_PHCS: PHC[] = [
  {
    id: "PHC-BXR-012",
    name: "PHC Buxar Sadar (Sector 12)",
    code: "BR-BXR-12",
    state: "Bihar",
    district: "Buxar",
    subDistrict: "Buxar",
    coordinates: [25.5647, 83.9777],
    pincode: "802101",
    contactPhone: "+91 94318 20112",
    contactEmail: "moic.buxar12@biharhealth.gov.in",
    operationalStatus: "High Load",
    lastUpdated: "2026-09-18 09:30 AM",
    dataSource: "facility-live",
    overallRisk: "critical"
  },
  {
    id: "PHC-ARA-004",
    name: "PHC Ara Rural (Sector 04)",
    code: "BR-BHP-04",
    state: "Bihar",
    district: "Bhojpur",
    subDistrict: "Ara",
    coordinates: [25.5560, 84.6603],
    pincode: "802301",
    contactPhone: "+91 94318 44004",
    contactEmail: "moic.ara04@biharhealth.gov.in",
    operationalStatus: "Active",
    lastUpdated: "2026-09-18 08:45 AM",
    dataSource: "facility-live",
    overallRisk: "stable"
  },
  {
    id: "PHC-PAT-008",
    name: "PHC Danapur Cantonment",
    code: "BR-PAT-08",
    state: "Bihar",
    district: "Patna",
    subDistrict: "Danapur",
    coordinates: [25.6324, 85.0441],
    pincode: "801503",
    contactPhone: "+91 94318 78008",
    contactEmail: "moic.danapur08@biharhealth.gov.in",
    operationalStatus: "Active",
    lastUpdated: "2026-09-18 10:15 AM",
    dataSource: "facility-live",
    overallRisk: "moderate"
  },
  {
    id: "PHC-NAL-003",
    name: "PHC Rajgir Hills",
    code: "BR-NAL-03",
    state: "Bihar",
    district: "Nalanda",
    subDistrict: "Rajgir",
    coordinates: [25.0298, 85.4214],
    pincode: "803116",
    contactPhone: "+91 94318 90003",
    contactEmail: "moic.rajgir03@biharhealth.gov.in",
    operationalStatus: "Active",
    lastUpdated: "2026-09-17 04:20 PM",
    dataSource: "baseline-fallback",
    overallRisk: "stable"
  },
  {
    id: "PHC-VNS-007",
    name: "PHC Kashi Vishwanath Zone",
    code: "UP-VNS-07",
    state: "Uttar Pradesh",
    district: "Varanasi",
    subDistrict: "Varanasi Sadar",
    coordinates: [25.3176, 82.9739],
    pincode: "221001",
    contactPhone: "+91 94500 12007",
    contactEmail: "moic.vns07@uphealth.gov.in",
    operationalStatus: "High Load",
    lastUpdated: "2026-09-18 09:10 AM",
    dataSource: "facility-live",
    overallRisk: "moderate"
  },
  {
    id: "PHC-PRY-002",
    name: "PHC Naini Industrial Area",
    code: "UP-PRY-02",
    state: "Uttar Pradesh",
    district: "Prayagraj",
    subDistrict: "Karchhana",
    coordinates: [25.3855, 81.8711],
    pincode: "211008",
    contactPhone: "+91 94500 33002",
    contactEmail: "moic.naini02@uphealth.gov.in",
    operationalStatus: "Active",
    lastUpdated: "2026-09-18 07:50 AM",
    dataSource: "facility-live",
    overallRisk: "stable"
  },
  {
    id: "PHC-GKP-015",
    name: "PHC Campierganj Border",
    code: "UP-GKP-15",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    subDistrict: "Campierganj",
    coordinates: [26.9667, 83.2833],
    pincode: "273158",
    contactPhone: "+91 94500 89015",
    contactEmail: "moic.campier15@uphealth.gov.in",
    operationalStatus: "Under Resourced",
    lastUpdated: "2026-09-18 08:30 AM",
    dataSource: "open-gov",
    overallRisk: "critical"
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  // PHC Buxar Sadar (Critical shortage of ORS & Paracetamol)
  {
    id: "INV-BXR-01",
    phcId: "PHC-BXR-012",
    medicineName: "Oral Rehydration Salts (ORS 21.8g)",
    category: "Essential",
    unit: "Sachets",
    currentStock: 90,
    minSafeLevel: 500,
    maxCapacity: 2500,
    dailyConsumptionRate: 45,
    expiryDate: "2027-04-30",
    batchNumber: "ORS-24-902",
    lastRestocked: "2026-08-10",
    predictedDaysRemaining: 2,
    riskStatus: "critical"
  },
  {
    id: "INV-BXR-02",
    phcId: "PHC-BXR-012",
    medicineName: "Paracetamol 500mg Tablets",
    category: "Essential",
    unit: "Strips (10s)",
    currentStock: 180,
    minSafeLevel: 600,
    maxCapacity: 3000,
    dailyConsumptionRate: 60,
    expiryDate: "2027-08-31",
    batchNumber: "PCM-25-110",
    lastRestocked: "2026-08-15",
    predictedDaysRemaining: 3,
    riskStatus: "critical"
  },
  {
    id: "INV-BXR-03",
    phcId: "PHC-BXR-012",
    medicineName: "Amoxicillin 500mg Capsules",
    category: "Antibiotics",
    unit: "Strips (10s)",
    currentStock: 350,
    minSafeLevel: 400,
    maxCapacity: 2000,
    dailyConsumptionRate: 28,
    expiryDate: "2026-12-31",
    batchNumber: "AMX-24-340",
    lastRestocked: "2026-07-20",
    predictedDaysRemaining: 12,
    riskStatus: "moderate"
  },
  {
    id: "INV-BXR-04",
    phcId: "PHC-BXR-012",
    medicineName: "Anti-Snake Venom (ASV Polyvalent)",
    category: "Emergency",
    unit: "Vials",
    currentStock: 4,
    minSafeLevel: 15,
    maxCapacity: 50,
    dailyConsumptionRate: 1.5,
    expiryDate: "2027-06-30",
    batchNumber: "ASV-24-088",
    lastRestocked: "2026-08-01",
    predictedDaysRemaining: 2.6,
    riskStatus: "critical"
  },
  {
    id: "INV-BXR-05",
    phcId: "PHC-BXR-012",
    medicineName: "Oxytocin Injection 5 IU/ml",
    category: "Maternal & Child",
    unit: "Ampoules",
    currentStock: 45,
    minSafeLevel: 80,
    maxCapacity: 300,
    dailyConsumptionRate: 6,
    expiryDate: "2027-02-28",
    batchNumber: "OXY-24-554",
    lastRestocked: "2026-08-25",
    predictedDaysRemaining: 7.5,
    riskStatus: "moderate"
  },
  {
    id: "INV-BXR-06",
    phcId: "PHC-BXR-012",
    medicineName: "Anti-Rabies Vaccine (ARV 0.5ml)",
    category: "Vaccines",
    unit: "Vials",
    currentStock: 12,
    minSafeLevel: 25,
    maxCapacity: 100,
    dailyConsumptionRate: 2.2,
    expiryDate: "2027-05-31",
    batchNumber: "ARV-24-119",
    lastRestocked: "2026-08-12",
    predictedDaysRemaining: 5.4,
    riskStatus: "moderate"
  },

  // PHC Ara Rural (Surplus facility ~ 38 km away)
  {
    id: "INV-ARA-01",
    phcId: "PHC-ARA-004",
    medicineName: "Oral Rehydration Salts (ORS 21.8g)",
    category: "Essential",
    unit: "Sachets",
    currentStock: 1850,
    minSafeLevel: 450,
    maxCapacity: 2500,
    dailyConsumptionRate: 25,
    expiryDate: "2027-06-30",
    batchNumber: "ORS-24-914",
    lastRestocked: "2026-09-05",
    predictedDaysRemaining: 74,
    riskStatus: "stable"
  },
  {
    id: "INV-ARA-02",
    phcId: "PHC-ARA-004",
    medicineName: "Paracetamol 500mg Tablets",
    category: "Essential",
    unit: "Strips (10s)",
    currentStock: 2200,
    minSafeLevel: 500,
    maxCapacity: 3000,
    dailyConsumptionRate: 35,
    expiryDate: "2027-09-30",
    batchNumber: "PCM-25-188",
    lastRestocked: "2026-09-05",
    predictedDaysRemaining: 62,
    riskStatus: "stable"
  },
  {
    id: "INV-ARA-03",
    phcId: "PHC-ARA-004",
    medicineName: "Anti-Snake Venom (ASV Polyvalent)",
    category: "Emergency",
    unit: "Vials",
    currentStock: 38,
    minSafeLevel: 12,
    maxCapacity: 50,
    dailyConsumptionRate: 0.8,
    expiryDate: "2027-08-31",
    batchNumber: "ASV-24-142",
    lastRestocked: "2026-09-02",
    predictedDaysRemaining: 47,
    riskStatus: "stable"
  },

  // PHC Danapur Cantonment
  {
    id: "INV-PAT-01",
    phcId: "PHC-PAT-008",
    medicineName: "Oral Rehydration Salts (ORS 21.8g)",
    category: "Essential",
    unit: "Sachets",
    currentStock: 620,
    minSafeLevel: 500,
    maxCapacity: 2500,
    dailyConsumptionRate: 40,
    expiryDate: "2027-05-31",
    batchNumber: "ORS-24-811",
    lastRestocked: "2026-08-20",
    predictedDaysRemaining: 15.5,
    riskStatus: "stable"
  },
  {
    id: "INV-PAT-02",
    phcId: "PHC-PAT-008",
    medicineName: "Metformin 500mg Tablets",
    category: "Chronic Disease",
    unit: "Strips (10s)",
    currentStock: 210,
    minSafeLevel: 450,
    maxCapacity: 2000,
    dailyConsumptionRate: 30,
    expiryDate: "2027-03-31",
    batchNumber: "MET-24-402",
    lastRestocked: "2026-08-10",
    predictedDaysRemaining: 7,
    riskStatus: "moderate"
  },

  // PHC Gorakhpur Campierganj (Critical Antibiotics & Rabies)
  {
    id: "INV-GKP-01",
    phcId: "PHC-GKP-015",
    medicineName: "Amoxicillin 500mg Capsules",
    category: "Antibiotics",
    unit: "Strips (10s)",
    currentStock: 85,
    minSafeLevel: 400,
    maxCapacity: 2000,
    dailyConsumptionRate: 35,
    expiryDate: "2026-11-30",
    batchNumber: "AMX-24-190",
    lastRestocked: "2026-07-15",
    predictedDaysRemaining: 2.4,
    riskStatus: "critical"
  },
  {
    id: "INV-GKP-02",
    phcId: "PHC-GKP-015",
    medicineName: "Anti-Rabies Vaccine (ARV 0.5ml)",
    category: "Vaccines",
    unit: "Vials",
    currentStock: 3,
    minSafeLevel: 20,
    maxCapacity: 80,
    dailyConsumptionRate: 2.5,
    expiryDate: "2027-04-30",
    batchNumber: "ARV-24-055",
    lastRestocked: "2026-08-01",
    predictedDaysRemaining: 1.2,
    riskStatus: "critical"
  }
];

export const INITIAL_STAFF: StaffMemberAggregate[] = [
  {
    phcId: "PHC-BXR-012",
    doctorsMBBS: 1,
    doctorsPediatrician: 0,
    doctorsGynecologist: 1,
    doctorsEmergency: 0,
    pharmacists: 1,
    nurses: 4,
    labTechs: 1,
    totalPresentToday: 7,
    minimumRequired: 11,
    riskStatus: "critical"
  },
  {
    phcId: "PHC-ARA-004",
    doctorsMBBS: 3,
    doctorsPediatrician: 1,
    doctorsGynecologist: 1,
    doctorsEmergency: 1,
    pharmacists: 2,
    nurses: 8,
    labTechs: 2,
    totalPresentToday: 18,
    minimumRequired: 12,
    riskStatus: "stable"
  },
  {
    phcId: "PHC-PAT-008",
    doctorsMBBS: 2,
    doctorsPediatrician: 1,
    doctorsGynecologist: 1,
    doctorsEmergency: 1,
    pharmacists: 1,
    nurses: 6,
    labTechs: 2,
    totalPresentToday: 13,
    minimumRequired: 12,
    riskStatus: "stable"
  },
  {
    phcId: "PHC-NAL-003",
    doctorsMBBS: 2,
    doctorsPediatrician: 0,
    doctorsGynecologist: 1,
    doctorsEmergency: 0,
    pharmacists: 1,
    nurses: 5,
    labTechs: 1,
    totalPresentToday: 9,
    minimumRequired: 10,
    riskStatus: "moderate"
  },
  {
    phcId: "PHC-VNS-007",
    doctorsMBBS: 2,
    doctorsPediatrician: 1,
    doctorsGynecologist: 1,
    doctorsEmergency: 1,
    pharmacists: 2,
    nurses: 7,
    labTechs: 2,
    totalPresentToday: 15,
    minimumRequired: 14,
    riskStatus: "stable"
  },
  {
    phcId: "PHC-PRY-002",
    doctorsMBBS: 2,
    doctorsPediatrician: 1,
    doctorsGynecologist: 1,
    doctorsEmergency: 1,
    pharmacists: 1,
    nurses: 6,
    labTechs: 2,
    totalPresentToday: 13,
    minimumRequired: 12,
    riskStatus: "stable"
  },
  {
    phcId: "PHC-GKP-015",
    doctorsMBBS: 1,
    doctorsPediatrician: 0,
    doctorsGynecologist: 0,
    doctorsEmergency: 0,
    pharmacists: 1,
    nurses: 3,
    labTechs: 1,
    totalPresentToday: 5,
    minimumRequired: 10,
    riskStatus: "critical"
  }
];

export const INITIAL_BEDS: BedStatus[] = [
  {
    phcId: "PHC-BXR-012",
    totalBeds: 12,
    generalBedsOccupied: 10,
    generalBedsAvailable: 2,
    oxygenBedsOccupied: 2,
    oxygenBedsAvailable: 0,
    icuBedsOccupied: 0,
    icuBedsAvailable: 0,
    occupancyRatePercent: 91.6,
    riskStatus: "critical"
  },
  {
    phcId: "PHC-ARA-004",
    totalBeds: 20,
    generalBedsOccupied: 9,
    generalBedsAvailable: 7,
    oxygenBedsOccupied: 2,
    oxygenBedsAvailable: 2,
    icuBedsOccupied: 0,
    icuBedsAvailable: 0,
    occupancyRatePercent: 55.0,
    riskStatus: "stable"
  },
  {
    phcId: "PHC-PAT-008",
    totalBeds: 24,
    generalBedsOccupied: 16,
    generalBedsAvailable: 4,
    oxygenBedsOccupied: 3,
    oxygenBedsAvailable: 1,
    icuBedsOccupied: 0,
    icuBedsAvailable: 0,
    occupancyRatePercent: 79.1,
    riskStatus: "moderate"
  },
  {
    phcId: "PHC-NAL-003",
    totalBeds: 10,
    generalBedsOccupied: 4,
    generalBedsAvailable: 4,
    oxygenBedsOccupied: 1,
    oxygenBedsAvailable: 1,
    icuBedsOccupied: 0,
    icuBedsAvailable: 0,
    occupancyRatePercent: 50.0,
    riskStatus: "stable"
  },
  {
    phcId: "PHC-VNS-007",
    totalBeds: 18,
    generalBedsOccupied: 12,
    generalBedsAvailable: 3,
    oxygenBedsOccupied: 2,
    oxygenBedsAvailable: 1,
    icuBedsOccupied: 0,
    icuBedsAvailable: 0,
    occupancyRatePercent: 77.7,
    riskStatus: "moderate"
  },
  {
    phcId: "PHC-PRY-002",
    totalBeds: 16,
    generalBedsOccupied: 7,
    generalBedsAvailable: 7,
    oxygenBedsOccupied: 1,
    oxygenBedsAvailable: 1,
    icuBedsOccupied: 0,
    icuBedsAvailable: 0,
    occupancyRatePercent: 50.0,
    riskStatus: "stable"
  },
  {
    phcId: "PHC-GKP-015",
    totalBeds: 8,
    generalBedsOccupied: 7,
    generalBedsAvailable: 1,
    oxygenBedsOccupied: 1,
    oxygenBedsAvailable: 0,
    icuBedsOccupied: 0,
    icuBedsAvailable: 0,
    occupancyRatePercent: 87.5,
    riskStatus: "critical"
  }
];

export const INITIAL_EQUIPMENT: EquipmentStatus[] = [
  {
    phcId: "PHC-BXR-012",
    oxygenCylindersFilled: 2,
    oxygenCylindersEmpty: 5,
    ambulancesAvailable: 1,
    testKitsRapid: 25,
    testKitsPCR: 10,
    bloodUnitsAvailable: 2,
    ivFluidsBags: 45,
    ppeKitsAvailable: 30
  },
  {
    phcId: "PHC-ARA-004",
    oxygenCylindersFilled: 12,
    oxygenCylindersEmpty: 2,
    ambulancesAvailable: 2,
    testKitsRapid: 180,
    testKitsPCR: 40,
    bloodUnitsAvailable: 8,
    ivFluidsBags: 320,
    ppeKitsAvailable: 150
  },
  {
    phcId: "PHC-PAT-008",
    oxygenCylindersFilled: 8,
    oxygenCylindersEmpty: 4,
    ambulancesAvailable: 2,
    testKitsRapid: 95,
    testKitsPCR: 25,
    bloodUnitsAvailable: 5,
    ivFluidsBags: 180,
    ppeKitsAvailable: 90
  },
  {
    phcId: "PHC-NAL-003",
    oxygenCylindersFilled: 4,
    oxygenCylindersEmpty: 2,
    ambulancesAvailable: 1,
    testKitsRapid: 40,
    testKitsPCR: 15,
    bloodUnitsAvailable: 3,
    ivFluidsBags: 80,
    ppeKitsAvailable: 45
  },
  {
    phcId: "PHC-VNS-007",
    oxygenCylindersFilled: 9,
    oxygenCylindersEmpty: 3,
    ambulancesAvailable: 2,
    testKitsRapid: 110,
    testKitsPCR: 35,
    bloodUnitsAvailable: 6,
    ivFluidsBags: 210,
    ppeKitsAvailable: 110
  },
  {
    phcId: "PHC-PRY-002",
    oxygenCylindersFilled: 7,
    oxygenCylindersEmpty: 2,
    ambulancesAvailable: 1,
    testKitsRapid: 85,
    testKitsPCR: 20,
    bloodUnitsAvailable: 4,
    ivFluidsBags: 160,
    ppeKitsAvailable: 80
  },
  {
    phcId: "PHC-GKP-015",
    oxygenCylindersFilled: 1,
    oxygenCylindersEmpty: 4,
    ambulancesAvailable: 0,
    testKitsRapid: 15,
    testKitsPCR: 5,
    bloodUnitsAvailable: 1,
    ivFluidsBags: 20,
    ppeKitsAvailable: 15
  }
];

export const INITIAL_FOOTFALL: FootfallRecord[] = [
  { phcId: "PHC-BXR-012", date: "2026-09-17", outPatients: 142, emergencyPatients: 18, referralsOut: 6 },
  { phcId: "PHC-BXR-012", date: "2026-09-18", outPatients: 158, emergencyPatients: 22, referralsOut: 8 },
  { phcId: "PHC-ARA-004", date: "2026-09-17", outPatients: 110, emergencyPatients: 9, referralsOut: 2 },
  { phcId: "PHC-ARA-004", date: "2026-09-18", outPatients: 115, emergencyPatients: 11, referralsOut: 3 },
  { phcId: "PHC-PAT-008", date: "2026-09-17", outPatients: 185, emergencyPatients: 24, referralsOut: 5 },
  { phcId: "PHC-PAT-008", date: "2026-09-18", outPatients: 192, emergencyPatients: 26, referralsOut: 7 }
];

export const INITIAL_TRANSFERS: TransferRecommendation[] = [
  {
    id: "TR-2026-881",
    sourcePhcId: "PHC-ARA-004",
    sourcePhcName: "PHC Ara Rural (Sector 04)",
    destinationPhcId: "PHC-BXR-012",
    destinationPhcName: "PHC Buxar Sadar (Sector 12)",
    resourceCategory: "medicine",
    resourceName: "Oral Rehydration Salts (ORS 21.8g)",
    recommendedQuantity: 500,
    unit: "Sachets",
    distanceKm: 38.5,
    urgency: "Immediate (Within 6h)",
    estimatedStockOutDate: "2026-09-20",
    status: "pending"
  },
  {
    id: "TR-2026-882",
    sourcePhcId: "PHC-ARA-004",
    sourcePhcName: "PHC Ara Rural (Sector 04)",
    destinationPhcId: "PHC-BXR-012",
    destinationPhcName: "PHC Buxar Sadar (Sector 12)",
    resourceCategory: "medicine",
    resourceName: "Paracetamol 500mg Tablets",
    recommendedQuantity: 400,
    unit: "Strips (10s)",
    distanceKm: 38.5,
    urgency: "High (Within 24h)",
    estimatedStockOutDate: "2026-09-21",
    status: "pending"
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: "ALT-901",
    phcId: "PHC-BXR-012",
    phcName: "PHC Buxar Sadar (Sector 12)",
    district: "Buxar",
    state: "Bihar",
    resourceCategory: "medicine",
    resourceName: "Oral Rehydration Salts (ORS 21.8g)",
    severity: "critical",
    currentLevel: 90,
    minLevel: 500,
    daysRemaining: 2.0,
    status: "active",
    createdAt: "2026-09-18 07:15 AM",
    message: {
      en: "Critical Alert: PHC Buxar-12 may run out of ORS in 2 days. Nearby facilities have been notified. Recommended transfer: 500 ORS packets from PHC Ara-04.",
      hi: "आपातकालीन सूचना: पीएचसी बक्सर-12 में 2 दिनों में ओआरएस समाप्त हो सकता है। निकटवर्ती केंद्रों को सूचित किया गया। अनुशंसित स्थानांतरण: पीएचसी आरा-04 से 500 ओआरएस पैकेट।",
      bho: "अति आवश्यक चेतावनी: पीएचसी बक्सर-12 में 2 दिन में ओआरएस खतम होखे वाला बा। बगल के अस्पतालन के खबर भेजल गइल। सलाह: पीएचसी आरा-04 से 500 पैकेट ओआरएस मँगावल जाव।"
    },
    recommendedTransfer: INITIAL_TRANSFERS[0]
  },
  {
    id: "ALT-902",
    phcId: "PHC-BXR-012",
    phcName: "PHC Buxar Sadar (Sector 12)",
    district: "Buxar",
    state: "Bihar",
    resourceCategory: "medicine",
    resourceName: "Anti-Snake Venom (ASV Polyvalent)",
    severity: "critical",
    currentLevel: 4,
    minLevel: 15,
    daysRemaining: 2.6,
    status: "active",
    createdAt: "2026-09-18 08:00 AM",
    message: {
      en: "Critical Alert: PHC Buxar-12 ASV stock is down to 4 vials. Severe risk during monsoon spike. Recommend 10 vials from PHC Ara-04.",
      hi: "आपातकालीन सूचना: पीएचसी बक्सर-12 में एंटी-स्नेक वेनम केवल 4 शीशियां बची हैं। पीएचसी आरा-04 से 10 शीशियां मंगाना अनुशंसित है।",
      bho: "चेतावनी: पीएचसी बक्सर-12 में साँप काटे के दवाई खाली 4 शीशी बचल बा। आरा-04 से 10 शीशी तुरंते मँगावे के चाहीं।"
    }
  },
  {
    id: "ALT-903",
    phcId: "PHC-GKP-015",
    phcName: "PHC Campierganj Border",
    district: "Gorakhpur",
    state: "Uttar Pradesh",
    resourceCategory: "medicine",
    resourceName: "Anti-Rabies Vaccine (ARV 0.5ml)",
    severity: "critical",
    currentLevel: 3,
    minLevel: 20,
    daysRemaining: 1.2,
    status: "active",
    createdAt: "2026-09-18 06:45 AM",
    message: {
      en: "Critical Alert: PHC Campierganj ARV vaccine stock will deplete within 28 hours. Animal bite cases rising.",
      hi: "गंभीर चेतावनी: पीएचसी कैंपियरगंज में एंटी-रेबीज वैक्सीन 28 घंटे में समाप्त हो जाएगी।",
      bho: "बड़ा चेतावनी: कैंपियरगंज पीएचसी में कुक्कुर काटे के सुई 28 घंटा में खतम हो जाई।"
    }
  },
  {
    id: "ALT-904",
    phcId: "PHC-BXR-012",
    phcName: "PHC Buxar Sadar (Sector 12)",
    district: "Buxar",
    state: "Bihar",
    resourceCategory: "oxygen",
    resourceName: "Medical Oxygen Cylinders",
    severity: "critical",
    currentLevel: 2,
    minLevel: 6,
    daysRemaining: 1.5,
    status: "active",
    createdAt: "2026-09-18 09:00 AM",
    message: {
      en: "Critical Oxygen Alert: Only 2 filled cylinders available at PHC Buxar-12. 5 empty cylinders awaiting depot refill.",
      hi: "ऑक्सीजन अलर्ट: पीएचसी बक्सर-12 में केवल 2 भरे हुए सिलेंडर शेष हैं।",
      bho: "ऑक्सीजन अलर्ट: बक्सर-12 में खाली 2 गो भरल सिलेंडर बचल बा।"
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "AUD-101",
    phcId: "PHC-BXR-012",
    phcName: "PHC Buxar Sadar (Sector 12)",
    timestamp: "2026-09-18 09:30 AM",
    updatedByRole: "Pharmacist In-Charge (M. Kumar)",
    summary: "Daily physical bin-card stock audit for ORS and PCM registered.",
    category: "Medicine Stock"
  },
  {
    id: "AUD-102",
    phcId: "PHC-ARA-004",
    phcName: "PHC Ara Rural (Sector 04)",
    timestamp: "2026-09-18 08:45 AM",
    updatedByRole: "Medical Officer (Dr. S. Tiwary)",
    summary: "Verified state warehouse delivery of 2,000 ORS sachets and 12 O2 cylinders.",
    category: "Warehouse Delivery"
  }
];
