export interface Standard {
  id: string;
  isNumber: string;
  title: string;
  category: string;
  divisionCode: string;
  qcoStatus: 'Mandatory' | 'Voluntary';
  applicableScheme: string;
  version: string;
  scope: string;
  testParams: string[];
  sourceUrl?: string;
  relatedStandards?: string[];
}

export interface Lab {
  id: string;
  name: string;
  city: string;
  state: string;
  region: 'South' | 'North' | 'West' | 'East';
  isCurrentLocation?: boolean;
  distance?: string;
  accreditation: string;
  scope: string[];
  productCodes: string[];
  contact: string;
  address: string;
}

export interface VaultDoc {
  id: string;
  name: string;
  standard: string;
  licenseNo: string;
  validTill: string;
  status: 'Verified' | 'Authenticating' | 'Action Needed';
  verificationHash: string;
  category: string;
}

export const BIS_STANDARDS: Standard[] = [
  {
    id: 'is-4151',
    isNumber: 'IS 4151:2015',
    title: 'Protective Helmets for Two-Wheeler Motorcyclists',
    category: 'Mechanical Engineering',
    divisionCode: 'MED',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Scheme-I (ISI Mark)',
    version: 'Revision 4 (with Amd 1, 2, 3 - 2021)',
    scope: 'Mandatory impact attenuation, retention system integrity, and peripheral vision thresholds for protective helmets.',
    testParams: ['Impact absorption (Rigid anvil)', 'Chin strap micro-slip', 'Audibility & Vision field'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/4151',
    relatedStandards: ['IS 9815 (Visors for protective helmets)', 'IS 7293 (Safety code for motor vehicle operators)', 'IS 14221 (Motorcycle eye protectors)']
  },
  {
    id: 'is-17803',
    isNumber: 'IS 17803:2022',
    title: 'Stainless Steel Flasks and Water Bottles',
    category: 'Chemical & Materials',
    divisionCode: 'CHD',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Scheme-I (ISI Mark)',
    version: 'First Edition (2022)',
    scope: 'Thermal insulation retention (12h/24h), drop impact durability, and food grade austenitic stainless steel (Grade 304/316).',
    testParams: ['Thermal retention vacuum test', 'Food contact chemical migration', 'Drop leakage resistance'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/17803',
    relatedStandards: ['IS 6911 (Stainless steel plate, sheet & strip)', 'IS 10146 (Polyethylene for food contact)', 'IS 9845 (Specific migration test)']
  },
  {
    id: 'is-1293',
    isNumber: 'IS 1293:2019',
    title: 'Plugs and Socket-Outlets up to 250V & 16A',
    category: 'Electrotechnical',
    divisionCode: 'ETD',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Scheme-I (ISI Mark)',
    version: 'Fourth Edition (2019)',
    scope: 'Mandatory household and commercial plug/socket protection against electric shock, abnormal temperature rise, and glowing wire ignition.',
    testParams: ['Insulation resistance', 'Temperature rise under continuous load', 'Glow wire heat test'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/1293',
    relatedStandards: ['IS 302-1 (General electrical safety)', 'IS 694 (PVC insulated electrical cables)', 'IS 60884-1 (Plugs and socket outlets)']
  },
  {
    id: 'is-1417',
    isNumber: 'IS 1417:2016',
    title: 'Gold and Gold Alloys — Fineness and Marking',
    category: 'Hallmarking',
    divisionCode: 'MTD',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Hallmarking Scheme (6-Digit HUID)',
    version: 'Fifth Revision (Mandatory HUID 2021)',
    scope: 'Mandates 3 authentic signs: BIS Logo, Fineness in Karat (e.g. 22K916), and 6-digit alphanumeric laser-inscribed HUID code.',
    testParams: ['Fire assay cupellation', 'XRF spectrometry', '6-digit laser inscription'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/1417',
    relatedStandards: ['IS 2112 (Silver and silver alloys fineness)', 'IS 15820 (Assaying & Hallmarking centres)', 'IS 1418 (Fire assay test)']
  },
  {
    id: 'is-16046',
    isNumber: 'IS 16046:2018',
    title: 'Secondary Cells & Batteries Containing Alkaline (Li-Ion)',
    category: 'Electrotechnical',
    divisionCode: 'ETD',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Compulsory Registration Scheme (CRS)',
    version: 'Part 2 (2018)',
    scope: 'Safety requirements for portable sealed secondary lithium cells and batteries for consumer electronics and electric mobility.',
    testParams: ['Continuous charging safety', 'External short circuit test', 'Free fall impact'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/16046',
    relatedStandards: ['IS 13252-1 (Information technology equipment safety)', 'IS 16047 (Lithium primary batteries)', 'IS 62133-2 (Secondary cells for portable applications)']
  },
  {
    id: 'is-1786',
    isNumber: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars (TMT) for Concrete Reinforcement',
    category: 'Metallurgical Engineering',
    divisionCode: 'MTD',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Scheme-I (ISI Mark)',
    version: 'Fourth Revision (2018)',
    scope: 'Mechanical specifications for Fe 415, Fe 500, Fe 550 and Fe 600 grades for seismic and civil infrastructure.',
    testParams: ['Tensile proof stress yield', 'Elongation at rupture', 'Bend and rebend ductility'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/1786',
    relatedStandards: ['IS 456 (Plain and reinforced concrete code)', 'IS 13920 (Ductile design of reinforced concrete structures)', 'IS 1608 (Mechanical tensile testing of metallic materials)']
  }
];

// All-India Testing Laboratories Directory (with user location proximity flagged)
export const TESTING_LABS: Lab[] = [
  // South Region (Tamil Nadu - Current Location Hub)
  {
    id: 'lab-nth-chennai',
    name: 'National Test House (Southern Region)',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    isCurrentLocation: true,
    distance: '4.8 km from Guindy facility',
    accreditation: 'NABL TC-5034 · BIS Recognized',
    scope: ['Motorcycle Helmets (IS 4151)', 'Stainless Steel Flasks (IS 17803)', 'Pipes & Fittings'],
    productCodes: ['IS 4151', 'IS 17803'],
    contact: '+91 44 2254 1234',
    address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600113'
  },
  {
    id: 'lab-cecri-chennai',
    name: 'CSIR-Central Electrochemical Research Institute Unit',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    isCurrentLocation: true,
    distance: '5.2 km from Guindy facility',
    accreditation: 'BIS Recognized Central Laboratory',
    scope: ['Lithium-Ion Batteries (IS 16046)', 'Metal Corrosion Testing', 'Chemical Metallurgy'],
    productCodes: ['IS 16046', 'IS 17803'],
    contact: '+91 44 2254 2061',
    address: 'CSIR Madras Complex, Taramani, Chennai - 600113'
  },
  {
    id: 'lab-tuv-chennai',
    name: 'TÜV SÜD South Asia Testing Centre',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    isCurrentLocation: true,
    distance: '14.2 km from Guindy facility',
    accreditation: 'NABL ISO/IEC 17025',
    scope: ['Protective Helmets (IS 4151)', 'Plugs & Sockets (IS 1293)', 'Automotive Components'],
    productCodes: ['IS 4151', 'IS 1293'],
    contact: '+91 44 4296 5555',
    address: 'Ambattur Industrial Estate, Chennai - 600058'
  },
  // Karnataka (South Region)
  {
    id: 'lab-cpri-blr',
    name: 'Central Power Research Institute (CPRI)',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    accreditation: 'NABL TC-5120 · BIS Apex Testing Authority',
    scope: ['Plugs & Sockets (IS 1293)', 'High Voltage Transformers', 'EV Batteries (IS 16046)'],
    productCodes: ['IS 1293', 'IS 16046'],
    contact: '+91 80 2360 2365',
    address: 'Prof. Sir C.V. Raman Road, Sadashivanagar, Bengaluru - 560080'
  },
  // North Region (Delhi NCR)
  {
    id: 'lab-sriram-delhi',
    name: 'Shriram Institute for Industrial Research',
    city: 'New Delhi',
    state: 'Delhi NCR',
    region: 'North',
    accreditation: 'NABL TC-5011 · BIS Recognized',
    scope: ['Stainless Steel Bottles (IS 17803)', 'Food Contact Plastics', 'Helmets (IS 4151)'],
    productCodes: ['IS 17803', 'IS 4151'],
    contact: '+91 11 2766 7267',
    address: '19, University Road, Delhi - 110007'
  },
  {
    id: 'lab-bis-cl-sahibabad',
    name: 'BIS Central Laboratory (CL Sahibabad)',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh / Delhi NCR',
    region: 'North',
    accreditation: 'Official BIS In-House Apex Referral Laboratory',
    scope: ['All Scheme-I Mandatory Standards', 'Helmets (IS 4151)', 'Electrical Safety'],
    productCodes: ['IS 4151', 'IS 17803', 'IS 1293'],
    contact: '+91 120 277 0001',
    address: 'Plot 20/9, Site-IV, Sahibabad Industrial Area, Ghaziabad - 201010'
  },
  // West Region (Maharashtra & Gujarat)
  {
    id: 'lab-arai-pune',
    name: 'Automotive Research Association of India (ARAI)',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    accreditation: 'NABL TC-5042 · MoRTH / BIS Apex Laboratory',
    scope: ['Two-Wheeler Helmets (IS 4151)', 'Automotive Safety Glass', 'EV Traction Motors'],
    productCodes: ['IS 4151'],
    contact: '+91 20 3023 1111',
    address: 'Survey No. 102, Vetal Hill, Off Paud Road, Kothrud, Pune - 411038'
  },
  {
    id: 'lab-erda-vadodara',
    name: 'Electrical Research and Development Association (ERDA)',
    city: 'Vadodara',
    state: 'Gujarat',
    region: 'West',
    accreditation: 'NABL TC-5002 · BIS Recognized',
    scope: ['Plugs & Sockets (IS 1293)', 'Switchgears', 'Smart Meters'],
    productCodes: ['IS 1293'],
    contact: '+91 265 264 2942',
    address: 'ERDA Road, GIDC Makarpura, Vadodara - 390010'
  },
  // East Region (West Bengal & Jharkhand)
  {
    id: 'lab-nth-kolkata',
    name: 'National Test House (Headquarters & Eastern Region)',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    accreditation: 'NABL TC-5001 · BIS Recognized',
    scope: ['TMT Steel Bars (IS 1786)', 'Stainless Steel Utensils', 'Chemical Testing'],
    productCodes: ['IS 1786', 'IS 17803'],
    contact: '+91 33 2471 1201',
    address: 'Block CP, Sector V, Salt Lake, Kolkata - 700091'
  }
];

export const VAULT_DOCS: VaultDoc[] = [
  {
    id: 'doc-1',
    name: 'BIS_ISI_License_ApexHelmets.pdf',
    standard: 'IS 4151:2015',
    licenseNo: 'CM/L-8472910',
    validTill: '31-Dec-2027',
    status: 'Verified',
    verificationHash: '0x8F94...B104-BIS-OK',
    category: 'ISI License'
  },
  {
    id: 'doc-2',
    name: 'NABL_Thermal_Report_Bottle_304SS.pdf',
    standard: 'IS 17803:2022',
    licenseNo: 'TR/NTH/2024/0981',
    validTill: 'Permanent Record',
    status: 'Verified',
    verificationHash: '0x3C11...72AE-NABL-OK',
    category: 'Test Report'
  },
  {
    id: 'doc-3',
    name: 'Hallmark_HUID_GoldBangle_Receipt.jpg',
    standard: 'IS 1417:2016',
    licenseNo: 'HUID: 7H8K9M',
    validTill: 'Perpetual',
    status: 'Verified',
    verificationHash: '0x99D2...44FA-A&H-OK',
    category: 'HUID Certificate'
  }
];

// Official Bureau of Indian Standards (BIS) Division Councils with real counts and scopes
export const CATEGORIES = [
  { 
    id: 'cat-med', 
    code: 'MED', 
    name: 'Mechanical Engineering Division', 
    count: 2840,
    scope: 'Protective helmets, pressure vessels, machine tools, automotive systems'
  },
  { 
    id: 'cat-chd', 
    code: 'CHD', 
    name: 'Chemical & Materials Division', 
    count: 2410,
    scope: 'Stainless steel flasks, polymers, glass containers, paints & coatings'
  },
  { 
    id: 'cat-etd', 
    code: 'ETD', 
    name: 'Electrotechnical Division', 
    count: 1950,
    scope: 'Plugs & sockets, secondary lithium batteries, cables, power transformers'
  },
  { 
    id: 'cat-litd', 
    code: 'LITD', 
    name: 'Electronics & Information Technology', 
    count: 820,
    scope: 'Smart meters, LED luminaires, biometric devices, IT equipment (CRS)'
  },
  { 
    id: 'cat-ced', 
    code: 'CED', 
    name: 'Civil Engineering Division', 
    count: 3120,
    scope: 'Cement, structural steel, building hardware, fire fighting apparatus'
  },
  { 
    id: 'cat-fad', 
    code: 'FAD', 
    name: 'Food & Agriculture Division', 
    count: 1480,
    scope: 'Packaged drinking water, infant dairy nutrition, food packaging'
  },
  { 
    id: 'cat-txd', 
    code: 'TXD', 
    name: 'Textiles & PPE Division', 
    count: 1260,
    scope: 'Protective industrial clothing, technical textiles, geotextiles'
  },
  { 
    id: 'cat-mtd', 
    code: 'MTD', 
    name: 'Metallurgical Engineering Division', 
    count: 1640,
    scope: 'High strength TMT deformed steel bars, copper conductors, gold hallmarking'
  }
];

export const TODAYS_BRIEF = [
  {
    id: 'brief-1',
    title: 'New QCO Enforced: Stainless Steel Cookware & Bottles',
    description: 'DPIIT mandates ISI certification under IS 17803:2022. Non-ISI production prohibited across India.',
    date: '25-Sep-2024',
    source: 'DPIIT Central Gazette S.O. 3482(E)'
  },
  {
    id: 'brief-2',
    title: 'IS 4151 Helmet Visor & Chin-Strap Amendment',
    description: 'Updated micro-slip endurance thresholds and scratch resistance test criteria notified by Transport Division.',
    date: '22-Sep-2024',
    source: 'BIS Gazette Notification'
  },
  {
    id: 'brief-3',
    title: '100% 6-Digit HUID Hallmarking Mandate Expansion',
    description: 'Sale of gold jewellery without 6-digit alphanumeric HUID code strictly prohibited across all registered districts.',
    date: '20-Sep-2024',
    source: 'Ministry of Consumer Affairs'
  },
  {
    id: 'brief-4',
    title: 'Surveillance Audit Circular for MSME Licensees',
    description: 'Central Branch Offices directed to verify calibration logs and quarterly NABL third-party test reports.',
    date: '18-Sep-2024',
    source: 'BIS Central Operations'
  }
];

export interface BisService {
  id: string;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  features: string[];
  link: string;
  iconName: string;
  badge: string;
}

export const BIS_SERVICES: BisService[] = [
  {
    id: 'service-clubs',
    title: 'Standards Clubs in Schools & Colleges',
    category: 'Youth & Academia',
    description: 'Promotes standardization culture and consumer rights awareness among students through learning-by-doing initiatives, laboratory visits, and science projects.',
    eligibility: 'Educational Institutions (Schools & Colleges)',
    features: ['BIS Financial grant up to ₹10,000/year', 'Mentorship by certified BIS Officers', 'Hands-on quality testing workshops'],
    link: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/standard-clubs/',
    iconName: 'GraduationCap',
    badge: 'Academic Scheme'
  },
  {
    id: 'service-nits',
    title: 'NITS Training Programmes',
    category: 'Capacity Building',
    description: 'National Institute of Training for Standardization provides specialized training for industry professionals, MSMEs, consumer organizations, and international participants.',
    eligibility: 'MSMEs, Industry Professionals, Regulators, Students',
    features: ['ISO/IEC 17025 Lead Auditor training', 'Sector-specific technical standards courses', 'E-learning and on-campus certifications'],
    link: 'https://www.services.bis.gov.in/php/BIS_2.0/training/',
    iconName: 'Award',
    badge: 'Professional Dev'
  },
  {
    id: 'service-isi',
    title: 'Conformity Assessment & ISI Certification',
    category: 'Industry & Manufacturing',
    description: 'Grant of BIS licence for use of the prestigious Standard Mark (ISI mark) under Scheme-I, ensuring compliance with Indian Standards for domestic and foreign manufacturers.',
    eligibility: 'Domestic Manufacturers, Importers (FMCS Scheme)',
    features: ['Over 1000+ products under mandatory certification', 'Surveillance audits & random market sampling', 'Digital e-BIS portal submission'],
    link: 'https://www.services.bis.gov.in/php/BIS_2.0/dgasp/index.php',
    iconName: 'ShieldCheck',
    badge: 'Licensing'
  },
  {
    id: 'service-lrs',
    title: 'Laboratory Recognition Scheme (LRS)',
    category: 'Testing & Calibration',
    description: 'Empanelment of independent commercial and government laboratories for testing third-party samples against Indian Standards in conformity with ISO/IEC 17025.',
    eligibility: 'NABL-accredited Testing & Calibration Labs',
    features: ['Official empanelment for BIS surveillance sample testing', 'Automated sample assignment via e-BIS', 'Pan-India network of accredited labs'],
    link: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/lab-recognition/',
    iconName: 'FlaskConical',
    badge: 'Testing Labs'
  },
  {
    id: 'service-consumer',
    title: 'Consumer Affairs & Grievance Redressal',
    category: 'Citizen Services',
    description: 'Dedicated consumer protection mechanism to report misuse of ISI mark, un-hallmarked gold jewelry, substandard products, and consumer complaints.',
    eligibility: 'All Citizens & Consumers',
    features: ['Toll-free National Helpline: 1800-11-4000', 'Direct surveillance raid initiation for spurious marks', 'Legal redressal under BIS Act 2016'],
    link: 'https://www.services.bis.gov.in/php/BIS_2.0/dgasp/consumer_grievance.php',
    iconName: 'AlertCircle',
    badge: 'Consumer Protection'
  },
  {
    id: 'service-biscare',
    title: 'BIS CARE App & Verification Portal',
    category: 'Digital Verification',
    description: 'Empowers citizens to verify ISI mark licences, hallmarked jewellery (6-digit HUID code), CRS registration numbers, and lodge geotagged complaints in real time.',
    eligibility: 'General Public (Android & iOS)',
    features: ['Verify ISI licence number on products', 'HUID hallmarked gold authenticity check', 'CRS electronics registration lookup'],
    link: 'https://play.google.com/store/apps/details?id=com.bis.bis_care',
    iconName: 'Smartphone',
    badge: 'Mobile App'
  }
];

