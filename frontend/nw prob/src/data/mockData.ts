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
      },
      {
        id: "crs-ev-02",
        title: "EV Diagnostics & Charging Infrastructure Technician",
        institute: "MahaKaushalya Skill Hub",
        district: "Chhatrapati Sambhajinagar",
        duration: "2 Months",
        mode: "Hands-on Workshop",
        stipendMonthly: 3000,
        placementRate: 88.5,
        topHiringCompanies: ["Ather Energy", "Mahindra Last Mile", "Ola Fleet Ops"],
        nsfqLevel: 4,
      },
    ],
  },
  {
    id: "path-cloud",
    roleTitle: "Fullstack Web & Cloud Associate",
    sector: "Information Technology & Digital Services",
    avgSalary: "₹28,000 - ₹45,000 / month",
    stateDemandIndex: 96,
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
      },
      {
        id: "crs-cs-02",
        title: "API Development & Cloud Microservices Accelerator",
        institute: "Government ITI Nagpur (IT Centre)",
        district: "Nagpur",
        duration: "3 Months",
        mode: "Hybrid",
        stipendMonthly: 3500,
        placementRate: 85.0,
        topHiringCompanies: ["HCLTech", "Infocepts", "GlobalLogic"],
        nsfqLevel: 4,
      },
    ],
  },
  {
    id: "path-cnc",
    roleTitle: "Precision 5-Axis CNC & CAM Specialist",
    sector: "Aerospace & Precision Manufacturing",
    avgSalary: "₹26,000 - ₹42,000 / month",
    stateDemandIndex: 88,
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
      },
    ],
  },
  {
    id: "path-solar",
    roleTitle: "Solar PV & Grid Integration Technician",
    sector: "Renewable Energy & Green Power",
    avgSalary: "₹22,000 - ₹35,000 / month",
    stateDemandIndex: 91,
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
      },
    ],
  },
  {
    id: "path-robotics",
    roleTitle: "Industrial Robotics & PLC Automation Engineer",
    sector: "Smart Manufacturing & Industry 4.0",
    avgSalary: "₹28,000 - ₹46,000 / month",
    stateDemandIndex: 94,
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
      },
    ],
  },
  {
    id: "path-ai",
    roleTitle: "Applied AI & Data Operations Associate",
    sector: "Artificial Intelligence & Analytics",
    avgSalary: "₹30,000 - ₹52,000 / month",
    stateDemandIndex: 97,
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
      },
    ],
  },
];
