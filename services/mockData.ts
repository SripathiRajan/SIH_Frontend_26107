export interface Standard {
  id: string;
  isNumber: string;
  title: string;
  category: string;
  qcoStatus: 'Mandatory' | 'Voluntary';
  applicableScheme: string;
  version: string;
  scope: string;
  testParams: string[];
}

export interface Lab {
  id: string;
  name: string;
  location: string;
  distance: string;
  accreditation: string;
  scope: string[];
  contact: string;
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
    title: 'Protective Helmets for Two Wheeler Motorcyclists',
    category: 'Automotive & Road Safety',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Scheme-I (ISI Mark)',
    version: 'Revision 4 (with Amd 1, 2, 3 - 2021)',
    scope: 'Mandatory impact attenuation, retention system integrity, and peripheral vision thresholds for protective helmets.',
    testParams: ['Impact absorption (Rigid anvil)', 'Chin strap micro-slip', 'Audibility & Vision field']
  },
  {
    id: 'is-17803',
    isNumber: 'IS 17803:2022',
    title: 'Stainless Steel Flasks and Water Bottles',
    category: 'Consumer Goods & Kitchenware',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Scheme-I (ISI Mark)',
    version: 'First Edition (2022)',
    scope: 'Thermal insulation retention (12h/24h), drop impact durability, and food grade austenitic stainless steel (Grade 304/316).',
    testParams: ['Thermal retention vacuum test', 'Food contact chemical migration', 'Drop leakage resistance']
  },
  {
    id: 'is-1293',
    isNumber: 'IS 1293:2019',
    title: 'Plugs and Socket-Outlets up to 250V & 16A',
    category: 'Electrical Safety',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Scheme-I (ISI Mark)',
    version: 'Fourth Edition (2019)',
    scope: 'Mandatory household and commercial plug/socket protection against electric shock, abnormal temperature rise, and glowing wire ignition.',
    testParams: ['Insulation resistance', 'Temperature rise under continuous load', 'Glow wire heat test']
  },
  {
    id: 'is-1417',
    isNumber: 'IS 1417:2016',
    title: 'Gold and Gold Alloys — Fineness and Marking',
    category: 'Gold & Hallmarking',
    qcoStatus: 'Mandatory',
    applicableScheme: 'Hallmarking Scheme (6-Digit HUID)',
    version: 'Fifth Revision (Mandatory HUID 2021)',
    scope: 'Mandates 3 authentic signs: BIS Logo, Fineness in Karat (e.g. 22K916), and 6-digit alphanumeric laser-inscribed HUID code.',
    testParams: ['Fire assay cupellation', 'XRF spectrometry', '6-digit laser inscription']
  }
];

export const TESTING_LABS: Lab[] = [
  {
    id: 'lab-1',
    name: 'National Test House (Southern Region)',
    location: 'Taramani, Chennai, Tamil Nadu',
    distance: '4.8 km away',
    accreditation: 'NABL & BIS Recognized',
    scope: ['Motorcycle Helmets (IS 4151)', 'Stainless Steel Flasks (IS 17803)', 'Cables & Wires'],
    contact: '+91 44 2254 1234'
  },
  {
    id: 'lab-2',
    name: 'Central Electrochemical Research Institute (CSIR-CECRI)',
    location: 'CSIR Campus, Taramani, Chennai',
    distance: '5.2 km away',
    accreditation: 'BIS Recognized Lab',
    scope: ['Lithium Ion Batteries (IS 16046)', 'Metal Corrosion Testing'],
    contact: '+91 44 2254 2061'
  },
  {
    id: 'lab-3',
    name: 'TUV SUD South Asia Accredited Laboratory',
    location: 'Ambattur Industrial Estate, Chennai',
    distance: '14.2 km away',
    accreditation: 'NABL ISO/IEC 17025',
    scope: ['Electrical Appliances (IS 302)', 'Plugs & Sockets (IS 1293)', 'Mechanical Toys'],
    contact: '+91 44 4296 5555'
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

export const CATEGORIES = [
  { id: 'cat-auto', name: 'Speed & helmets', count: 14, icon: 'Car' },
  { id: 'cat-safety', name: 'Safety gear & PPE', count: 8, icon: 'Shield' },
  { id: 'cat-elec', name: 'Electrical & plugs', count: 24, icon: 'Zap' },
  { id: 'cat-food', name: 'Food & water safety', count: 16, icon: 'Coffee' }
];

export const TODAYS_BRIEF = [
  {
    id: 'brief-1',
    title: 'New QCO Enforced: Stainless Steel Cookware & Bottles',
    description: 'DPIIT mandates ISI certification under IS 17803:2022. Non-ISI production prohibited across India.',
    date: 'as on 24-Sep-2024',
    source: 'DPIIT Central Gazette'
  },
  {
    id: 'brief-2',
    title: 'IS 4151 Helmet Visor & Chin-Strap Amendment',
    description: 'Updated micro-slip endurance thresholds and scratch resistance test criteria notified.',
    date: 'as on 20-Sep-2024',
    source: 'BIS Transport Division'
  },
  {
    id: 'brief-3',
    title: '100% 6-Digit HUID Hallmarking Mandate',
    description: 'Sale of gold jewellery without 6-digit alphanumeric HUID code strictly prohibited in 343 districts.',
    date: 'as on 18-Sep-2024',
    source: 'Consumer Affairs'
  }
];
