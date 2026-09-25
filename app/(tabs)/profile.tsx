import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Building2,
  Settings,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Award,
  Calendar,
  Phone,
  Mail,
  FileText,
  Clock,
  Zap,
  TrendingUp,
  Lock,
  RefreshCw,
  ExternalLink,
  BadgeCheck,
  Layers,
} from 'lucide-react-native';

// ─── Data ─────────────────────────────────────────────────────────────────────
const LICENSES = [
  {
    id: 'lic-1',
    cmNumber: 'CM/L-8472910',
    product: 'Protective Helmets for Two-Wheeler Motorcyclists',
    brand: 'APEX-SHIELD',
    standard: 'IS 4151:2015 (Amd 3 - 2021)',
    scheme: 'Scheme-I (ISI Mark)',
    grantedOn: '01-Jan-2022',
    validTill: '31-Dec-2027',
    status: 'Active',
    factory: 'Plot 42, SIDCO Guindy',
    labClearance: 'NTH Chennai 2024',
    nextSurveillance: '18-Nov-2024',
    daysLeft: 1188,
  },
  {
    id: 'lic-2',
    cmNumber: 'CM/L-9104823',
    product: 'Stainless Steel Flasks & Water Bottles',
    brand: 'APEX-PURE',
    standard: 'IS 17803:2022',
    scheme: 'Scheme-I (ISI Mark)',
    grantedOn: '15-Mar-2023',
    validTill: '15-Oct-2026',
    status: 'Active',
    factory: 'Unit-B, SIDCO Guindy',
    labClearance: 'CSIR-CECRI 2023',
    nextSurveillance: '02-Jan-2025',
    daysLeft: 385,
  },
];

const AUDIT_TIMELINE = [
  { label: 'Application Filed', date: '12-Nov-2021', done: true, upcoming: false },
  { label: 'Factory Inspection', date: '10-Dec-2021', done: true, upcoming: false },
  { label: 'Sample Testing (NTH)', date: '05-Jan-2022', done: true, upcoming: false },
  { label: 'License Granted', date: '01-Jan-2022', done: true, upcoming: false },
  { label: 'Surveillance Visit 1', date: '18-Nov-2024', done: false, upcoming: true },
  { label: 'License Renewal', date: '31-Dec-2027', done: false, upcoming: false },
];

const BIS_OFFICER = {
  name: 'Shri K. Ramachandran',
  designation: 'Scientific Officer (Gr. I)',
  office: 'Chennai Branch Office (CNBO)',
  address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600 113',
  phone: '+91 44 2254 1234',
  email: 'bo-chennai@bis.gov.in',
};

// ─── ComplianceRing ───────────────────────────────────────────────────────────
function ComplianceRing({ score }: { score: number }) {
  return (
    <View style={ring.container}>
      <View style={ring.outer}>
        <View style={ring.inner}>
          <Text style={ring.score}>{score}</Text>
          <Text style={ring.label}>/ 100</Text>
        </View>
      </View>
      <Text style={ring.tag}>Compliance</Text>
      <Text style={ring.tag}>Score</Text>
    </View>
  );
}

const ring = StyleSheet.create({
  container: { alignItems: 'center', gap: 4 },
  outer: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: '#ECFDF5', borderWidth: 4, borderColor: '#0D9488',
    alignItems: 'center', justifyContent: 'center',
  },
  inner: { alignItems: 'center' },
  score: { fontSize: 22, fontWeight: '900', color: '#0D9488' },
  label: { fontSize: 9, color: '#047857', fontWeight: '700' },
  tag: { fontSize: 10, fontWeight: '700', color: '#047857', lineHeight: 13 },
});

// ─── SectionHeader ────────────────────────────────────────────────────────────
function SectionHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <View style={sh.row}>
      <View style={sh.iconBox}>{icon}</View>
      <Text style={sh.text}>{title}</Text>
    </View>
  );
}

const sh = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  iconBox: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center',
  },
  text: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
});

// ─── DetailRow ────────────────────────────────────────────────────────────────
function DetailRow({ label, value, mono, accent }: {
  label: string; value: string; mono?: boolean; accent?: boolean;
}) {
  return (
    <View style={dr.wrap}>
      <Text style={dr.label}>{label}</Text>
      <Text style={[dr.value, mono && dr.valueMono, accent && dr.valueAccent]}>
        {value}
      </Text>
    </View>
  );
}

const dr = StyleSheet.create({
  wrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  label: { fontSize: 11, color: '#64748B', flex: 1 },
  value: { fontSize: 11, fontWeight: '700', color: '#0F172A', flex: 1.2, textAlign: 'right' },
  valueMono: { fontFamily: 'monospace', color: '#1E1B4B' },
  valueAccent: { color: '#D97706' },
});

// ─── LicenseCard ─────────────────────────────────────────────────────────────
function LicenseCard({ lic, expanded, onToggle }: {
  lic: typeof LICENSES[0]; expanded: boolean; onToggle: () => void;
}) {
  const warn = lic.daysLeft < 400;
  return (
    <TouchableOpacity
      style={[lc.card, expanded && lc.cardExpanded]}
      activeOpacity={0.85}
      onPress={onToggle}
    >
      <View style={lc.headerRow}>
        <View style={lc.cmBox}>
          <Text style={lc.cmNum}>{lic.cmNumber}</Text>
          <Text style={lc.product} numberOfLines={expanded ? 2 : 1}>{lic.product}</Text>
        </View>
        <View style={lc.rightCol}>
          <View style={lc.activePill}>
            <View style={lc.dot} />
            <Text style={lc.activeText}>ACTIVE</Text>
          </View>
        </View>
      </View>

      <View style={lc.pillRow}>
        <View style={lc.schemePill}>
          <Text style={lc.schemePillText}>{lic.scheme}</Text>
        </View>
        <View style={[lc.datePill, warn && lc.datePillWarn]}>
          <Clock size={10} color={warn ? '#92400E' : '#475569'} />
          <Text style={[lc.datePillText, warn && lc.datePillTextWarn]}>
            Valid till {lic.validTill}
          </Text>
        </View>
      </View>

      {expanded && (
        <View style={lc.detailsBox}>
          <View style={lc.divider} />
          <DetailRow label="Brand Name" value={lic.brand} mono />
          <DetailRow label="Standard" value={lic.standard} />
          <DetailRow label="Factory Unit" value={lic.factory} />
          <DetailRow label="Granted On" value={lic.grantedOn} />
          <DetailRow label="Lab Clearance" value={lic.labClearance} />
          <DetailRow label="Next Surveillance" value={lic.nextSurveillance} accent />
          <TouchableOpacity style={lc.downloadBtn} activeOpacity={0.8}>
            <FileText size={13} color="#4338CA" />
            <Text style={lc.downloadText}>Download License Certificate (PDF)</Text>
            <ExternalLink size={12} color="#4338CA" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const lc = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 20, padding: 16, gap: 10,
    shadowColor: '#1E1B4B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardExpanded: { borderColor: '#C7D2FE', backgroundColor: '#FAFBFF' },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  cmBox: { flex: 1, gap: 2 },
  cmNum: { fontSize: 15, fontWeight: '800', color: '#1E1B4B', fontFamily: 'monospace' },
  product: { fontSize: 11, color: '#64748B', marginTop: 2, lineHeight: 16 },
  rightCol: { alignItems: 'center', gap: 6 },
  activePill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#ECFDF5', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
  },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#10B981' },
  activeText: { fontSize: 9, fontWeight: '800', color: '#047857' },
  pillRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  schemePill: { backgroundColor: '#EEF2FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  schemePillText: { fontSize: 10, fontWeight: '700', color: '#3730A3' },
  datePill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  datePillWarn: { backgroundColor: '#FEF3C7' },
  datePillText: { fontSize: 10, fontWeight: '600', color: '#475569' },
  datePillTextWarn: { color: '#92400E' },
  detailsBox: { gap: 2 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 6 },
  downloadBtn: {
    marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#EEF2FF', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 9,
    borderWidth: 1, borderColor: '#C7D2FE',
  },
  downloadText: { flex: 1, fontSize: 11, fontWeight: '700', color: '#3730A3' },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const router = useRouter();
  const [expandedLic, setExpandedLic] = useState<string | null>('lic-1');

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topBarTitle}>Enterprise Credentials</Text>
          <Text style={styles.topBarSub}>Bureau of Indian Standards · Licensee Registry</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => router.push('/settings')}
          activeOpacity={0.7}
        >
          <Settings size={18} color="#334155" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* 1. OFFICIAL IDENTITY CARD */}
        <View style={styles.idCard}>
          <View style={styles.idCardStripe}>
            <ShieldCheck size={13} color="#FFFFFF" />
            <Text style={styles.idCardStripeText}>OFFICIAL BIS LICENSEE  ·  INDIA</Text>
            <BadgeCheck size={13} color="#2DD4BF" />
          </View>
          <View style={styles.idCardBody}>
            <View style={styles.idCardTop}>
              <View style={styles.companyLogo}>
                <Building2 size={26} color="#312E81" />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={styles.udyamRow}>
                  <Text style={styles.udyamLabel}>UDYAM</Text>
                  <Text style={styles.udyamNum}>TN-02-0049281</Text>
                  <View style={styles.verifiedChip}>
                    <CheckCircle2 size={10} color="#047857" />
                    <Text style={styles.verifiedText}>Verified MSME</Text>
                  </View>
                </View>
                <Text style={styles.companyName}>Apex Safety Gear & Flasks Pvt. Ltd.</Text>
                <Text style={styles.signatoryText}>Auth. Signatory: Sripathinathan R. (MD)</Text>
                <View style={styles.addressRow}>
                  <MapPin size={11} color="#64748B" />
                  <Text style={styles.addressText}>Plot 42, SIDCO Guindy, Chennai - 600032, TN</Text>
                </View>
              </View>
            </View>
            <View style={styles.idDivider} />
            <View style={styles.idStatsRow}>
              <ComplianceRing score={96} />
              <View style={styles.idStatDivider} />
              <View style={styles.idStatCol}>
                <Text style={styles.idStatNum}>2</Text>
                <Text style={styles.idStatLabel}>Active CM/L</Text>
                <Text style={styles.idStatSub}>ISI Scheme-I</Text>
              </View>
              <View style={styles.idStatDivider} />
              <View style={styles.idStatCol}>
                <Text style={[styles.idStatNum, { color: '#4338CA' }]}>3</Text>
                <Text style={styles.idStatLabel}>Vault Docs</Text>
                <Text style={styles.idStatSub}>OCR Verified</Text>
              </View>
              <View style={styles.idStatDivider} />
              <View style={styles.idStatCol}>
                <Text style={[styles.idStatNum, { color: '#D97706' }]}>18-Nov</Text>
                <Text style={styles.idStatLabel}>Next Audit</Text>
                <Text style={styles.idStatSub}>CNBO Visit</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. ACTIVE LICENSES */}
        <View style={styles.section}>
          <SectionHeader
            title="Active Product Certifications"
            icon={<Award size={15} color="#4338CA" />}
          />
          {LICENSES.map((lic) => (
            <LicenseCard
              key={lic.id}
              lic={lic}
              expanded={expandedLic === lic.id}
              onToggle={() => setExpandedLic(expandedLic === lic.id ? null : lic.id)}
            />
          ))}
        </View>

        {/* 3. TIMELINE */}
        <View style={styles.section}>
          <SectionHeader
            title="License Lifecycle Timeline"
            icon={<TrendingUp size={15} color="#4338CA" />}
          />
          <View style={styles.timelineCard}>
            {AUDIT_TIMELINE.map((step, idx) => (
              <View key={idx} style={styles.timelineRow}>
                <View style={styles.timelineConnectorCol}>
                  <View style={[
                    styles.timelineDot,
                    step.done && styles.timelineDotDone,
                    step.upcoming && styles.timelineDotUpcoming,
                  ]}>
                    {step.done && <CheckCircle2 size={12} color="#FFFFFF" />}
                    {step.upcoming && <Clock size={12} color="#D97706" />}
                  </View>
                  {idx < AUDIT_TIMELINE.length - 1 && (
                    <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineLabel, step.upcoming && styles.timelineLabelUpcoming]}>
                    {step.label}
                  </Text>
                  <Text style={[styles.timelineDate, step.upcoming && styles.timelineDateUpcoming]}>
                    {step.date}
                  </Text>
                </View>
                {step.upcoming && (
                  <View style={styles.upcomingChip}>
                    <Text style={styles.upcomingChipText}>UPCOMING</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* 4. BIS OFFICER */}
        <View style={styles.section}>
          <SectionHeader
            title="Assigned BIS Surveillance Officer"
            icon={<Layers size={15} color="#4338CA" />}
          />
          <View style={styles.officerCard}>
            <View style={styles.officerAvatarRow}>
              <View style={styles.officerAvatar}>
                <Text style={styles.officerAvatarText}>KR</Text>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.officerName}>{BIS_OFFICER.name}</Text>
                <Text style={styles.officerDesig}>{BIS_OFFICER.designation}</Text>
                <Text style={styles.officerOffice}>{BIS_OFFICER.office}</Text>
              </View>
            </View>
            <View style={styles.officerAddress}>
              <MapPin size={11} color="#64748B" />
              <Text style={styles.officerAddressText}>{BIS_OFFICER.address}</Text>
            </View>
            <View style={styles.officerContactRow}>
              <TouchableOpacity style={styles.officerContactBtn}>
                <Phone size={13} color="#1E1B4B" />
                <Text style={styles.officerContactText}>{BIS_OFFICER.phone}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.officerContactBtn}>
                <Mail size={13} color="#1E1B4B" />
                <Text style={styles.officerContactText}>{BIS_OFFICER.email}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 5. AUDIT COUNTDOWN */}
        <View style={styles.auditBanner}>
          <View style={styles.auditBannerLeft}>
            <Calendar size={20} color="#D97706" />
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={styles.auditBannerTitle}>Surveillance Visit in 54 days</Text>
              <Text style={styles.auditBannerSub}>
                CNBO officer will draw samples of IS 4151 helmets on 18-Nov-2024.
                Ensure production records and lab reports are ready.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.auditCTA} onPress={() => router.push('/vault')}>
            <Text style={styles.auditCTAText}>Prepare Vault</Text>
            <ChevronRight size={14} color="#92400E" />
          </TouchableOpacity>
        </View>

        {/* 6. DPDP ACT */}
        <View style={styles.dpdpCard}>
          <View style={styles.dpdpHeader}>
            <Lock size={15} color="#4338CA" />
            <Text style={styles.dpdpTitle}>Data Privacy · DPDP Act 2023</Text>
          </View>
          <Text style={styles.dpdpBody}>
            Your enterprise data (Udyam ID, CM/L numbers, factory details) is processed
            solely for BIS compliance under the Digital Personal Data Protection Act 2023.
            Data is encrypted at rest and not shared with third-party advertisers.
          </Text>
          <View style={styles.dpdpRow}>
            <View style={styles.dpdpChip}>
              <Zap size={10} color="#4338CA" />
              <Text style={styles.dpdpChipText}>AES-256 Encrypted</Text>
            </View>
            <View style={styles.dpdpChip}>
              <RefreshCw size={10} color="#4338CA" />
              <Text style={styles.dpdpChipText}>Auto-purge on Deletion</Text>
            </View>
          </View>
        </View>

        {/* 7. SETTINGS */}
        <TouchableOpacity
          style={styles.settingsCard}
          onPress={() => router.push('/settings')}
          activeOpacity={0.85}
        >
          <View style={styles.settingsCardLeft}>
            <View style={styles.settingsIconBox}>
              <Settings size={20} color="#4338CA" />
            </View>
            <View style={{ gap: 2 }}>
              <Text style={styles.settingsCardTitle}>App Preferences & Privacy Settings</Text>
              <Text style={styles.settingsCardSub}>
                Languages (Tamil / Tanglish), QCO push alerts, data consent
              </Text>
            </View>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Main Styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F4F8' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 22, paddingVertical: 14,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
  },
  topBarTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  topBarSub: { fontSize: 11, color: '#64748B', marginTop: 1 },
  settingsBtn: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0',
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { padding: 18, paddingBottom: 48, gap: 20 },
  section: { gap: 12 },

  // Identity Card
  idCard: {
    borderRadius: 22, overflow: 'hidden',
    shadowColor: '#1E1B4B', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10, shadowRadius: 16, elevation: 5, backgroundColor: '#FFFFFF',
  },
  idCardStripe: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#1E1B4B', paddingHorizontal: 16, paddingVertical: 8,
  },
  idCardStripeText: {
    flex: 1, fontSize: 10, fontWeight: '800', color: '#A5B4FC', letterSpacing: 1.2,
  },
  idCardBody: { padding: 18, gap: 14 },
  idCardTop: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  companyLogo: {
    width: 54, height: 54, borderRadius: 16,
    backgroundColor: '#EEF2FF', borderWidth: 1.5, borderColor: '#C7D2FE',
    alignItems: 'center', justifyContent: 'center',
  },
  udyamRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  udyamLabel: { fontSize: 9, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.5 },
  udyamNum: { fontSize: 10, fontWeight: '800', color: '#4338CA', letterSpacing: 0.4 },
  verifiedChip: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#ECFDF5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  verifiedText: { fontSize: 9, fontWeight: '800', color: '#047857' },
  companyName: { fontSize: 14, fontWeight: '800', color: '#0F172A', lineHeight: 20 },
  signatoryText: { fontSize: 11, color: '#64748B' },
  addressRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 4, marginTop: 2 },
  addressText: { fontSize: 10, color: '#94A3B8', flex: 1, lineHeight: 14 },
  idDivider: { height: 1, backgroundColor: '#F1F5F9' },
  idStatsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  idStatDivider: { width: 1, height: 50, backgroundColor: '#E2E8F0' },
  idStatCol: { flex: 1, alignItems: 'center', gap: 2 },
  idStatNum: { fontSize: 17, fontWeight: '900', color: '#1E1B4B' },
  idStatLabel: { fontSize: 9, fontWeight: '700', color: '#64748B', textAlign: 'center' },
  idStatSub: { fontSize: 8, color: '#94A3B8' },

  // Audit Banner
  auditBanner: {
    backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#FDE68A',
    borderRadius: 18, padding: 16, gap: 12,
  },
  auditBannerLeft: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  auditBannerTitle: { fontSize: 13, fontWeight: '800', color: '#78350F' },
  auditBannerSub: { fontSize: 11, color: '#92400E', lineHeight: 16, marginTop: 2 },
  auditCTA: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
    backgroundColor: '#FFFFFF', borderRadius: 10, paddingVertical: 9,
    borderWidth: 1, borderColor: '#FDE68A',
  },
  auditCTAText: { fontSize: 12, fontWeight: '800', color: '#92400E' },

  // Officer Card
  officerCard: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 20, padding: 16, gap: 12,
    shadowColor: '#1E1B4B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 6, elevation: 1,
  },
  officerAvatarRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  officerAvatar: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: '#EEF2FF', borderWidth: 1.5, borderColor: '#C7D2FE',
    alignItems: 'center', justifyContent: 'center',
  },
  officerAvatarText: { fontSize: 14, fontWeight: '800', color: '#3730A3' },
  officerName: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  officerDesig: { fontSize: 11, fontWeight: '600', color: '#4338CA' },
  officerOffice: { fontSize: 11, color: '#64748B' },
  officerAddress: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    backgroundColor: '#F8FAFC', padding: 10, borderRadius: 10,
    borderWidth: 1, borderColor: '#F1F5F9',
  },
  officerAddressText: { flex: 1, fontSize: 11, color: '#475569', lineHeight: 16 },
  officerContactRow: { gap: 6 },
  officerContactBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 7, paddingHorizontal: 10,
    backgroundColor: '#F8FAFC', borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0',
  },
  officerContactText: { fontSize: 12, fontWeight: '600', color: '#1E1B4B' },

  // Timeline
  timelineCard: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 20, padding: 16,
    shadowColor: '#1E1B4B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 6, elevation: 1,
  },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, minHeight: 48 },
  timelineConnectorCol: { alignItems: 'center', width: 22 },
  timelineDot: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: '#E2E8F0',
    alignItems: 'center', justifyContent: 'center',
  },
  timelineDotDone: { backgroundColor: '#0D9488' },
  timelineDotUpcoming: { backgroundColor: '#FEF3C7', borderWidth: 2, borderColor: '#D97706' },
  timelineLine: {
    width: 2, flex: 1, minHeight: 24, backgroundColor: '#E2E8F0', marginVertical: 2,
  },
  timelineLineDone: { backgroundColor: '#0D9488' },
  timelineContent: { flex: 1, paddingTop: 2, paddingBottom: 12, gap: 2 },
  timelineLabel: { fontSize: 12, fontWeight: '700', color: '#334155' },
  timelineLabelUpcoming: { color: '#92400E' },
  timelineDate: { fontSize: 11, color: '#94A3B8' },
  timelineDateUpcoming: { color: '#D97706', fontWeight: '600' },
  upcomingChip: {
    backgroundColor: '#FEF3C7', paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: 6, alignSelf: 'flex-start', marginTop: 2,
  },
  upcomingChipText: { fontSize: 8, fontWeight: '800', color: '#92400E', letterSpacing: 0.5 },

  // DPDP
  dpdpCard: {
    backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#C7D2FE',
    borderRadius: 18, padding: 16, gap: 10,
  },
  dpdpHeader: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  dpdpTitle: { fontSize: 13, fontWeight: '800', color: '#3730A3' },
  dpdpBody: { fontSize: 11, color: '#4338CA', lineHeight: 17 },
  dpdpRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  dpdpChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFFFFF',
    paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8,
    borderWidth: 1, borderColor: '#C7D2FE',
  },
  dpdpChipText: { fontSize: 10, fontWeight: '700', color: '#3730A3' },

  // Settings Card
  settingsCard: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 18, padding: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#1E1B4B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 6, elevation: 1,
  },
  settingsCardLeft: {
    flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1, marginRight: 8,
  },
  settingsIconBox: {
    width: 42, height: 42, borderRadius: 13,
    backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center',
  },
  settingsCardTitle: { fontSize: 13, fontWeight: '800', color: '#0F172A' },
  settingsCardSub: { fontSize: 11, color: '#64748B', marginTop: 2, lineHeight: 16 },
});
