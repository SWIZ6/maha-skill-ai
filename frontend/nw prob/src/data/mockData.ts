export interface DistrictMetric {
  id: string;
  district: string;
  region: string;
  demand: number;
  supply: number;
  gap: number;
  topSectors: string[];
  topTradeNeeded: string;
  seatCapacity: number;
  recommendedSeats: number;
  placementRate: number;
  budgetAllocatedCr: number;
}

export interface MacroStats {
  activeJobPostings: number;
  jobGrowthYoY: string;
  topEmergingSectors: { name: string; growth: string; openings: number; icon: string }[];
  statewidePlacementRate: number;
  placementTarget: number;
  obsolescentCoursesCount: number;
  totalITIs: number;
  totalTrainees: number;
  activeApprenticeships: number;
}

export interface SyllabusDiffItem {
  id: string;
  tradeCode: string;
  tradeName: string;
  department: string;
  duration: string;
  currentMatchRate: number;
  projectedMatchRate: number;
  outdatedModules: {
    code: string;
    title: string;
    hours: number;
    reason: string;
    deprecationTag: "Deprecated" | "Severe Obsolescence" | "Zero Demand";
  }[];
  patchModules: {
    code: string;
    title: string;
    hours: number;
    industryDemandPercent: number;
    leadEmployers: string[];
    tag: "High Demand" | "Critical Skill" | "Emerging Tech";
  }[];
  infrastructureRequired: {
    item: string;
    estimatedCost: string;
    urgency: "Immediate" | "Within 60 Days" | "Next Fiscal";
    status: "Budget Pending" | "Approved" | "Procurement Open";
  }[];
  trainerUpskilling: {
    module: string;
    partner: string;
    duration: string;
    certifiedTrainersNeeded: number;
    status: "Nominations Open" | "In Progress" | "Completed";
  }[];
  actionableAlert: string;
}

export interface PulseSurveySubmission {
  id: string;
  companyName: string;
  sector: string;
  district: string;
  role: string;
  skills: string[];
  openings: number;
  proficiencyRequired: "Beginner" | "Intermediate" | "Advanced";
  timeline: string;
  submittedAt: string;
  verified: boolean;
}

export interface CurriculumValidationCard {
  id: string;
  trade: string;
  proposedTitle: string;
  submittedBy: string;
  rationale: string;
  keyCompetencies: string[];
  employerEndorsements: number;
  employerObjections: number;
  targetBatchSize: number;
  industryPartners: string[];
}

export interface CandidateRolePath {
  id: string;
  roleTitle: string;
  sector: string;
  avgSalary: string;
  stateDemandIndex: number; // 0 - 100
  primaryDistrict?: string;
  availableDistricts?: string[];
  requiredSkills: { name: string; requiredLevel: number; candidateLevel: number }[];
  radarData: { subject: string; MarketStandard: number; YourScore: number; fullMark: number }[];
  matchedCourses: {
    id: string;
    title: string;
    institute: string;
    district: string;
    duration: string;
    mode: string;
    stipendMonthly: number;
    placementRate: number;
    topHiringCompanies: string[];
    nsfqLevel: number;
    providerType?: "Government ITI" | "Private Industry Academy" | "Online Bootcamp";
    feeStructure?: string;
  }[];
}

export const MACRO_STATS: MacroStats = {
  activeJobPostings: 184520,
  jobGrowthYoY: "+22.4%",
  topEmergingSectors: [
    { name: "EV & Green Mobility", growth: "+48%", openings: 38400, icon: "Zap" },
    { name: "Cloud, DevOps & AI Ops", growth: "+36%", openings: 46200, icon: "Cpu" },
    { name: "Precision Industrial Robotics", growth: "+29%", openings: 29800, icon: "Cog" },
    { name: "Renewable Energy & Solar PV", growth: "+33%", openings: 21500, icon: "Sun" },
  ],
  statewidePlacementRate: 71.8,
  placementTarget: 85.0,
  obsolescentCoursesCount: 24,
  totalITIs: 959,
  totalTrainees: 198400,
  activeApprenticeships: 64200,
};

export const DISTRICT_METRICS: DistrictMetric[] = [
  {
    id: "pune",
    district: "Pune",
    region: "Western Maharashtra",
    demand: 48600,
    supply: 31200,
    gap: 17400,
    topSectors: ["EV Tech", "IT & Cloud", "Auto Ancillaries"],
    topTradeNeeded: "EV Powertrain & Battery Diagnostics",
    seatCapacity: 18500,
    recommendedSeats: 26000,
    placementRate: 84.5,
    budgetAllocatedCr: 42.8,
  },
  {
    id: "mumbai",
    district: "Mumbai & Thane",
    region: "Konkan",
    demand: 54200,
    supply: 41800,
    gap: 12400,
    topSectors: ["Cloud/Fullstack", "Fintech Ops", "Logistics Tech"],
    topTradeNeeded: "Fullstack Web & Cloud Microservices",
    seatCapacity: 24000,
    recommendedSeats: 32000,
    placementRate: 81.2,
    budgetAllocatedCr: 55.4,
  },
  {
    id: "nagpur",
    district: "Nagpur",
    region: "Vidarbha",
    demand: 22400,
    supply: 14600,
    gap: 7800,
    topSectors: ["Warehouse Automation", "Drone Assembly", "Solar PV"],
    topTradeNeeded: "Automated Supply Chain & Robotics",
    seatCapacity: 9800,
    recommendedSeats: 14500,
    placementRate: 69.4,
    budgetAllocatedCr: 28.2,
  },
  {
    id: "nashik",
    district: "Nashik",
    region: "North Maharashtra",
    demand: 18900,
    supply: 15200,
    gap: 3700,
    topSectors: ["Precision CNC", "Agri-Tech Equipment", "Electricals"],
    topTradeNeeded: "5-Axis CNC & Smart Tooling",
    seatCapacity: 11200,
    recommendedSeats: 13800,
    placementRate: 74.1,
    budgetAllocatedCr: 21.0,
  },
  {
    id: "aurangabad",
    district: "Chhatrapati Sambhajinagar",
    region: "Marathwada",
    demand: 19500,
    supply: 12800,
    gap: 6700,
    topSectors: ["EV Components", "Pharma Automation", "Heavy Engineering"],
    topTradeNeeded: "Industrial IoT & PLC Automation",
    seatCapacity: 8900,
    recommendedSeats: 13200,
    placementRate: 68.7,
    budgetAllocatedCr: 23.5,
  },
  {
    id: "kolhapur",
    district: "Kolhapur & Sangli",
    region: "Western Maharashtra",
    demand: 14200,
    supply: 11500,
    gap: 2700,
    topSectors: ["Foundry Automation", "Textile Mechatronics", "Sugar Tech"],
    topTradeNeeded: "Foundry Robotic Moulding & CNC",
    seatCapacity: 8400,
    recommendedSeats: 10200,
    placementRate: 70.3,
    budgetAllocatedCr: 16.8,
  },
];

export const SYLLABUS_DIFF_DATA: SyllabusDiffItem[] = [
  {
    id: "diff-copa",
    tradeCode: "ITI-COPA-01",
    tradeName: "Computer Operator and Programming Assistant (COPA)",
    department: "Information Technology & Digital Services",
    duration: "1 Year (2 Semesters)",
    currentMatchRate: 41,
    projectedMatchRate: 94,
    actionableAlert:
      "Alert: Your Web Development module lacks Node.js and API integration. 78% of local Pune & Thane employers require RESTful APIs and modern JavaScript in recent job postings.",
    outdatedModules: [
      {
        code: "MOD-101",
        title: "Legacy Visual Basic 6.0 & Desktop Forms",
        hours: 60,
        reason: "Zero active enterprise postings in Maharashtra since 2023.",
        deprecationTag: "Severe Obsolescence",
      },
      {
        code: "MOD-104",
        title: "FoxPro / dBase Database Administration",
        hours: 45,
        reason: "Superseded completely by PostgreSQL and MongoDB.",
        deprecationTag: "Deprecated",
      },
      {
        code: "MOD-108",
        title: "HTML 4.01 Table Layouts & Adobe Flash",
        hours: 50,
        reason: "Flash discontinued; modern web is component & flex/grid based.",
        deprecationTag: "Zero Demand",
      },
      {
        code: "MOD-112",
        title: "Manual FTP & Dial-Up Server Configuration",
        hours: 25,
        reason: "Industry replaced by Git, CI/CD, and Cloud object storage.",
        deprecationTag: "Deprecated",
      },
    ],
    patchModules: [
      {
        code: "PATCH-201",
        title: "Modern JavaScript (ES6+), React & Next.js Foundations",
        hours: 60,
        industryDemandPercent: 88,
        leadEmployers: ["Infosys Pune", "TCS Mumbai", "Persistent", "QuickHeal"],
        tag: "High Demand",
      },
      {
        code: "PATCH-202",
        title: "RESTful API Integration with Node.js & Express",
        hours: 50,
        industryDemandPercent: 82,
        leadEmployers: ["LTI Mindtree", "Tech Mahindra", "Bajaj Finserv Health"],
        tag: "Critical Skill",
      },
      {
        code: "PATCH-203",
        title: "Cloud Deployment (AWS/Azure) & Git Version Control",
        hours: 40,
        industryDemandPercent: 91,
        leadEmployers: ["Cognizant Pune", "Wipro Hinjewadi", "Jio Platforms"],
        tag: "High Demand",
      },
      {
        code: "PATCH-204",
        title: "AI-Assisted Coding & Prompt Engineering for Productivity",
        hours: 30,
        industryDemandPercent: 76,
        leadEmployers: ["Accenture", "Zensar Technologies", "Maharashtra NIC"],
        tag: "Emerging Tech",
      },
    ],
    infrastructureRequired: [
      {
        item: "High-Speed Dual Band Cloud Lab (30 Terminals + Node.js runtime)",
        estimatedCost: "₹4.8 Lakhs",
        urgency: "Immediate",
        status: "Approved",
      },
      {
        item: "Annual Cloud Sandbox Accounts (AWS Educate / Azure for Students)",
        estimatedCost: "₹1.2 Lakhs",
        urgency: "Within 60 Days",
        status: "Procurement Open",
      },
      {
        item: "Interactive Smart Digital Podium for Live Code Reviews",
        estimatedCost: "₹2.5 Lakhs",
        urgency: "Next Fiscal",
        status: "Budget Pending",
      },
    ],
    trainerUpskilling: [
      {
        module: "Full-Stack Node.js Master Trainer Certification",
        partner: "Maharashtra State Innovation Society (MSInS) & IIT Bombay",
        duration: "3 Weeks Intensive",
        certifiedTrainersNeeded: 12,
        status: "Nominations Open",
      },
      {
        module: "Cloud Architecture for Vocational Educators",
        partner: "AWS Academy India",
        duration: "2 Weeks Hybrid",
        certifiedTrainersNeeded: 8,
        status: "In Progress",
      },
    ],
  },
  {
    id: "diff-auto",
    tradeCode: "ITI-AUTO-03",
    tradeName: "Mechanic Motor Vehicle / Automobile Technician",
    department: "Automotive & Mechanical Systems",
    duration: "2 Years (4 Semesters)",
    currentMatchRate: 48,
    projectedMatchRate: 96,
    actionableAlert:
      "Alert: Chakan & Talegaon auto belts have 3,800+ vacancies for EV Battery Management technicians. Current curriculum spends 120 hours on carburetor mechanics.",
    outdatedModules: [
      {
        code: "MOD-302",
        title: "Carburetor Overhaul & Mechanical Jet Timing",
        hours: 75,
        reason: "Replaced entirely by Electronic Fuel Injection (EFI) and EV powertrains.",
        deprecationTag: "Zero Demand",
      },
      {
        code: "MOD-305",
        title: "Conventional Dynamo & Mechanical Relay Rewinding",
        hours: 45,
        reason: "Modern alternators and solid-state power electronics made this obsolete.",
        deprecationTag: "Deprecated",
      },
      {
        code: "MOD-309",
        title: "BS-II/BS-III Mechanical Exhaust Analysis",
        hours: 40,
        reason: "National standard is BS-VI Phase 2 with OBD-II real-time sensors.",
        deprecationTag: "Severe Obsolescence",
      },
    ],
    patchModules: [
      {
        code: "PATCH-401",
        title: "Electric Vehicle (EV) Powertrain & High-Voltage Architecture",
        hours: 65,
        industryDemandPercent: 94,
        leadEmployers: ["Tata Motors EV Pune", "Mahindra Last Mile", "Bajaj Chetak", "Ola Electric"],
        tag: "High Demand",
      },
      {
        code: "PATCH-402",
        title: "Lithium-Ion Battery Management Systems (BMS) Diagnostics",
        hours: 50,
        industryDemandPercent: 89,
        leadEmployers: ["Exide Energy", "KPIT Technologies", "Endurance Tech"],
        tag: "Critical Skill",
      },
      {
        code: "PATCH-403",
        title: "CAN-Bus & OBD-II Automotive Telematics Scanning",
        hours: 45,
        industryDemandPercent: 86,
        leadEmployers: ["Bosch India Nashik", "Bharat Forge", "Force Motors"],
        tag: "High Demand",
      },
    ],
    infrastructureRequired: [
      {
        item: "EV Motor & BMS Cut-Section Simulator Rig with Safety Disconnect",
        estimatedCost: "₹9.5 Lakhs",
        urgency: "Immediate",
        status: "Approved",
      },
      {
        item: "1000V Insulated Toolkits & CAT-IV Digital Multimeters (15 Sets)",
        estimatedCost: "₹2.2 Lakhs",
        urgency: "Immediate",
        status: "Approved",
      },
    ],
    trainerUpskilling: [
      {
        module: "EV High Voltage Safety & BMS Troubleshooting Certification",
        partner: "Automotive Research Association of India (ARAI) Pune",
        duration: "4 Weeks Immersion",
        certifiedTrainersNeeded: 16,
        status: "In Progress",
      },
    ],
  },
  {
    id: "diff-machinist",
    tradeCode: "ITI-MECH-07",
    tradeName: "Machinist & Precision CNC Operator",
    department: "Advanced Manufacturing",
    duration: "2 Years",
    currentMatchRate: 52,
    projectedMatchRate: 91,
    actionableAlert:
      "Alert: Aurangabad & Nashik precision engineering firms report 42% shortage of 5-Axis CNC programmers. Manual shaper training should be reduced.",
    outdatedModules: [
      {
        code: "MOD-202",
        title: "Mechanical Shaper & Planer Machine Operations",
        hours: 60,
        reason: "Replaced by high-speed CNC milling machines.",
        deprecationTag: "Severe Obsolescence",
      },
      {
        code: "MOD-205",
        title: "Manual Vernier Paper Blueprint Drafting",
        hours: 40,
        reason: "Industry migrated completely to 3D CAD/CAM software.",
        deprecationTag: "Deprecated",
      },
    ],
    patchModules: [
      {
        code: "PATCH-501",
        title: "5-Axis CNC Multi-Tasking & Siemens Sinumerik Programming",
        hours: 70,
        industryDemandPercent: 92,
        leadEmployers: ["Bharat Forge", "L&T Heavy Eng", "Godrej Aerospace", "Kirloskar Oil Engines"],
        tag: "Critical Skill",
      },
      {
        code: "PATCH-502",
        title: "CAD/CAM Integration (Mastercam / Fusion 360) & Toolpath Sim",
        hours: 50,
        industryDemandPercent: 87,
        leadEmployers: ["Tata AutoComp", "ThyssenKrupp Pune", "Garware Bestretch"],
        tag: "High Demand",
      },
    ],
    infrastructureRequired: [
      {
        item: "CNC Milling Simulator Console with Fanuc/Siemens Controls (10 Units)",
        estimatedCost: "₹7.8 Lakhs",
        urgency: "Within 60 Days",
        status: "Procurement Open",
      },
    ],
    trainerUpskilling: [
      {
        module: "Siemens Certified Master CNC Machinist Trainer",
        partner: "Indo-German Tool Room (IGTR) Aurangabad",
        duration: "3 Weeks",
        certifiedTrainersNeeded: 10,
        status: "Nominations Open",
      },
    ],
  },
];

export const VALIDATION_CARDS: CurriculumValidationCard[] = [
  {
    id: "val-1",
    trade: "Automobile Technician (Trade Code: ITI-AUTO-03)",
    proposedTitle: "Module: EV Powertrain & High-Voltage Battery Safety (48 Hours)",
    submittedBy: "MahaSkill AI Curriculum Steering Committee",
    rationale:
      "Aligns vocational trainees with Maharashtra EV Policy 2025. Adds mandatory hands-on diagnostics for 400V battery systems, pre-charge resistors, and CAN-bus telemetry.",
    keyCompetencies: [
      "NFPA 70E & ISO 6469 Electrical Safety Compliance",
      "Cell Balancing & Thermal Runaway Mitigation Protocols",
      "Regenerative Braking Power Inverter Troubleshooting",
    ],
    employerEndorsements: 142,
    employerObjections: 6,
    targetBatchSize: 4200,
    industryPartners: ["Tata Motors EV", "Mahindra Electric", "Bajaj Auto", "KPIT Technologies"],
  },
  {
    id: "val-2",
    trade: "Information Technology (Trade Code: ITI-COPA-01)",
    proposedTitle: "Module: Full-Stack JavaScript & Cloud Deployment (60 Hours)",
    submittedBy: "Directorate of Vocational Education & Training (DVET)",
    rationale:
      "Replaces obsolete Visual Basic 6.0 and desktop Access forms with modern React, Express.js REST APIs, and Docker/Cloud deployment practices.",
    keyCompetencies: [
      "Responsive React Component Architecture",
      "Secure REST APIs with JWT & PostgreSQL",
      "Git Branching & GitHub CI/CD Pipeline Automation",
    ],
    employerEndorsements: 218,
    employerObjections: 11,
    targetBatchSize: 6800,
    industryPartners: ["Infosys Pune", "Persistent Systems", "TCS", "Jio Platforms"],
  },
  {
    id: "val-3",
    trade: "Electrical & Electronics (Trade Code: ITI-ELEC-05)",
    proposedTitle: "Module: Rooftop Solar Grid-Tie Inverter & Net Metering (40 Hours)",
    submittedBy: "MahaUrja & Maharashtra Energy Development Agency",
    rationale:
      "Addresses massive rooftop solar adoption in Nagpur, Nashik, and Solapur under PM Surya Ghar Muft Bijli Yojana with certified grid-tied technician training.",
    keyCompetencies: [
      "Solar PV String Sizing & MPPT Inverter Synchronization",
      "Net Metering Bi-Directional Disconnect & Earthing",
      "MNRE & MSEDCL Grid Safety Standards",
    ],
    employerEndorsements: 98,
    employerObjections: 4,
    targetBatchSize: 3100,
    industryPartners: ["Tata Power Solar", "Adani Solar", "Waaree Energies", "MSEDCL"],
  },
];

export const PULSE_SURVEY_HISTORY: PulseSurveySubmission[] = [
  {
    id: "sub-101",
    companyName: "Tata Motors Passenger EV Ltd",
    sector: "Automotive & EV",
    district: "Pune",
    role: "Battery Assembly & Testing Technician",
    skills: ["BMS Testing", "CAN-bus Scanning", "High Voltage Safety", "Thermal Inspection"],
    openings: 180,
    proficiencyRequired: "Intermediate",
    timeline: "Next 30 Days",
    submittedAt: "2 hours ago",
    verified: true,
  },
  {
    id: "sub-102",
    companyName: "Persistent Systems",
    sector: "IT & Software Services",
    district: "Pune",
    role: "Junior Web Application Support Engineer",
    skills: ["Node.js", "React Basics", "PostgreSQL", "Git"],
    openings: 95,
    proficiencyRequired: "Beginner",
    timeline: "Q3 2026",
    submittedAt: "5 hours ago",
    verified: true,
  },
  {
    id: "sub-103",
    companyName: "Bharat Forge Ltd",
    sector: "Heavy Engineering & Defense",
    district: "Chhatrapati Sambhajinagar",
    role: "5-Axis CNC Precision Setter",
    skills: ["Fanuc G-Code", "Tool Offset Calibration", "CMM Inspection"],
    openings: 45,
    proficiencyRequired: "Advanced",
    timeline: "Next 60 Days",
    submittedAt: "1 day ago",
    verified: true,
  },
  {
    id: "sub-104",
    companyName: "Amazon Logistics Fulfillment",
    sector: "Logistics & Warehousing",
    district: "Nagpur (MIHAN)",
    role: "Automated Sorting & Conveyor Technician",
    skills: ["PLC Troubleshooting", "Sensor Calibration", "Hydraulics"],
    openings: 120,
    proficiencyRequired: "Intermediate",
    timeline: "Immediate",
    submittedAt: "2 days ago",
    verified: true,
  },
];

export const CANDIDATE_CAREER_PATHS: CandidateRolePath[] = [
  {
    id: "path-ev",
    roleTitle: "EV Battery & Powertrain Specialist",
    sector: "Automotive & Electric Mobility",
    avgSalary: "₹24,000 - ₹38,000 / month",
    stateDemandIndex: 92,
    primaryDistrict: "Pune",
    availableDistricts: ["Pune", "Nashik", "Chhatrapati Sambhajinagar"],
    requiredSkills: [
      { name: "High-Voltage Safety (ISO 6469)", requiredLevel: 90, candidateLevel: 30 },
      { name: "BMS Diagnostic Scanning", requiredLevel: 85, candidateLevel: 45 },
      { name: "CAN-Bus Telemetry", requiredLevel: 80, candidateLevel: 25 },
      { name: "Regenerative Braking Systems", requiredLevel: 75, candidateLevel: 60 },
      { name: "Thermal Management & Cooling", requiredLevel: 80, candidateLevel: 40 },
    ],
    radarData: [
      { subject: "HV Safety", MarketStandard: 90, YourScore: 35, fullMark: 100 },
      { subject: "BMS Diagnostics", MarketStandard: 85, YourScore: 45, fullMark: 100 },
      { subject: "CAN-Bus", MarketStandard: 80, YourScore: 25, fullMark: 100 },
      { subject: "Powertrain", MarketStandard: 75, YourScore: 65, fullMark: 100 },
      { subject: "Thermal Mgmt", MarketStandard: 80, YourScore: 40, fullMark: 100 },
      { subject: "Troubleshooting", MarketStandard: 85, YourScore: 50, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-ev-01",
        title: "Advanced Electric Vehicle Powertrain & BMS Certification",
        institute: "Government ITI Aundh (Centre of Excellence)",
        district: "Pune",
        duration: "3 Months (Hybrid / Hands-on Lab)",
        mode: "Full Time + Tata Motors Apprenticeship",
        stipendMonthly: 4500,
        placementRate: 94.2,
        topHiringCompanies: ["Tata Motors EV", "Bajaj Chetak", "KPIT Technologies"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
      {
        id: "crs-ev-pvt-01",
        title: "Professional Certificate in Hybrid & EV Diagnostics",
        institute: "Tata STRIVE Skill Development Centre",
        district: "Pune (Chakan)",
        duration: "10 Weeks (Intensive Industry Cohort)",
        mode: "Workshop + Tata Motors Factory Internship",
        stipendMonthly: 3500,
        placementRate: 95.8,
        topHiringCompanies: ["Tata Motors EV", "KPIT", "Ather Energy", "Force Motors"],
        nsfqLevel: 5,
        providerType: "Private Industry Academy",
        feeStructure: "Free (100% Tata CSR Scholarship)",
      },
      {
        id: "crs-ev-online-01",
        title: "Electric Vehicle Powertrain & High-Voltage Architecture",
        institute: "Coursera & Automotive Skills Development Council (ASDC)",
        district: "Online / Self-Paced",
        duration: "6 Weeks (8 hrs/week)",
        mode: "Interactive Virtual Lab + Capstone Project",
        stipendMonthly: 0,
        placementRate: 89.2,
        topHiringCompanies: ["KPIT", "Mahindra Electric", "Ola Electric"],
        nsfqLevel: 4,
        providerType: "Online Bootcamp",
        feeStructure: "Free Audit (Certificate: ₹2,499)",
      },
    ],
  },
  {
    id: "path-cloud",
    roleTitle: "Fullstack Web & Cloud Associate",
    sector: "Information Technology & Digital Services",
    avgSalary: "₹28,000 - ₹45,000 / month",
    stateDemandIndex: 96,
    primaryDistrict: "Mumbai",
    availableDistricts: ["Mumbai", "Pune", "Nagpur"],
    requiredSkills: [
      { name: "React & Next.js Basics", requiredLevel: 85, candidateLevel: 60 },
      { name: "Node.js & Express REST APIs", requiredLevel: 85, candidateLevel: 35 },
      { name: "PostgreSQL & Cloud Databases", requiredLevel: 75, candidateLevel: 50 },
      { name: "Git, GitHub & CI/CD", requiredLevel: 80, candidateLevel: 70 },
      { name: "Cloud Hosting (AWS/Vercel)", requiredLevel: 70, candidateLevel: 30 },
    ],
    radarData: [
      { subject: "React/Next.js", MarketStandard: 85, YourScore: 60, fullMark: 100 },
      { subject: "Node.js APIs", MarketStandard: 85, YourScore: 35, fullMark: 100 },
      { subject: "SQL/Database", MarketStandard: 75, YourScore: 50, fullMark: 100 },
      { subject: "Git & CI/CD", MarketStandard: 80, YourScore: 70, fullMark: 100 },
      { subject: "Cloud Hosting", MarketStandard: 70, YourScore: 30, fullMark: 100 },
      { subject: "Prompting AI", MarketStandard: 65, YourScore: 55, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-cs-01",
        title: "Modern Web Application Engineering & Cloud DevOps",
        institute: "Government ITI Mulund (Skill Development Lab)",
        district: "Mumbai",
        duration: "4 Months (Industry Co-op)",
        mode: "Full Time Classroom + Live Projects",
        stipendMonthly: 5000,
        placementRate: 91.8,
        topHiringCompanies: ["Persistent Systems", "Infosys", "Tech Mahindra", "Cognizant"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
      {
        id: "crs-cs-pvt-01",
        title: "Enterprise Fullstack Cloud & Microservices Accelerator",
        institute: "Persistent Systems Industry Academy (CDAC ACTS Hub)",
        district: "Pune (Hinjewadi)",
        duration: "12 Weeks (Full-time Cohort)",
        mode: "Live Production Projects + Code Reviews",
        stipendMonthly: 4000,
        placementRate: 96.5,
        topHiringCompanies: ["Persistent Systems", "LTIMindtree", "Cognizant", "Zensar"],
        nsfqLevel: 6,
        providerType: "Private Industry Academy",
        feeStructure: "Sponsored (Merit-based Cohort)",
      },
      {
        id: "crs-cs-online-01",
        title: "AWS Certified Cloud Developer & Next.js Bootcamp",
        institute: "AWS Academy & Coursera Cloud Specialization",
        district: "Online / Self-Paced",
        duration: "8 Weeks",
        mode: "Hands-on Cloud Sandbox + AWS Voucher",
        stipendMonthly: 0,
        placementRate: 93.0,
        topHiringCompanies: ["AWS Partner Network", "Accenture", "Wipro Digital"],
        nsfqLevel: 5,
        providerType: "Online Bootcamp",
        feeStructure: "Free Access (AWS Certification Voucher included)",
      },
    ],
  },
  {
    id: "path-cnc",
    roleTitle: "Precision 5-Axis CNC & CAM Specialist",
    sector: "Aerospace & Precision Manufacturing",
    avgSalary: "₹26,000 - ₹42,000 / month",
    stateDemandIndex: 88,
    primaryDistrict: "Pune",
    availableDistricts: ["Pune", "Chhatrapati Sambhajinagar", "Nashik"],
    requiredSkills: [
      { name: "5-Axis CNC Milling", requiredLevel: 90, candidateLevel: 50 },
      { name: "CAD/CAM (Fusion 360/Mastercam)", requiredLevel: 80, candidateLevel: 35 },
      { name: "Siemens Sinumerik / Fanuc G-Code", requiredLevel: 85, candidateLevel: 65 },
      { name: "CMM Metrology & GD&T", requiredLevel: 75, candidateLevel: 40 },
      { name: "Tooling & Fixture Setup", requiredLevel: 85, candidateLevel: 60 },
    ],
    radarData: [
      { subject: "5-Axis CNC", MarketStandard: 90, YourScore: 50, fullMark: 100 },
      { subject: "CAD/CAM", MarketStandard: 80, YourScore: 35, fullMark: 100 },
      { subject: "G-Code Logic", MarketStandard: 85, YourScore: 65, fullMark: 100 },
      { subject: "Metrology/CMM", MarketStandard: 75, YourScore: 40, fullMark: 100 },
      { subject: "Fixtures", MarketStandard: 85, YourScore: 60, fullMark: 100 },
      { subject: "Safety (PPE)", MarketStandard: 80, YourScore: 80, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-cnc-01",
        title: "Specialized 5-Axis Multi-Tasking & Tool Die Crafting",
        institute: "Indo-German Tool Room (IGTR)",
        district: "Chhatrapati Sambhajinagar",
        duration: "6 Months",
        mode: "Intensive Industrial Workshop",
        stipendMonthly: 6000,
        placementRate: 96.5,
        topHiringCompanies: ["Bharat Forge", "Godrej Aerospace", "L&T Defense"],
        nsfqLevel: 6,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
      {
        id: "crs-cnc-pvt-01",
        title: "Advanced CNC Programming & High-Precision Machining Diploma",
        institute: "Siemens Digital Industry Academy & Training Centre",
        district: "Pune (Chakan)",
        duration: "3 Months",
        mode: "Siemens Sinumerik Controller Lab",
        stipendMonthly: 4000,
        placementRate: 97.4,
        topHiringCompanies: ["Siemens", "Bharat Forge", "Force Motors", "Sandvik Coromant"],
        nsfqLevel: 5,
        providerType: "Private Industry Academy",
        feeStructure: "Industry Sponsored (50% CSR Grant)",
      },
      {
        id: "crs-cnc-online-01",
        title: "Mastercam 2026 Multiaxis CAM Programming Masterclass",
        institute: "Autodesk & SolidWorks Global Certification",
        district: "Online / Self-Paced",
        duration: "6 Weeks",
        mode: "CAD/CAM Simulator & CNC Toolpath Verification",
        stipendMonthly: 0,
        placementRate: 88.0,
        topHiringCompanies: ["Eaton India", "Kalyani Technoforge", "Bosch"],
        nsfqLevel: 4,
        providerType: "Online Bootcamp",
        feeStructure: "₹1,999 (Includes 6-mo CAD License)",
      },
    ],
  },
  {
    id: "path-solar",
    roleTitle: "Solar PV & Grid Integration Technician",
    sector: "Renewable Energy & Green Power",
    avgSalary: "₹22,000 - ₹35,000 / month",
    stateDemandIndex: 91,
    primaryDistrict: "Nagpur",
    availableDistricts: ["Nagpur", "Nashik", "Chhatrapati Sambhajinagar", "Kolhapur"],
    requiredSkills: [
      { name: "Solar PV Rooftop Sizing & Array Design", requiredLevel: 85, candidateLevel: 40 },
      { name: "Net Metering & Grid Safety Protocols", requiredLevel: 80, candidateLevel: 30 },
      { name: "Inverter Diagnostics & Transformer Maint.", requiredLevel: 85, candidateLevel: 50 },
      { name: "Earthing & High-Voltage Flash Protection", requiredLevel: 90, candidateLevel: 45 },
      { name: "Remote SCADA Telemetry & Monitoring", requiredLevel: 75, candidateLevel: 25 },
    ],
    radarData: [
      { subject: "PV Sizing", MarketStandard: 85, YourScore: 40, fullMark: 100 },
      { subject: "Grid Safety", MarketStandard: 80, YourScore: 30, fullMark: 100 },
      { subject: "Inverters", MarketStandard: 85, YourScore: 50, fullMark: 100 },
      { subject: "Earthing/HV", MarketStandard: 90, YourScore: 45, fullMark: 100 },
      { subject: "SCADA", MarketStandard: 75, YourScore: 25, fullMark: 100 },
      { subject: "BIS Standards", MarketStandard: 70, YourScore: 60, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-solar-01",
        title: "Solar PV Rooftop Grid Specialist (Suryamitra Certification)",
        institute: "Government ITI Nagpur (Renewable Energy Hub)",
        district: "Nagpur",
        duration: "3 Months (Hands-on Solar Park)",
        mode: "Full Time Practical Workshop",
        stipendMonthly: 3500,
        placementRate: 92.4,
        topHiringCompanies: ["Tata Power Solar", "Adani Green", "Waaree Energies", "MSEDCL"],
        nsfqLevel: 4,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
      {
        id: "crs-solar-02",
        title: "Industrial Solar Inverter & Grid Substation Maintenance",
        institute: "MahaKaushalya Green Skill Centre",
        district: "Nashik",
        duration: "2 Months",
        mode: "Hybrid + Field Work",
        stipendMonthly: 4000,
        placementRate: 89.0,
        topHiringCompanies: ["Sterling and Wilson", "Suzlon", "Vikram Solar"],
        nsfqLevel: 5,
        providerType: "Private Industry Academy",
        feeStructure: "Industry Sponsored (50% CSR Grant)",
      },
    ],
  },
  {
    id: "path-robotics",
    roleTitle: "Industrial Robotics & PLC Automation Engineer",
    sector: "Smart Manufacturing & Industry 4.0",
    avgSalary: "₹28,000 - ₹46,000 / month",
    stateDemandIndex: 94,
    primaryDistrict: "Pune",
    availableDistricts: ["Pune", "Chhatrapati Sambhajinagar", "Mumbai"],
    requiredSkills: [
      { name: "PLC Programming (Siemens / Allen-Bradley)", requiredLevel: 90, candidateLevel: 45 },
      { name: "SCADA & Industrial HMI Design", requiredLevel: 85, candidateLevel: 35 },
      { name: "6-Axis Articulated Robot Arm Calibration", requiredLevel: 80, candidateLevel: 30 },
      { name: "Sensor & Industrial IoT Interfacing", requiredLevel: 85, candidateLevel: 55 },
      { name: "Industrial Pneumatics & Safety Interlocks", requiredLevel: 80, candidateLevel: 50 },
    ],
    radarData: [
      { subject: "PLC Logic", MarketStandard: 90, YourScore: 45, fullMark: 100 },
      { subject: "SCADA/HMI", MarketStandard: 85, YourScore: 35, fullMark: 100 },
      { subject: "Robot Arms", MarketStandard: 80, YourScore: 30, fullMark: 100 },
      { subject: "Sensors/IoT", MarketStandard: 85, YourScore: 55, fullMark: 100 },
      { subject: "Pneumatics", MarketStandard: 80, YourScore: 50, fullMark: 100 },
      { subject: "Safety Interlocks", MarketStandard: 85, YourScore: 60, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-robo-01",
        title: "Mechatronics & Industrial Robot System Integration",
        institute: "Centre of Excellence in Mechatronics, Govt Polytechnic",
        district: "Pune",
        duration: "4 Months (Industry Co-op)",
        mode: "Full Time Lab + Chakan Plant Placement",
        stipendMonthly: 6500,
        placementRate: 95.8,
        topHiringCompanies: ["FANUC India", "KUKA Robotics", "Thermax", "Force Motors"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
      {
        id: "crs-robo-02",
        title: "Programmable Logic Controllers (PLC) & Factory Automation",
        institute: "Government ITI Chhatrapati Sambhajinagar",
        district: "Chhatrapati Sambhajinagar",
        duration: "3 Months",
        mode: "Hands-on Automation Lab",
        stipendMonthly: 4000,
        placementRate: 90.2,
        topHiringCompanies: ["Siemens Digital Industries", "Rockwell Automation", "Endress+Hauser"],
        nsfqLevel: 5,
        providerType: "Private Industry Academy",
        feeStructure: "Free (Industry CSR Grant)",
      },
    ],
  },
  {
    id: "path-ai",
    roleTitle: "Applied AI & Data Operations Associate",
    sector: "Artificial Intelligence & Analytics",
    avgSalary: "₹30,000 - ₹52,000 / month",
    stateDemandIndex: 97,
    primaryDistrict: "Mumbai",
    availableDistricts: ["Mumbai", "Pune"],
    requiredSkills: [
      { name: "Python for Data Processing (Pandas/NumPy)", requiredLevel: 85, candidateLevel: 55 },
      { name: "SQL Querying & Data Pipeline ETL", requiredLevel: 80, candidateLevel: 50 },
      { name: "Prompt Engineering & Generative AI APIs", requiredLevel: 85, candidateLevel: 65 },
      { name: "Data Annotation, Cleansing & Validation", requiredLevel: 75, candidateLevel: 60 },
      { name: "BI Dashboards (Tableau / Power BI)", requiredLevel: 70, candidateLevel: 40 },
    ],
    radarData: [
      { subject: "Python Data", MarketStandard: 85, YourScore: 55, fullMark: 100 },
      { subject: "SQL Pipelines", MarketStandard: 80, YourScore: 50, fullMark: 100 },
      { subject: "GenAI/Prompts", MarketStandard: 85, YourScore: 65, fullMark: 100 },
      { subject: "Data Quality", MarketStandard: 75, YourScore: 60, fullMark: 100 },
      { subject: "Dashboards", MarketStandard: 70, YourScore: 40, fullMark: 100 },
      { subject: "Git/Cloud", MarketStandard: 75, YourScore: 45, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-ai-01",
        title: "Applied Generative AI & Data Annotation Specialist",
        institute: "Government ITI Andheri (Centre for Digital Future)",
        district: "Mumbai",
        duration: "3 Months",
        mode: "Hybrid Online + Weekend Co-work",
        stipendMonthly: 5500,
        placementRate: 93.5,
        topHiringCompanies: ["Fractal Analytics", "LTIMindtree", "Wipro Digital", "Jio Platforms"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-aurangabad-tooling",
    roleTitle: "High-Precision Tool & Die Maker",
    sector: "Heavy Engineering & Tooling",
    avgSalary: "₹25,000 - ₹40,000 / month",
    stateDemandIndex: 90,
    primaryDistrict: "Chhatrapati Sambhajinagar",
    availableDistricts: ["Chhatrapati Sambhajinagar", "Pune", "Nashik"],
    requiredSkills: [
      { name: "Tool & Die Making", requiredLevel: 90, candidateLevel: 50 },
      { name: "AutoCAD", requiredLevel: 80, candidateLevel: 60 },
      { name: "Mastercam", requiredLevel: 85, candidateLevel: 35 },
      { name: "Metrology & CMM", requiredLevel: 75, candidateLevel: 45 },
      { name: "Bench Working & Fitting", requiredLevel: 85, candidateLevel: 70 },
    ],
    radarData: [
      { subject: "Tool & Die", MarketStandard: 90, YourScore: 50, fullMark: 100 },
      { subject: "Mastercam", MarketStandard: 85, YourScore: 35, fullMark: 100 },
      { subject: "Metrology", MarketStandard: 75, YourScore: 45, fullMark: 100 },
      { subject: "AutoCAD", MarketStandard: 80, YourScore: 60, fullMark: 100 },
      { subject: "Bench Work", MarketStandard: 85, YourScore: 70, fullMark: 100 },
      { subject: "GD&T", MarketStandard: 80, YourScore: 40, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-cs-tool-01",
        title: "Advanced Tool & Die Making with CAD/CAM Simulation",
        institute: "Indo-German Tool Room (IGTR)",
        district: "Chhatrapati Sambhajinagar",
        duration: "6 Months",
        mode: "Full Time Hands-on Workshop",
        stipendMonthly: 5000,
        placementRate: 96.0,
        topHiringCompanies: ["Bharat Forge", "Endress+Hauser", "Varroc Engineering"],
        nsfqLevel: 6,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-aurangabad-casting",
    roleTitle: "Heavy Forging & Precision Casting Specialist",
    sector: "Metallurgy & Heavy Engineering",
    avgSalary: "₹24,000 - ₹38,000 / month",
    stateDemandIndex: 87,
    primaryDistrict: "Chhatrapati Sambhajinagar",
    availableDistricts: ["Chhatrapati Sambhajinagar", "Kolhapur & Sangli", "Pune"],
    requiredSkills: [
      { name: "Hydraulics", requiredLevel: 85, candidateLevel: 55 },
      { name: "Pneumatics", requiredLevel: 80, candidateLevel: 50 },
      { name: "Preventive Maintenance", requiredLevel: 85, candidateLevel: 65 },
      { name: "Quality Inspection", requiredLevel: 80, candidateLevel: 45 },
      { name: "Welding", requiredLevel: 75, candidateLevel: 60 },
    ],
    radarData: [
      { subject: "Hydraulics", MarketStandard: 85, YourScore: 55, fullMark: 100 },
      { subject: "Pneumatics", MarketStandard: 80, YourScore: 50, fullMark: 100 },
      { subject: "Maintenance", MarketStandard: 85, YourScore: 65, fullMark: 100 },
      { subject: "Inspection", MarketStandard: 80, YourScore: 45, fullMark: 100 },
      { subject: "Welding", MarketStandard: 75, YourScore: 60, fullMark: 100 },
      { subject: "Safety", MarketStandard: 85, YourScore: 70, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-cs-cast-01",
        title: "Industrial Forging Press & Hydraulic Systems Certification",
        institute: "Govt ITI Chhatrapati Sambhajinagar (Casting Hub)",
        district: "Chhatrapati Sambhajinagar",
        duration: "3 Months",
        mode: "Full Time Lab + Plant Training",
        stipendMonthly: 4000,
        placementRate: 91.5,
        topHiringCompanies: ["Kalyani Forge", "Radhakrishna Forgings", "Brembo Brakes"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-nashik-aerospace",
    roleTitle: "Aerospace Sheet Metal & CNC Laser Machinist",
    sector: "Aerospace & Defense Manufacturing",
    avgSalary: "₹26,000 - ₹44,000 / month",
    stateDemandIndex: 91,
    primaryDistrict: "Nashik",
    availableDistricts: ["Nashik", "Pune", "Nagpur"],
    requiredSkills: [
      { name: "CNC", requiredLevel: 90, candidateLevel: 60 },
      { name: "G-code", requiredLevel: 85, candidateLevel: 55 },
      { name: "GD&T", requiredLevel: 85, candidateLevel: 40 },
      { name: "AutoCAD", requiredLevel: 80, candidateLevel: 65 },
      { name: "Quality Inspection", requiredLevel: 80, candidateLevel: 50 },
    ],
    radarData: [
      { subject: "CNC", MarketStandard: 90, YourScore: 60, fullMark: 100 },
      { subject: "G-code", MarketStandard: 85, YourScore: 55, fullMark: 100 },
      { subject: "GD&T", MarketStandard: 85, YourScore: 40, fullMark: 100 },
      { subject: "AutoCAD", MarketStandard: 80, YourScore: 65, fullMark: 100 },
      { subject: "Inspection", MarketStandard: 80, YourScore: 50, fullMark: 100 },
      { subject: "Sheet Metal", MarketStandard: 80, YourScore: 45, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-nsk-aero-01",
        title: "Precision Aerospace Structural Sheet Metal & Laser Profiling",
        institute: "HAL Training Academy & Govt ITI Ozar",
        district: "Nashik",
        duration: "4 Months",
        mode: "Full Time + HAL Apprenticeship",
        stipendMonthly: 5500,
        placementRate: 94.0,
        topHiringCompanies: ["Hindustan Aeronautics Limited (HAL)", "Mahindra Aerospace", "Garware"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-nashik-switchgear",
    roleTitle: "High-Voltage Switchgear & Transformer Testing Tech",
    sector: "Power Equipment & Electrical Grid",
    avgSalary: "₹23,000 - ₹36,000 / month",
    stateDemandIndex: 89,
    primaryDistrict: "Nashik",
    availableDistricts: ["Nashik", "Chhatrapati Sambhajinagar", "Pune"],
    requiredSkills: [
      { name: "Transformer", requiredLevel: 85, candidateLevel: 50 },
      { name: "Single & 3-Phase Wiring", requiredLevel: 90, candidateLevel: 70 },
      { name: "Relay Logic", requiredLevel: 80, candidateLevel: 40 },
      { name: "Earthing", requiredLevel: 85, candidateLevel: 60 },
      { name: "High Voltage Safety", requiredLevel: 90, candidateLevel: 45 },
    ],
    radarData: [
      { subject: "Transformer", MarketStandard: 85, YourScore: 50, fullMark: 100 },
      { subject: "Wiring", MarketStandard: 90, YourScore: 70, fullMark: 100 },
      { subject: "Relays", MarketStandard: 80, YourScore: 40, fullMark: 100 },
      { subject: "Earthing", MarketStandard: 85, YourScore: 60, fullMark: 100 },
      { subject: "HV Safety", MarketStandard: 90, YourScore: 45, fullMark: 100 },
      { subject: "Panel Wiring", MarketStandard: 85, YourScore: 55, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-nsk-elec-01",
        title: "Advanced Electrical Switchgear & Substation Commissioning",
        institute: "ABB & Siemens Power Training Centre, Govt ITI Satpur",
        district: "Nashik",
        duration: "3 Months",
        mode: "Full Time Lab + Live Substation",
        stipendMonthly: 4500,
        placementRate: 93.0,
        topHiringCompanies: ["ABB India", "Schneider Electric Nashik", "Crompton Greaves"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-nagpur-drone",
    roleTitle: "Drone Assembly, Avionics & Maintenance Technician",
    sector: "Aerospace & Drone Technology",
    avgSalary: "₹25,000 - ₹42,000 / month",
    stateDemandIndex: 93,
    primaryDistrict: "Nagpur",
    availableDistricts: ["Nagpur", "Pune", "Mumbai"],
    requiredSkills: [
      { name: "BLDC Motor", requiredLevel: 85, candidateLevel: 45 },
      { name: "Telematics", requiredLevel: 80, candidateLevel: 35 },
      { name: "Battery Management", requiredLevel: 85, candidateLevel: 50 },
      { name: "Sensors", requiredLevel: 80, candidateLevel: 55 },
      { name: "Preventive Maintenance", requiredLevel: 75, candidateLevel: 60 },
    ],
    radarData: [
      { subject: "BLDC Motors", MarketStandard: 85, YourScore: 45, fullMark: 100 },
      { subject: "Telematics", MarketStandard: 80, YourScore: 35, fullMark: 100 },
      { subject: "BMS Battery", MarketStandard: 85, YourScore: 50, fullMark: 100 },
      { subject: "Sensors", MarketStandard: 80, YourScore: 55, fullMark: 100 },
      { subject: "Maintenance", MarketStandard: 75, YourScore: 60, fullMark: 100 },
      { subject: "RF Links", MarketStandard: 75, YourScore: 40, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-ngp-drone-01",
        title: "DGCA-Compliant Remotely Piloted Aircraft Assembly & Flight Tech",
        institute: "MIHAN Centre for Autonomous Flight, Govt Polytechnic",
        district: "Nagpur",
        duration: "2 Months",
        mode: "Practical Drone Range & Workshop",
        stipendMonthly: 4000,
        placementRate: 95.0,
        topHiringCompanies: ["IdeaForge", "Garuda Aerospace", "Adani Defence"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-nagpur-logistics",
    roleTitle: "Automated Logistics, AGV & Warehouse Robotics Tech",
    sector: "Supply Chain & Automated Warehousing",
    avgSalary: "₹24,000 - ₹38,000 / month",
    stateDemandIndex: 90,
    primaryDistrict: "Nagpur",
    availableDistricts: ["Nagpur", "Mumbai", "Pune"],
    requiredSkills: [
      { name: "PLC", requiredLevel: 85, candidateLevel: 50 },
      { name: "SCADA", requiredLevel: 80, candidateLevel: 40 },
      { name: "Industrial IoT", requiredLevel: 80, candidateLevel: 35 },
      { name: "Hydraulics", requiredLevel: 85, candidateLevel: 60 },
      { name: "Sensor Interfacing", requiredLevel: 80, candidateLevel: 45 },
    ],
    radarData: [
      { subject: "PLC", MarketStandard: 85, YourScore: 50, fullMark: 100 },
      { subject: "SCADA", MarketStandard: 80, YourScore: 40, fullMark: 100 },
      { subject: "IoT", MarketStandard: 80, YourScore: 35, fullMark: 100 },
      { subject: "Hydraulics", MarketStandard: 85, YourScore: 60, fullMark: 100 },
      { subject: "Sensors", MarketStandard: 80, YourScore: 45, fullMark: 100 },
      { subject: "Conveyors", MarketStandard: 80, YourScore: 65, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-ngp-log-01",
        title: "Automated Material Handling & Warehouse Conveyor Automation",
        institute: "Amazon & Flipkart Logistics CoE, MIHAN",
        district: "Nagpur",
        duration: "3 Months",
        mode: "MIHAN Logistics Hub Apprenticeship",
        stipendMonthly: 5000,
        placementRate: 92.5,
        topHiringCompanies: ["Amazon Fulfillment Nagpur", "DHL Supply Chain", "Delhivery"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-mumbai-devops",
    roleTitle: "Cloud DevOps & Site Reliability Associate",
    sector: "Cloud Computing & Enterprise Infrastructure",
    avgSalary: "₹32,000 - ₹55,000 / month",
    stateDemandIndex: 98,
    primaryDistrict: "Mumbai",
    availableDistricts: ["Mumbai", "Pune"],
    requiredSkills: [
      { name: "Docker", requiredLevel: 90, candidateLevel: 55 },
      { name: "Kubernetes", requiredLevel: 80, candidateLevel: 30 },
      { name: "CI/CD", requiredLevel: 85, candidateLevel: 40 },
      { name: "AWS", requiredLevel: 85, candidateLevel: 50 },
      { name: "Linux Bash", requiredLevel: 85, candidateLevel: 65 },
      { name: "Git", requiredLevel: 90, candidateLevel: 75 },
    ],
    radarData: [
      { subject: "Docker", MarketStandard: 90, YourScore: 55, fullMark: 100 },
      { subject: "Kubernetes", MarketStandard: 80, YourScore: 30, fullMark: 100 },
      { subject: "CI/CD", MarketStandard: 85, YourScore: 40, fullMark: 100 },
      { subject: "AWS Cloud", MarketStandard: 85, YourScore: 50, fullMark: 100 },
      { subject: "Linux Bash", MarketStandard: 85, YourScore: 65, fullMark: 100 },
      { subject: "Git", MarketStandard: 90, YourScore: 75, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-mum-devops-01",
        title: "Enterprise Cloud DevOps & Container Orchestration",
        institute: "Govt ITI Mulund & AWS Academy",
        district: "Mumbai",
        duration: "4 Months",
        mode: "Hybrid Online + Cloud Sandbox",
        stipendMonthly: 6000,
        placementRate: 94.8,
        topHiringCompanies: ["TCS Mumbai", "Jio Cloud Services", "LTIMindtree", "Cognizant"],
        nsfqLevel: 6,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-mumbai-fintech",
    roleTitle: "Fintech Data Ops & API Integration Specialist",
    sector: "BFSI & Financial Technology",
    avgSalary: "₹30,000 - ₹48,000 / month",
    stateDemandIndex: 95,
    primaryDistrict: "Mumbai",
    availableDistricts: ["Mumbai", "Pune"],
    requiredSkills: [
      { name: "SQL", requiredLevel: 90, candidateLevel: 65 },
      { name: "REST API", requiredLevel: 85, candidateLevel: 50 },
      { name: "Python", requiredLevel: 85, candidateLevel: 55 },
      { name: "PostgreSQL", requiredLevel: 80, candidateLevel: 45 },
      { name: "Power BI", requiredLevel: 75, candidateLevel: 40 },
    ],
    radarData: [
      { subject: "SQL Data", MarketStandard: 90, YourScore: 65, fullMark: 100 },
      { subject: "REST API", MarketStandard: 85, YourScore: 50, fullMark: 100 },
      { subject: "Python", MarketStandard: 85, YourScore: 55, fullMark: 100 },
      { subject: "PostgreSQL", MarketStandard: 80, YourScore: 45, fullMark: 100 },
      { subject: "Power BI", MarketStandard: 75, YourScore: 40, fullMark: 100 },
      { subject: "Compliance", MarketStandard: 75, YourScore: 60, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-mum-fintech-01",
        title: "Financial Technology Data Operations & Security Protocols",
        institute: "National Institute of Securities Markets (NISM) & ITI Kurla",
        district: "Mumbai",
        duration: "3 Months",
        mode: "Full Time Lab",
        stipendMonthly: 5000,
        placementRate: 92.0,
        topHiringCompanies: ["HDFC Bank Digital", "Zerodha Tech", "Paytm Mumbai", "Kotak"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-kolhapur-foundry",
    roleTitle: "Foundry Metallurgy & Robotic Core-Moulding Specialist",
    sector: "Foundry & Casting Automation",
    avgSalary: "₹22,000 - ₹36,000 / month",
    stateDemandIndex: 86,
    primaryDistrict: "Kolhapur & Sangli",
    availableDistricts: ["Kolhapur & Sangli", "Chhatrapati Sambhajinagar", "Pune"],
    requiredSkills: [
      { name: "Hydraulics", requiredLevel: 85, candidateLevel: 60 },
      { name: "Pneumatics", requiredLevel: 80, candidateLevel: 50 },
      { name: "Quality Inspection", requiredLevel: 85, candidateLevel: 55 },
      { name: "Preventive Maintenance", requiredLevel: 80, candidateLevel: 65 },
      { name: "KUKA Robotics", requiredLevel: 75, candidateLevel: 30 },
    ],
    radarData: [
      { subject: "Hydraulics", MarketStandard: 85, YourScore: 60, fullMark: 100 },
      { subject: "Pneumatics", MarketStandard: 80, YourScore: 50, fullMark: 100 },
      { subject: "Inspection", MarketStandard: 85, YourScore: 55, fullMark: 100 },
      { subject: "Maintenance", MarketStandard: 80, YourScore: 65, fullMark: 100 },
      { subject: "Robotics", MarketStandard: 75, YourScore: 30, fullMark: 100 },
      { subject: "Casting Sand", MarketStandard: 80, YourScore: 70, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-kop-foundry-01",
        title: "Modern Automated Foundry Technology & Robotic Moulding",
        institute: "Kolhapur Institute of Foundry Tech & Govt ITI Shiroli",
        district: "Kolhapur & Sangli",
        duration: "3 Months",
        mode: "Full Time Hands-on Foundry",
        stipendMonthly: 4500,
        placementRate: 91.0,
        topHiringCompanies: ["Menon & Menon Ltd", "Kirloskar Oil Engines", "Ghatge Patil Transmissions"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
  {
    id: "path-kolhapur-sugar",
    roleTitle: "Agro-Industrial Boiler & Turbine Automation Tech",
    sector: "Agro-Processing & Energy Co-generation",
    avgSalary: "₹23,000 - ₹37,000 / month",
    stateDemandIndex: 88,
    primaryDistrict: "Kolhapur & Sangli",
    availableDistricts: ["Kolhapur & Sangli", "Nashik", "Nagpur"],
    requiredSkills: [
      { name: "SCADA", requiredLevel: 85, candidateLevel: 45 },
      { name: "PLC", requiredLevel: 85, candidateLevel: 50 },
      { name: "VFD Drive", requiredLevel: 80, candidateLevel: 40 },
      { name: "Pneumatics", requiredLevel: 80, candidateLevel: 55 },
      { name: "Preventive Maintenance", requiredLevel: 85, candidateLevel: 70 },
    ],
    radarData: [
      { subject: "SCADA", MarketStandard: 85, YourScore: 45, fullMark: 100 },
      { subject: "PLC", MarketStandard: 85, YourScore: 50, fullMark: 100 },
      { subject: "VFD Drive", MarketStandard: 80, YourScore: 40, fullMark: 100 },
      { subject: "Pneumatics", MarketStandard: 80, YourScore: 55, fullMark: 100 },
      { subject: "Maintenance", MarketStandard: 85, YourScore: 70, fullMark: 100 },
      { subject: "Turbine Safety", MarketStandard: 80, YourScore: 60, fullMark: 100 },
    ],
    matchedCourses: [
      {
        id: "crs-kop-sugar-01",
        title: "Co-generation Power Plant & High-Pressure Boiler Automation",
        institute: "Vasantdada Sugar Institute (VSI) & Govt ITI Sangli",
        district: "Kolhapur & Sangli",
        duration: "3 Months",
        mode: "Full Time Practical Workshop",
        stipendMonthly: 4000,
        placementRate: 90.5,
        topHiringCompanies: ["Dutt Sugar Factory", "Praj Industries", "Thermax Co-gen"],
        nsfqLevel: 5,
        providerType: "Government ITI",
        feeStructure: "100% Free (Govt DBT Stipend)",
      },
    ],
  },
];

export interface TrendingLiveJob {
  job_id: string;
  job_title: string;
  employer: string;
  city: string;
  skills_detected: string[];
  apply_link: string;
  posted_at: string;
  description_snippet: string;
  platform?: "LinkedIn" | "Naukri" | "Indeed" | "Internshala";
  salary_range?: string;
  experience_required?: string;
  work_mode?: "On-site" | "Hybrid" | "Remote";
}

export const TRENDING_LIVE_JOBS: TrendingLiveJob[] = [
  {
    job_id: "job-li-01",
    job_title: "CNC VMC Milling Setter & Operator",
    employer: "Senwell Exports Private Limited",
    city: "Pune",
    skills_detected: ["CNC", "G-code", "GD&T", "M-code", "Fanuc"],
    apply_link: "https://www.linkedin.com/jobs/view/cnc-vmc-operator-senwell-pune",
    posted_at: "2 hours ago",
    description_snippet: "Immediate opening for VMC 3-axis & 4-axis machine operator in Kesnand, Pune. Fanuc controller experience preferred. Freshers with ITI Machinist or Diploma welcome.",
    platform: "LinkedIn",
    salary_range: "₹22,000 - ₹32,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-nk-02",
    job_title: "Machinist - CNC Turning & 5-Axis Milling",
    employer: "NOV Inc. (National Oilwell Varco)",
    city: "Pune",
    skills_detected: ["AutoCAD", "CNC", "Fanuc", "GD&T", "Siemens"],
    apply_link: "https://www.naukri.com/job-listings-machinist-cnc-turning-nov-pune",
    posted_at: "1 day ago",
    description_snippet: "Precision machining of oil & gas components. Must read blueprints with GD&T callouts and operate Siemens 840D / Fanuc CNC lathes in Chakan MIDC.",
    platform: "Naukri",
    salary_range: "₹25,000 - ₹38,000 / mo",
    experience_required: "1-3 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-li-03",
    job_title: "Junior EV Battery Assembly & Diagnostic Technician",
    employer: "Tata Motors EV Passenger Mobility Ltd",
    city: "Pune",
    skills_detected: ["EV", "BMS", "High Voltage Safety", "CAN-Bus", "Sensors"],
    apply_link: "https://www.linkedin.com/jobs/view/ev-battery-assembly-technician-tata-motors",
    posted_at: "3 hours ago",
    description_snippet: "Hiring for Tata Motors EV battery gigafactory plant in Chakan. Cell balancing, battery pack insulation testing, and harness routing. On-the-job high voltage training provided.",
    platform: "LinkedIn",
    salary_range: "₹24,000 - ₹35,000 / mo",
    experience_required: "Fresher / 0-1 Year",
    work_mode: "On-site",
  },
  {
    job_id: "job-in-04",
    job_title: "Laser Cutting & CNC Bending Machine Operator",
    employer: "Power Excel Engineering",
    city: "Pune",
    skills_detected: ["CNC", "Preventive Maintenance", "G-code", "Quality Inspection"],
    apply_link: "https://in.indeed.com/viewjob?jk=power-excel-laser-cutting-pune",
    posted_at: "4 days ago",
    description_snippet: "Operate Trumpf fiber laser and Bystronic CNC press brake in Bhosari MIDC. Sheet metal drafting with AutoCAD. Company provides overtime and bonus.",
    platform: "Indeed",
    salary_range: "₹20,000 - ₹28,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-nk-05",
    job_title: "Junior Web Developer & Cloud Associate",
    employer: "Persistent Systems",
    city: "Pune",
    skills_detected: ["React", "Next.js", "Node.js", "Git", "REST API", "Docker"],
    apply_link: "https://www.naukri.com/job-listings-junior-web-developer-persistent-pune",
    posted_at: "Just now",
    description_snippet: "Looking for enthusiastic freshers skilled in React, Next.js, and Node.js REST APIs. Hinjewadi Phase 1 office. Great learning environment with cloud mentorship.",
    platform: "Naukri",
    salary_range: "₹30,000 - ₹48,000 / mo",
    experience_required: "Fresher / 0-1 Year",
    work_mode: "Hybrid",
  },
  {
    job_id: "job-li-06",
    job_title: "Tool & Die Maker / CNC Wire EDM Setter",
    employer: "Bharat Forge Ltd",
    city: "Chhatrapati Sambhajinagar",
    skills_detected: ["Tool & Die Making", "AutoCAD", "Mastercam", "GD&T", "CMM"],
    apply_link: "https://www.linkedin.com/jobs/view/tool-die-maker-bharat-forge-aurangabad",
    posted_at: "1 day ago",
    description_snippet: "Manufacturing of high-precision aerospace stamping dies and forging fixtures. Experience in Mastercam toolpaths and CMM dimensional inspection is a strong plus.",
    platform: "LinkedIn",
    salary_range: "₹26,000 - ₹40,000 / mo",
    experience_required: "1-3 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-in-07",
    job_title: "Industrial Automation & PLC Programmer",
    employer: "Endress+Hauser Flowtech India",
    city: "Chhatrapati Sambhajinagar",
    skills_detected: ["PLC", "SCADA", "Sensor Interfacing", "VFD Drive", "Relay Logic"],
    apply_link: "https://in.indeed.com/viewjob?jk=endress-hauser-plc-aurangabad",
    posted_at: "2 days ago",
    description_snippet: "Commissioning of automated flow sensor calibration rigs. Hands-on testing of Siemens S7-1200 PLCs and WinCC SCADA dashboards in Shendra MIDC.",
    platform: "Indeed",
    salary_range: "₹28,000 - ₹42,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-nk-08",
    job_title: "Solar Rooftop Project Site Technician",
    employer: "Tata Power Solar Systems Ltd",
    city: "Nagpur",
    skills_detected: ["Solar PV", "Net Metering", "Grid Safety", "Earthing", "Solar Inverter"],
    apply_link: "https://www.naukri.com/job-listings-solar-rooftop-technician-tata-power-nagpur",
    posted_at: "5 hours ago",
    description_snippet: "Execution of 10kW to 100kW commercial rooftop solar installations across Vidarbha. String inverter wiring, MSEDCL net metering approvals, and lightning arrester earthing.",
    platform: "Naukri",
    salary_range: "₹22,000 - ₹34,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-li-09",
    job_title: "Warehouse Robotics & AGV Conveyor Maintenance",
    employer: "Amazon Transportation Services",
    city: "Nagpur",
    skills_detected: ["PLC", "Sensors", "Hydraulics", "Pneumatics", "Preventive Maintenance"],
    apply_link: "https://www.linkedin.com/jobs/view/mechatronics-robotics-technician-amazon-nagpur",
    posted_at: "1 day ago",
    description_snippet: "Keep Amazon MIHAN fulfillment center sortation loops operating 24x7. Troubleshooting optical sensors, barcode scanners, and motorized drive rollers.",
    platform: "LinkedIn",
    salary_range: "₹25,000 - ₹38,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-nk-10",
    job_title: "Aerospace CNC Milling Setter",
    employer: "Mahindra Aerostructures / HAL Ancillary",
    city: "Nashik",
    skills_detected: ["CNC", "Fanuc", "GD&T", "G-code", "Quality Inspection"],
    apply_link: "https://www.naukri.com/job-listings-aerospace-cnc-machinist-hal-nashik",
    posted_at: "3 days ago",
    description_snippet: "Machining of titanium and aircraft grade aluminium components in Ozar, Nashik. Tight tolerances within 5 microns. Fanuc / Siemens controls.",
    platform: "Naukri",
    salary_range: "₹24,000 - ₹38,000 / mo",
    experience_required: "1-3 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-li-11",
    job_title: "High Voltage Switchgear Testing Trainee",
    employer: "ABB India Limited",
    city: "Nashik",
    skills_detected: ["Transformer", "High Voltage Safety", "Earthing", "Relay Logic", "Single & 3-Phase Wiring"],
    apply_link: "https://www.linkedin.com/jobs/view/switchgear-testing-trainee-abb-nashik",
    posted_at: "Just now",
    description_snippet: "Satpur MIDC plant opening for electrical diploma / ITI graduates. Dielectric breakdown testing of circuit breakers, current transformers, and SF6 gas insulated panels.",
    platform: "LinkedIn",
    salary_range: "₹23,000 - ₹35,000 / mo",
    experience_required: "Fresher Welcome",
    work_mode: "On-site",
  },
  {
    job_id: "job-nk-12",
    job_title: "Cloud & DevOps Operations Junior Associate",
    employer: "Jio Platforms Limited",
    city: "Mumbai",
    skills_detected: ["Docker", "Kubernetes", "AWS", "Git", "Linux Bash", "CI/CD"],
    apply_link: "https://www.naukri.com/job-listings-cloud-devops-jio-platforms-mumbai",
    posted_at: "6 hours ago",
    description_snippet: "Reliance Corporate Park (Ghansoli / Navi Mumbai). Monitor Kubernetes clusters, automate Docker container rollouts with GitHub Actions, and ensure 99.99% uptime.",
    platform: "Naukri",
    salary_range: "₹32,000 - ₹52,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "Hybrid",
  },
  {
    job_id: "job-li-13",
    job_title: "Foundry Robotic Core-Moulding Operator",
    employer: "Menon and Menon Ltd",
    city: "Kolhapur & Sangli",
    skills_detected: ["Hydraulics", "Pneumatics", "KUKA Robotics", "Quality Inspection", "Preventive Maintenance"],
    apply_link: "https://www.linkedin.com/jobs/view/foundry-robotics-technician-menon-kolhapur",
    posted_at: "2 days ago",
    description_snippet: "Automated engine cylinder block casting in Shiroli MIDC. Monitoring KUKA robotic pouring ladles and hydraulic core press machines.",
    platform: "LinkedIn",
    salary_range: "₹22,000 - ₹35,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-in-14",
    job_title: "Sugar Mill Boiler SCADA & Turbine Technician",
    employer: "Praj Industries & Dutt Co-gen",
    city: "Kolhapur & Sangli",
    skills_detected: ["SCADA", "PLC", "VFD Drive", "Pneumatics", "Preventive Maintenance"],
    apply_link: "https://in.indeed.com/viewjob?jk=sugar-mill-scada-praj-kolhapur",
    posted_at: "4 days ago",
    description_snippet: "Monitoring high-pressure 67-bar biomass boilers and power co-generation turbines during crushing season. PLC troubleshooting and valve actuator calibrations.",
    platform: "Indeed",
    salary_range: "₹23,000 - ₹36,000 / mo",
    experience_required: "1-2 Years",
    work_mode: "On-site",
  },
  {
    job_id: "job-nk-15",
    job_title: "Drone Assembly & Telemetry Flight Tech",
    employer: "Garuda Aerospace Hub",
    city: "Nagpur",
    skills_detected: ["BLDC Motor", "Telematics", "Sensors", "Battery Management", "Preventive Maintenance"],
    apply_link: "https://www.naukri.com/job-listings-drone-technician-garuda-nagpur",
    posted_at: "1 day ago",
    description_snippet: "Assembling hexacopter agricultural spraying drones in MIHAN. ESC calibration, GPS compass orientation, and LiPo battery testing.",
    platform: "Naukri",
    salary_range: "₹25,000 - ₹40,000 / mo",
    experience_required: "Fresher / 0-1 Year",
    work_mode: "On-site",
  },
  {
    job_id: "job-li-16",
    job_title: "AI & Data Annotation Associate",
    employer: "Fractal Analytics",
    city: "Mumbai",
    skills_detected: ["Python", "SQL", "Prompt Engineering", "AI", "Power BI"],
    apply_link: "https://www.linkedin.com/jobs/view/ai-data-annotator-fractal-mumbai",
    posted_at: "12 hours ago",
    description_snippet: "Evaluate generative AI responses, structure multi-modal computer vision datasets, and validate LLM outputs for enterprise banking clients in Goregaon East.",
    platform: "LinkedIn",
    salary_range: "₹28,000 - ₹45,000 / mo",
    experience_required: "0-1 Year",
    work_mode: "Hybrid",
  },
  {
    job_id: "job-int-17",
    job_title: "Mechatronics & Robotics Trainee Intern",
    employer: "FANUC India CoE",
    city: "Pune",
    skills_detected: ["PLC", "Robotics", "Cobots", "Safety Interlocks", "Fanuc Robotics"],
    apply_link: "https://internshala.com/internship/detail/mechatronics-robotics-internship-fanuc-pune",
    posted_at: "Just now",
    description_snippet: "Hands-on apprenticeship at FANUC Technology Centre in Sanaswadi, Pune. Train on 6-axis yellow robots and collaborative cobots. Monthly stipend provided.",
    platform: "Internshala",
    salary_range: "₹18,000 - ₹24,000 / mo Stipend",
    experience_required: "Fresher / Trainee",
    work_mode: "On-site",
  },
  {
    job_id: "job-li-18",
    job_title: "Full-Stack React & Next.js Engineer (Junior)",
    employer: "LTIMindtree Digital",
    city: "Mumbai",
    skills_detected: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Git"],
    apply_link: "https://www.linkedin.com/jobs/view/junior-nextjs-developer-ltimindtree-mumbai",
    posted_at: "1 day ago",
    description_snippet: "Build modern scalable user interfaces and serverless microservices for international banking clients at Airoli Mindspace campus.",
    platform: "LinkedIn",
    salary_range: "₹34,000 - ₹55,000 / mo",
    experience_required: "0-2 Years",
    work_mode: "Hybrid",
  },
];

