import { SupportedLanguage } from "../types";

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  nav: {
    landing: string;
    commandCentre: string;
    phcDetail: string;
    forecast: string;
    alerts: string;
    resourceUpdate: string;
    federated: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statPhcs: string;
    statStockouts: string;
    statTransfers: string;
    statResponseTime: string;
  };
  kpi: {
    totalPhcs: string;
    criticalRisks: string;
    availableBeds: string;
    doctorsPresent: string;
    nursesPresent: string;
    emergencyAlerts: string;
    phcsMonitoredDesc: string;
    criticalRisksDesc: string;
    bedsOccupancyDesc: string;
    doctorDutyDesc: string;
    nurseDutyDesc: string;
    unresolvedDesc: string;
  };
  filters: {
    allStates: string;
    allDistricts: string;
    allPhcs: string;
    allCategories: string;
    allRisks: string;
    state: string;
    district: string;
    phc: string;
    resource: string;
    riskLevel: string;
    dateRange: string;
    searchPlaceholder: string;
  };
  status: {
    stable: string;
    moderate: string;
    critical: string;
    incoming: string;
    active: string;
    acknowledged: string;
    resolved: string;
  };
  phcDetail: {
    facilityProfile: string;
    contactOfficer: string;
    phone: string;
    pincode: string;
    dataSource: string;
    lastUpdated: string;
    medicineInventory: string;
    bedAvailability: string;
    doctorAvailability: string;
    nurseCount: string;
    equipmentAndSupplies: string;
    patientFootfall: string;
    currentStock: string;
    minSafeLevel: string;
    burnRate: string;
    daysRemaining: string;
    statusBadge: string;
    action: string;
    tableSearch: string;
    medicineCol: string;
    categoryCol: string;
    stockCol: string;
    burnCol: string;
    forecastCol: string;
    expiryCol: string;
  };
  forecast: {
    title: string;
    subtitle: string;
    selectPhc: string;
    timeHorizon: string;
    sevenDays: string;
    fifteenDays: string;
    thirtyDays: string;
    runForecastBtn: string;
    aiAnalyzing: string;
    whyRisk: string;
    signals: string;
    recommendedActions: string;
    redistributionTitle: string;
    fromSource: string;
    toDestination: string;
    resourceReq: string;
    quantity: string;
    distance: string;
    urgency: string;
    approveTransfer: string;
    contactNearby: string;
    approvedSuccess: string;
    disclaimer: string;
  };
  alerts: {
    title: string;
    subtitle: string;
    activeAlerts: string;
    criticalPopupTitle: string;
    acknowledgeBtn: string;
    resolveBtn: string;
    playAudioBtn: string;
    dispatchNotificationBtn: string;
    dispatchedSuccess: string;
    recipientFacilities: string;
    channelStatus: string;
  };
  resourceUpdate: {
    title: string;
    subtitle: string;
    privacyNotice: string;
    facilitySelect: string;
    medicineStock: string;
    bedOccupancy: string;
    doctorAttendance: string;
    nurseAttendance: string;
    dailyFootfall: string;
    equipment: string;
    submitUpdate: string;
    csvImportTitle: string;
    downloadSample: string;
    uploadCsv: string;
    auditLogTitle: string;
    updateSuccess: string;
  };
  federated: {
    title: string;
    subtitle: string;
    howItWorks: string;
    localTrainingTitle: string;
    localTrainingDesc: string;
    secureAggregationTitle: string;
    secureAggregationDesc: string;
    globalModelTitle: string;
    globalModelDesc: string;
    stateNodes: string;
    globalModelVersion: string;
    prototypeDisclaimer: string;
  };
  voice: {
    listening: string;
    listeningDesc: string;
    unmute: string;
    mute: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: "AarogyaFlow AI",
    appTagline: "India's PHC Health-Resource & Supply-Chain Intelligence",
    nav: {
      landing: "Home",
      commandCentre: "National Command Centre",
      phcDetail: "PHC Inventory",
      forecast: "AI Forecast & Redistribution",
      alerts: "Emergency Alerts",
      resourceUpdate: "Facility Update (Auth)",
      federated: "Federated Learning",
    },
    hero: {
      badge: "National Health Mission · Federated Edge Intelligence",
      title: "Predict shortages before they become emergencies.",
      subtitle: "Federated AI platform monitoring medicine stock, bed occupancy, doctor rosters, and critical supplies across 25,000+ Indian Primary Health Centres (PHCs).",
      ctaPrimary: "Open Command Centre",
      ctaSecondary: "Facility Data Login",
      statPhcs: "25,840+",
      statStockouts: "94.2%",
      statTransfers: "12,480",
      statResponseTime: "< 4.5 hrs",
    },
    kpi: {
      totalPhcs: "PHCs Monitored",
      criticalRisks: "Stock-Out Risks",
      availableBeds: "Available Beds",
      doctorsPresent: "Doctors On Duty",
      nursesPresent: "Nurses On Duty",
      emergencyAlerts: "Active Emergency Alerts",
      phcsMonitoredDesc: "Across 18 high-focus districts",
      criticalRisksDesc: "Stock projected < 3 days",
      bedsOccupancyDesc: "76.4% regional occupancy",
      doctorDutyDesc: "MBBS & Specialities tracked",
      nurseDutyDesc: "Shift-based roster sync",
      unresolvedDesc: "Requires immediate dispatch",
    },
    filters: {
      allStates: "All States",
      allDistricts: "All Districts",
      allPhcs: "All Health Centres",
      allCategories: "All Resource Types",
      allRisks: "All Risk Levels",
      state: "State",
      district: "District",
      phc: "Health Facility",
      resource: "Resource Category",
      riskLevel: "Risk Level",
      dateRange: "Observation Window",
      searchPlaceholder: "Search medicine, doctor, or facility...",
    },
    status: {
      stable: "Stable",
      moderate: "Low Stock / Risk",
      critical: "Critical Shortage",
      incoming: "Transfer In-Transit",
      active: "Active Alarm",
      acknowledged: "Acknowledged",
      resolved: "Resolved",
    },
    phcDetail: {
      facilityProfile: "Facility Profile & Live Capacity",
      contactOfficer: "Medical Officer In-Charge",
      phone: "Emergency Phone",
      pincode: "PIN / Location",
      dataSource: "Data Provenance",
      lastUpdated: "Last Verified",
      medicineInventory: "Medicine Inventory",
      bedAvailability: "Beds & Inpatient Capacity",
      doctorAvailability: "Doctor Roster by Speciality",
      nurseCount: "Nursing Staff On Duty",
      equipmentAndSupplies: "Oxygen & Diagnostic Kits",
      patientFootfall: "Daily Patient Footfall",
      currentStock: "Current Stock",
      minSafeLevel: "Min Buffer",
      burnRate: "Daily Burn",
      daysRemaining: "Days Remaining",
      statusBadge: "Risk Status",
      action: "Action",
      tableSearch: "Filter medicine by name, salt, or batch...",
      medicineCol: "Medicine & Salt",
      categoryCol: "Category",
      stockCol: "Current Stock",
      burnCol: "Daily Consumption",
      forecastCol: "Days Left",
      expiryCol: "Batch & Expiry",
    },
    forecast: {
      title: "AI Supply-Chain Forecasting & Cross-PHC Redistribution",
      subtitle: "Powered by Gemini Edge Intelligence and federated trend analysis",
      selectPhc: "Select Primary Health Centre",
      timeHorizon: "Forecast Horizon",
      sevenDays: "7 Days Ahead",
      fifteenDays: "15 Days Ahead",
      thirtyDays: "30 Days Ahead",
      runForecastBtn: "Generate Gemini AI Forecast",
      aiAnalyzing: "Analyzing local clinical consumption, seasonal disease patterns & supply logs...",
      whyRisk: "Why is this shortage predicted?",
      signals: "Key Data Signals Detected",
      recommendedActions: "Recommended Actions for Chief Medical Officer",
      redistributionTitle: "Automated Cross-District Redistribution Plan",
      fromSource: "Surplus Facility (Source)",
      toDestination: "Deficit Facility (Destination)",
      resourceReq: "Resource & Medicine",
      quantity: "Recommended Quantity",
      distance: "Transit Distance",
      urgency: "Dispatch Urgency",
      approveTransfer: "Approve Transfer & Generate Gatepass",
      contactNearby: "Contact Nearby PHC Team",
      approvedSuccess: "Transfer Order Authorized! Waybill dispatched to state cold-chain logistics.",
      disclaimer: "AI-generated recommendation; human medical officer approval required before dispatch.",
    },
    alerts: {
      title: "Emergency Alert Centre & Rapid Dispatch",
      subtitle: "Immediate intervention alerts for life-saving medicines, beds, and oxygen",
      activeAlerts: "Active Emergency Triggers",
      criticalPopupTitle: "CRITICAL STOCK-OUT RISK DETECTED",
      acknowledgeBtn: "Acknowledge Alert",
      resolveBtn: "Mark Resolved",
      playAudioBtn: "Play Voice Announcement",
      dispatchNotificationBtn: "Simulate Multi-Channel Broadcast",
      dispatchedSuccess: "Emergency broadcast dispatched via In-App, SMS, WhatsApp & MoHFW Portal!",
      recipientFacilities: "Nearby Facilities Alerted",
      channelStatus: "Broadcast Channel Status",
    },
    resourceUpdate: {
      title: "Authorised Facility Operational Portal",
      subtitle: "Submit daily aggregated stock, bed, and staff counts",
      privacyNotice: "Zero Patient Data Guarantee: Only aggregated facility resource numbers are collected. No patient names, Aadhaar numbers, or individual medical records are ever captured or stored.",
      facilitySelect: "Your Primary Health Centre",
      medicineStock: "Medicine Stock Adjustments",
      bedOccupancy: "Bed Occupancy Status",
      doctorAttendance: "Doctor Attendance by Speciality",
      nurseAttendance: "Nurses on Active Duty",
      dailyFootfall: "Today's Patient Footfall",
      equipment: "Oxygen & Diagnostic Kits",
      submitUpdate: "Submit Verified Operational Log",
      csvImportTitle: "Bulk CSV Operational Upload",
      downloadSample: "Download Sample Template (.csv)",
      uploadCsv: "Upload Aggregated CSV File",
      auditLogTitle: "Facility Submission Audit Timeline",
      updateSuccess: "Facility records updated and synchronized into federated pipeline.",
    },
    federated: {
      title: "Federated Learning Architecture & Data Sovereignty",
      subtitle: "Privacy-preserving AI where patient data never leaves the state or district boundary",
      howItWorks: "How Edge Federated Learning Protects Public Health Data",
      localTrainingTitle: "1. Local Edge Training",
      localTrainingDesc: "Each District/PHC server computes model weight updates locally on aggregated clinic logs. Sensitive raw records never leave the local node.",
      secureAggregationTitle: "2. Differential Privacy Aggregation",
      secureAggregationDesc: "Secure aggregation servers combine mathematical gradients with noise injection, eliminating the risk of data reconstruction.",
      globalModelTitle: "3. Global Supply Intelligence",
      globalModelDesc: "The synchronized global model distributes optimized stock forecasts back to all rural facilities nationwide.",
      stateNodes: "Federated State Node Health & Synchronization",
      globalModelVersion: "Global Federated Model Version",
      prototypeDisclaimer: "Notice: This dashboard is a simulation prototype demonstrating the privacy-preserving federated architecture. Deployment in live environments requires compliance with DPDP Act 2023 and MoHFW governance.",
    },
    voice: {
      listening: "Voice Query Active",
      listeningDesc: "Speak medicine name or PHC...",
      unmute: "Unmute Audio Broadcast",
      mute: "Mute Audio Alerts",
    },
  },
  hi: {
    appName: "आरोग्यफ्लो एआई (AarogyaFlow AI)",
    appTagline: "भारत की प्राथमिक स्वास्थ्य केंद्र (PHC) स्वास्थ्य संसाधन एवं दवा आपूर्ति प्रबंधन प्रणाली",
    nav: {
      landing: "मुख्य पृष्ठ",
      commandCentre: "राष्ट्रीय कमांड सेंटर",
      phcDetail: "पीएचसी भंडार सूची",
      forecast: "एआई पूर्वानुमान एवं पुनर्वितरण",
      alerts: "आपातकालीन चेतावनी",
      resourceUpdate: "संसाधन अपडेट (अधिकृत)",
      federated: "फेडरेटेड लर्निंग",
    },
    hero: {
      badge: "राष्ट्रीय स्वास्थ्य मिशन · गोपनीयता-संरक्षित एआई",
      title: "दवा व संसाधनों की कमी को आपातकाल बनने से पहले पहचानें।",
      subtitle: "25,000 से अधिक प्राथमिक स्वास्थ्य केंद्रों में दवाओं, बिस्तरों, डॉक्टरों और ऑक्सीजन की रीयल-टाइम निगरानी व पूर्वानुमान।",
      ctaPrimary: "कमांड सेंटर खोलें",
      ctaSecondary: "संस्थान डेटा लॉगिन",
      statPhcs: "25,840+",
      statStockouts: "94.2%",
      statTransfers: "12,480",
      statResponseTime: "< 4.5 घंटे",
    },
    kpi: {
      totalPhcs: "निगरानी अधीन पीएचसी",
      criticalRisks: "गंभीर कमी वाले केंद्र",
      availableBeds: "उपलब्ध बिस्तर",
      doctorsPresent: "उपस्थित चिकित्सक",
      nursesPresent: "उपस्थित नर्सें",
      emergencyAlerts: "सक्रिय आपातकालीन अलर्ट",
      phcsMonitoredDesc: "18 उच्च प्राथमिकता जिलों में",
      criticalRisksDesc: "स्टॉक 3 दिन से कम का अनुमान",
      bedsOccupancyDesc: "76.4% क्षेत्रीय उपयोग",
      doctorDutyDesc: "एमबीबीएस एवं विशेषज्ञ ड्यूटी पर",
      nurseDutyDesc: "शिफ्ट रोस्टर के अनुसार",
      unresolvedDesc: "त्वरित आपूर्ति आवश्यक",
    },
    filters: {
      allStates: "सभी राज्य",
      allDistricts: "सभी जिले",
      allPhcs: "सभी प्राथमिक स्वास्थ्य केंद्र",
      allCategories: "सभी संसाधन श्रेणियां",
      allRisks: "सभी जोखिम स्तर",
      state: "राज्य",
      district: "जिला",
      phc: "स्वास्थ्य केंद्र",
      resource: "संसाधन प्रकार",
      riskLevel: "जोखिम स्तर",
      dateRange: "समय सीमा",
      searchPlaceholder: "दवा, डॉक्टर या केंद्र खोजें...",
    },
    status: {
      stable: "सुरक्षित (स्थिर)",
      moderate: "मध्यम जोखिम",
      critical: "गंभीर कमी (अति आवश्यक)",
      incoming: "दवा रास्ते में है",
      active: "सक्रिय चेतावनी",
      acknowledged: "स्वीकृत",
      resolved: "समाधान पूर्ण",
    },
    phcDetail: {
      facilityProfile: "स्वास्थ्य केंद्र विवरण एवं क्षमता",
      contactOfficer: "प्रभारी चिकित्सा अधिकारी",
      phone: "आपातकालीन फोन",
      pincode: "पिन कोड / स्थान",
      dataSource: "डेटा स्रोत",
      lastUpdated: "अंतिम सत्यापन",
      medicineInventory: "दवा भंडार सूची",
      bedAvailability: "बिस्तरों की उपलब्धता",
      doctorAvailability: "विशेषज्ञता अनुसार डॉक्टर",
      nurseCount: "कर्तव्यस्थ नर्सों की संख्या",
      equipmentAndSupplies: "ऑक्सीजन एवं जांच किट",
      patientFootfall: "दैनिक रोगी संख्या",
      currentStock: "मौजूदा स्टॉक",
      minSafeLevel: "न्यूनतम सुरक्षित स्तर",
      burnRate: "दैनिक खपत",
      daysRemaining: "शेष अनुमानित दिन",
      statusBadge: "स्थिति",
      action: "कार्रवाई",
      tableSearch: "दवा के नाम या साल्ट से खोजें...",
      medicineCol: "दवा एवं साल्ट",
      categoryCol: "श्रेणी",
      stockCol: "वर्तमान स्टॉक",
      burnCol: "दैनिक खपत",
      forecastCol: "शेष दिन",
      expiryCol: "बैच एवं समाप्ति तिथि",
    },
    forecast: {
      title: "एआई आपूर्ति पूर्वानुमान एवं अंतर-पीएचसी पुनर्वितरण",
      subtitle: "जेमिनी एआई और सुरक्षित डेटा विश्लेषण द्वारा संचालित",
      selectPhc: "प्राथमिक स्वास्थ्य केंद्र चुनें",
      timeHorizon: "पूर्वानुमान अवधि",
      sevenDays: "अगले 7 दिन",
      fifteenDays: "अगले 15 दिन",
      thirtyDays: "अगले 30 दिन",
      runForecastBtn: "जेमिनी एआई विश्लेषण आरंभ करें",
      aiAnalyzing: "रोग चक्र, मौसम और क्लिनिकल खपत डेटा का विश्लेषण हो रहा है...",
      whyRisk: "इस कमी का क्या कारण है?",
      signals: "पहचाने गए मुख्य डेटा संकेत",
      recommendedActions: "मुख्य चिकित्सा अधिकारी हेतु संस्तुतियां",
      redistributionTitle: "स्वचालित अंतर-जिला संसाधन पुनर्वितरण योजना",
      fromSource: "अधिशेष केंद्र (स्रोत)",
      toDestination: "कमी वाला केंद्र (गंतव्य)",
      resourceReq: "आवश्यक संसाधन",
      quantity: "अनुशंसित मात्रा",
      distance: "दूरी",
      urgency: "प्राथमिकता",
      approveTransfer: "स्थानांतरण स्वीकृत करें",
      contactNearby: "निकटवर्ती पीएचसी से संपर्क करें",
      approvedSuccess: "संसाधन स्थानांतरण आदेश जारी! राज्य लॉजिस्टिक्स को सूचित किया गया।",
      disclaimer: "एआई द्वारा जनरेटेड सुझाव; स्थानांतरण से पूर्व चिकित्सा अधिकारी की स्वीकृति अनिवार्य है।",
    },
    alerts: {
      title: "आपातकालीन चेतावनी केंद्र",
      subtitle: "जीवन रक्षक दवाओं, बिस्तरों और ऑक्सीजन के लिए त्वरित चेतावनी प्रणाली",
      activeAlerts: "सक्रिय आपातकालीन अलर्ट",
      criticalPopupTitle: "अति आवश्यक: गंभीर दवा कमी की चेतावनी",
      acknowledgeBtn: "अलर्ट स्वीकार करें",
      resolveBtn: "समाधान चिह्नित करें",
      playAudioBtn: "आवाज में अलर्ट सुनें",
      dispatchNotificationBtn: "मल्टी-चैनल चेतावनी भेजें",
      dispatchedSuccess: "एसएमएस, व्हाट्सएप, ईमेल और पोर्टल द्वारा चेतावनी प्रसारित की गई!",
      recipientFacilities: "सूचित किए गए निकटवर्ती अस्पताल",
      channelStatus: "प्रसारण चैनल स्थिति",
    },
    resourceUpdate: {
      title: "अधिकृत स्वास्थ्य कर्मी दैनिक प्रविष्टि पोर्टल",
      subtitle: "दैनिक स्टॉक, बिस्तर एवं स्टाफ की प्रामाणिक जानकारी दर्ज करें",
      privacyNotice: "गोपनीयता गारंटी: केवल समेकित संख्याएं एकत्र की जाती हैं। किसी भी मरीज का नाम, आधार संख्या या व्यक्तिगत स्वास्थ्य रिकॉर्ड एकत्र नहीं किया जाता।",
      facilitySelect: "अपना प्राथमिक स्वास्थ्य केंद्र चुनें",
      medicineStock: "दवा स्टॉक परिवर्तन",
      bedOccupancy: "बिस्तर उपयोग स्थिति",
      doctorAttendance: "विशेषज्ञ अनुसार डॉक्टर उपस्थिति",
      nurseAttendance: "नर्स उपस्थिति",
      dailyFootfall: "आज के ओपीडी रोगी",
      equipment: "ऑक्सीजन सिलेंडर एवं किट",
      submitUpdate: "सत्यापित डेटा सहेजें",
      csvImportTitle: "सीएसवी (CSV) द्वारा थोक अपलोड",
      downloadSample: "सैंपल टेम्पलेट डाउनलोड करें",
      uploadCsv: "सीएसवी फाइल चुनें",
      auditLogTitle: "ऑडिट एवं संशोधन इतिहास",
      updateSuccess: "रिकॉर्ड सफलतापूर्वक अपडेट किए गए!",
    },
    federated: {
      title: "फेडरेटेड लर्निंग एवं डेटा संप्रभुता",
      subtitle: "मरीजों का डेटा स्थानीय स्तर पर सुरक्षित रहता है, केवल मॉडल अंतर्दृष्टि साझा होती है",
      howItWorks: "फेडरेटेड लर्निंग कैसे काम करती है",
      localTrainingTitle: "1. स्थानीय एज ट्रेनिंग",
      localTrainingDesc: "प्रत्येक जिला सर्वर स्थानीय स्तर पर मॉडल को प्रशिक्षित करता है। संवेदनशील डेटा कभी बाहर नहीं जाता।",
      secureAggregationTitle: "2. विभेदक गोपनीयता एकत्रीकरण",
      secureAggregationDesc: "केंद्रीय सर्वर केवल गणितीय ग्रेडिएंट्स को जोड़ता है ताकि व्यक्तिगत डेटा का पुनर्निर्माण असंभव हो।",
      globalModelTitle: "3. वैश्विक आपूर्ति बुद्धिमत्ता",
      globalModelDesc: "सर्वोत्तम आपूर्ति मॉडल देश भर के सभी ग्रामीण केंद्रों को वापस भेजा जाता है।",
      stateNodes: "राज्य नोड्स की सक्रियता एवं स्थिति",
      globalModelVersion: "वैश्विक मॉडल संस्करण",
      prototypeDisclaimer: "ध्यान दें: यह एक सिमुलेशन प्रोटोटाइप है। वास्तविक कार्यान्वयन के लिए स्वास्थ्य मंत्रालय और डेटा संरक्षण अधिनियम की मंजूरी आवश्यक है।",
    },
    voice: {
      listening: "ध्वनि खोज सक्रिय",
      listeningDesc: "दवा या पीएचसी का नाम बोलें...",
      unmute: "आवाज अलर्ट चालू करें",
      mute: "आवाज अलर्ट बंद करें",
    },
  },
  bho: {
    appName: "आरोग्यफ्लो एआई (AarogyaFlow AI)",
    appTagline: "बिहार आ भारत के प्राथमिक स्वास्थ्य केंद्र खातिर दवा आ संसाधन प्रबंधन प्रणाली",
    nav: {
      landing: "घर",
      commandCentre: "कमांड सेंटर",
      phcDetail: "दवा सूची",
      forecast: "एआई भविष्यवाणी आ बँटवारा",
      alerts: "खतरे के घंटी (अलर्ट)",
      resourceUpdate: "संसाधन जानकारी दर्ज करीं",
      federated: "फेडरेटेड लर्निंग",
    },
    hero: {
      badge: "राष्ट्रीय स्वास्थ्य मिशन · गाँव-गाँव ले सुरक्षा",
      title: "दवाई के कमी आफत बने से पहिले पहचान लीं।",
      subtitle: "गाँव-देहात के पीएचसी में दवाई, बेड, डाक्टर आ ऑक्सीजन के कमी के पहिले बतावे वाला स्मार्ट एआई सिस्टम।",
      ctaPrimary: "कमांड सेंटर देखीं",
      ctaSecondary: "पीएचसी लॉगिन करीं",
      statPhcs: "25,840+",
      statStockouts: "94.2%",
      statTransfers: "12,480",
      statResponseTime: "< 4.5 घंटा",
    },
    kpi: {
      totalPhcs: "निगरानी वाला पीएचसी",
      criticalRisks: "गंभीर कमी वाला केंद्र",
      availableBeds: "खाली पलंग (बेड)",
      doctorsPresent: "हाजिर डाक्टर",
      nursesPresent: "हाजिर नर्स",
      emergencyAlerts: "सक्रिय इमरजेंसी अलर्ट",
      phcsMonitoredDesc: "18 गो प्रमुख जिला में",
      criticalRisksDesc: "स्टॉक 3 दिन में खतम होखे के अंदेशा",
      bedsOccupancyDesc: "76.4% बेड भरल बा",
      doctorDutyDesc: "एमबीबीएस आ विशेषज्ञ डियूटी पर",
      nurseDutyDesc: "रोस्टर के अनुसार",
      unresolvedDesc: "तुरंते मदद पहुँचावे के बा",
    },
    filters: {
      allStates: "सभ राज्य",
      allDistricts: "सभ जिला",
      allPhcs: "सभ पीएचसी",
      allCategories: "सभ किसिम के समान",
      allRisks: "सभ खतरा स्तर",
      state: "राज्य",
      district: "जिला",
      phc: "स्वास्थ्य केंद्र",
      resource: "सामान के प्रकार",
      riskLevel: "खतरा स्तर",
      dateRange: "समय",
      searchPlaceholder: "दवा, डाक्टर भा अस्पताल खोजीं...",
    },
    status: {
      stable: "सब ठीक बा (स्थिर)",
      moderate: "कमी के खतरा बा",
      critical: "एकदम खतम होखे वाला बा!",
      incoming: "रास्ता में बा",
      active: "अलर्ट चालू बा",
      acknowledged: "देख लिहल गइल",
      resolved: "सुलझा दिहल गइल",
    },
    phcDetail: {
      facilityProfile: "स्वास्थ्य केंद्र के जानकारी",
      contactOfficer: "प्रभारी डाक्टर साहेब",
      phone: "फोन नंबर",
      pincode: "पिन कोड",
      dataSource: "डेटा कहाँ से आइल",
      lastUpdated: "आखिरी जाँच",
      medicineInventory: "दवाई के भंडार",
      bedAvailability: "बेड के हाल-चाल",
      doctorAvailability: "डाक्टर लोगन के हाजिरी",
      nurseCount: "नर्स दीदी लोगन के संख्या",
      equipmentAndSupplies: "ऑक्सीजन आ जाँच किट",
      patientFootfall: "आज आइल मरीज",
      currentStock: "अहिले के स्टॉक",
      minSafeLevel: "कम से कम चाहीं",
      burnRate: "रोज के खरच",
      daysRemaining: "केतना दिन बची",
      statusBadge: "हालत",
      action: "काम करीं",
      tableSearch: "दवाई के नाम से खोजीं...",
      medicineCol: "दवाई",
      categoryCol: "किसिम",
      stockCol: "बचल स्टॉक",
      burnCol: "रोज के खपत",
      forecastCol: "बचल दिन",
      expiryCol: "बैच आ एक्सपायरी",
    },
    forecast: {
      title: "एआई भविष्यवाणी आ बगल के पीएचसी से दवा अदला-बदली",
      subtitle: "जेमिनी एआई से जानल जाई कि कहाँ कवन दवाई क दिन बाद खतम हो जाई",
      selectPhc: "पीएचसी चुनीं",
      timeHorizon: "केतना दिन के देखे के बा",
      sevenDays: "7 दिन",
      fifteenDays: "15 दिन",
      thirtyDays: "30 दिन",
      runForecastBtn: "जेमिनी एआई से जाँच करवाईं",
      aiAnalyzing: "मौसम, बेमारी के लहर आ रोज के खरच के जाँच हो रहल बा...",
      whyRisk: "ई दवाई काहे खतम होखे वाला बा?",
      signals: "कवन-कवन बात से पता चलल",
      recommendedActions: "डाक्टर साहेब खातिर सलाह",
      redistributionTitle: "बगल के पीएचसी से तुरंते दवा मँगावे के योजना",
      fromSource: "जहाँ जादे बा (भेजे वाला केंद्र)",
      toDestination: "जहाँ कमी बा (पावे वाला केंद्र)",
      resourceReq: "दवाई भा सामान",
      quantity: "केतना भेजे के बा",
      distance: "दूरी",
      urgency: "केतना जल्दी चाहीं",
      approveTransfer: "दवा भेजे के मंजूरी दीं",
      contactNearby: "बगल के अस्पताल में फोन करीं",
      approvedSuccess: "मंजूरी मिल गइल! रास्ता के चालान बन गइल बा।",
      disclaimer: "ई एआई के सलाह ह; डाक्टर साहेब के मंजूरी बिना दवाई ना जाई।",
    },
    alerts: {
      title: "आपातकालीन चेतावनी केंद्र",
      subtitle: "दवाई, बेड आ ऑक्सीजन खतम होखे से पहिले खबर करे के सिस्टम",
      activeAlerts: "चालू अलर्ट",
      criticalPopupTitle: "अति आवश्यक चेतावनी: दवाई खतम होखे वाला बा!",
      acknowledgeBtn: "अलर्ट स्वीकार करीं",
      resolveBtn: "काम पूरा भइल",
      playAudioBtn: "आवाज में अलर्ट सुनीं",
      dispatchNotificationBtn: "बगल के अस्पतालन में खबर भेजीं",
      dispatchedSuccess: "एसएमएस, व्हाट्सएप आ फोन से खबर भेज दिहल गइल बा!",
      recipientFacilities: "खबर पावे वाला बगल के अस्पताल",
      channelStatus: "खबर भेजे के जरिया",
    },
    resourceUpdate: {
      title: "स्वास्थ्य कर्मी दैनिक हाजिरी आ स्टॉक प्रविष्टि",
      subtitle: "रोज के दवाई, बेड आ डाक्टर लोग के हाजिरी दर्ज करीं",
      privacyNotice: "गोपनीयता गारंटी: खाली कुल संख्या दर्ज कइल जाला। मरीज के नाम, आधार नंबर भा मोबाइल नंबर कतहू नइखे लिखल जात।",
      facilitySelect: "अपन पीएचसी चुनीं",
      medicineStock: "दवाई के स्टॉक",
      bedOccupancy: "बेड भरल बा कि खाली",
      doctorAttendance: "डाक्टर लोग के हाजिरी",
      nurseAttendance: "नर्स लोग के हाजिरी",
      dailyFootfall: "आज आइल मरीज",
      equipment: "ऑक्सीजन आ किट",
      submitUpdate: "जानकारी सुरक्षित करीं",
      csvImportTitle: "सीएसवी (CSV) से एक बेर में अपलोड करीं",
      downloadSample: "सैंपल टेम्पलेट डाउनलोड करीं",
      uploadCsv: "फाइल अपलोड करीं",
      auditLogTitle: "पुराना बदलाव के सूची",
      updateSuccess: "सब जानकारी सुरक्षित हो गइल!",
    },
    federated: {
      title: "फेडरेटेड लर्निंग आ डेटा सुरक्षा",
      subtitle: "मरीज के जानकारी बाहर ना जाई, खाली सीखल बात केंद्रीय सर्वर में जाई",
      howItWorks: "फेडरेटेड लर्निंग कइसे काम करेला",
      localTrainingTitle: "1. अपना जिला में पढ़ाई",
      localTrainingDesc: "सभ पीएचसी के डेटा ओहिजे के सर्वर पर रहेला। बाहर एकहू मरीज के रिकॉर्ड ना जाला।",
      secureAggregationTitle: "2. सुरक्षित गणितीय मेल",
      secureAggregationDesc: "केंद्रीय सर्वर खाली मॉडल के गणितीय वजन मिलावेला, डेटा चोरी असम्भव बा।",
      globalModelTitle: "3. देश भर में होशियारी",
      globalModelDesc: "तैयार भइल होशियार मॉडल वापस सब गाँव के पीएचसी में भेजल जाला।",
      stateNodes: "राज्य नोड्स के स्थिति",
      globalModelVersion: "वैश्विक मॉडल के वर्जन",
      prototypeDisclaimer: "सूचना: ई एगो सिमुलेशन प्रोटोटाइप ह। वास्तविक उपयोग खातिर सरकार के कानूनी मंजूरी जरूरी बा।",
    },
    voice: {
      listening: "आवाज से खोजीं",
      listeningDesc: "दवाई भा अस्पताल के नाम बोलीं...",
      unmute: "आवाज अलर्ट चालू करीं",
      mute: "आवाज बंद करीं",
    },
  },
};

let currentLanguage: SupportedLanguage = "en";
const listeners: Array<(lang: SupportedLanguage) => void> = [];

export function getLanguage(): SupportedLanguage {
  return currentLanguage;
}

export function setLanguage(lang: SupportedLanguage) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  listeners.forEach(fn => fn(lang));
}

export function onLanguageChange(fn: (lang: SupportedLanguage) => void) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function t(): TranslationDictionary {
  return translations[currentLanguage];
}
