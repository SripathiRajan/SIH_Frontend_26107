import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Settings,
  ChevronRight,
  Phone,
  Mail,
  FileText,
  ArrowUpRight,
} from 'lucide-react-native';

// ─── Data ─────────────────────────────────────────────────────────────────────
const COMPANY_INFO = {
  name: 'Apex Safety Gear & Flasks Pvt. Ltd.',
  udyam: 'UDYAM-TN-02-0049281',
  category: 'MSME Manufacturing',
  status: 'Active BIS Licensee',
  signatory: 'Sripathi (Managing Director)',
  address: 'Plot 42, SIDCO Guindy, Chennai - 600 032, Tamil Nadu',
  complianceScore: 96,
};

const LICENSES = [
  {
    id: 'lic-1',
    cmNumber: 'CM/L-8472910',
    product: 'Protective Helmets for Two-Wheeler Motorcyclists',
    standard: 'IS 4151:2015',
    scheme: 'Scheme-I (ISI Mark)',
    brand: 'APEX-SHIELD',
    validTill: '31-Dec-2027',
    factory: 'Plot 42, SIDCO Guindy, Chennai',
    labClearance: 'NTH Chennai (Oct 2024)',
    nextAudit: '18-Nov-2024',
  },
  {
    id: 'lic-2',
    cmNumber: 'CM/L-9104823',
    product: 'Stainless Steel Flasks & Water Bottles',
    standard: 'IS 17803:2022',
    scheme: 'Scheme-I (ISI Mark)',
    brand: 'APEX-PURE',
    validTill: '15-Oct-2026',
    factory: 'Unit-B, SIDCO Guindy, Chennai',
    labClearance: 'CSIR-CECRI (Dec 2023)',
    nextAudit: '02-Jan-2025',
  },
];

const AUDIT_STEPS = [
  { title: 'Initial Application & Scrutiny', date: 'Nov 2021', status: 'Completed' },
  { title: 'Factory Technical Inspection', date: 'Dec 2021', status: 'Completed' },
  { title: 'NTH Sample Testing Clearance', date: 'Jan 2022', status: 'Completed' },
  { title: 'ISI Mark License Grant', date: 'Jan 2022', status: 'Completed' },
  { title: 'Annual Surveillance Audit', date: '18-Nov-2024', status: 'Upcoming (54 Days)' },
  { title: 'License Renewal Cycle', date: '31-Dec-2027', status: 'Scheduled' },
];

const BIS_OFFICER = {
  name: 'Shri K. Ramachandran',
  title: 'Scientific Officer (Gr. I)',
  dept: 'Bureau of Indian Standards · CNBO',
  office: 'Chennai Branch Office, CIT Campus, Taramani',
  phone: '+91 44 2254 1234',
  email: 'bo-chennai@bis.gov.in',
  hours: 'Mon - Fri · 09:30 AM - 05:30 PM',
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'licenses' | 'audit' | 'officer'>('licenses');
  const [expandedLic, setExpandedLic] = useState<string | null>('lic-1');

  const openPhone = (tel: string) => {
    Linking.openURL(`tel:${tel}`).catch(() => {});
  };

  const openEmail = (mail: string) => {
    Linking.openURL(`mailto:${mail}`).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.screenTitle}>Enterprise Credentials</Text>
          <Text style={styles.screenSubtitle}>BIS Licensee Registry & Compliance Records</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => router.push('/settings')}
          activeOpacity={0.7}
          accessibilityLabel="Settings"
        >
          <Settings size={18} color="#475569" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Enterprise Profile Card (Clean typography, no toy icon boxes or emoji pills) */}
        <View style={styles.enterpriseCard}>
          <View style={styles.titleSection}>
            <Text style={styles.companyName}>{COMPANY_INFO.name}</Text>
            <Text style={styles.companySub}>
              {COMPANY_INFO.udyam}  ·  {COMPANY_INFO.category}
            </Text>
            <Text style={styles.statusText}>
              Status: {COMPANY_INFO.status}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Authorized Signatory</Text>
              <Text style={styles.infoValue}>{COMPANY_INFO.signatory}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Factory Premises</Text>
              <Text style={styles.infoValue}>{COMPANY_INFO.address}</Text>
            </View>
          </View>

          {/* Clean Metric Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricNum}>{COMPANY_INFO.complianceScore}/100</Text>
              <Text style={styles.metricText}>Audit Score</Text>
            </View>
            <View style={styles.metricSeparator} />
            <View style={styles.metricItem}>
              <Text style={styles.metricNum}>2</Text>
              <Text style={styles.metricText}>Active Licenses</Text>
            </View>
            <View style={styles.metricSeparator} />
            <View style={styles.metricItem}>
              <Text style={styles.metricNum}>18-Nov-2024</Text>
              <Text style={styles.metricText}>Next Surveillance</Text>
            </View>
          </View>
        </View>

        {/* Clean Segmented Control (Text-only, no emoji-like icons) */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'licenses' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('licenses')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, activeTab === 'licenses' && styles.segmentTextActive]}>
              Licenses ({LICENSES.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'audit' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('audit')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, activeTab === 'audit' && styles.segmentTextActive]}>
              Audit & Visits
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'officer' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('officer')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, activeTab === 'officer' && styles.segmentTextActive]}>
              BIS Officer
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Licenses */}
        {activeTab === 'licenses' && (
          <View style={styles.tabContent}>
            {LICENSES.map((lic) => {
              const isExpanded = expandedLic === lic.id;
              return (
                <View key={lic.id} style={styles.licenseCard}>
                  <TouchableOpacity
                    style={styles.licenseHeader}
                    onPress={() => setExpandedLic(isExpanded ? null : lic.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.licenseMain}>
                      <Text style={styles.schemeLabel}>{lic.scheme}</Text>
                      <Text style={styles.licenseCode}>{lic.cmNumber}</Text>
                      <Text style={styles.productTitle}>{lic.product}</Text>
                      <Text style={styles.standardMeta}>{lic.standard} · Brand: {lic.brand}</Text>
                    </View>
                    <View style={styles.licenseSide}>
                      <Text style={styles.validUntilText}>Valid till {lic.validTill}</Text>
                      <ChevronRight
                        size={16}
                        color="#64748B"
                        style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
                      />
                    </View>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.licenseExpanded}>
                      <View style={styles.divider} />
                      <View style={styles.detailLine}>
                        <Text style={styles.detailKey}>Factory Unit</Text>
                        <Text style={styles.detailVal}>{lic.factory}</Text>
                      </View>
                      <View style={styles.detailLine}>
                        <Text style={styles.detailKey}>Lab Clearance</Text>
                        <Text style={styles.detailVal}>{lic.labClearance}</Text>
                      </View>
                      <View style={styles.detailLine}>
                        <Text style={styles.detailKey}>Surveillance Visit</Text>
                        <Text style={[styles.detailVal, { color: '#0F172A', fontWeight: '700' }]}>
                          {lic.nextAudit}
                        </Text>
                      </View>

                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          style={styles.primaryBtn}
                          onPress={() => router.push('/vault')}
                          activeOpacity={0.8}
                        >
                          <FileText size={14} color="#FFFFFF" />
                          <Text style={styles.primaryBtnText}>View License Certificate</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.secondaryBtn}
                          onPress={() => router.push('/(tabs)/standards')}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.secondaryBtnText}>Standard Specifications</Text>
                          <ArrowUpRight size={14} color="#0F172A" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Tab 2: Audit & Visits */}
        {activeTab === 'audit' && (
          <View style={styles.tabContent}>
            {/* Notice */}
            <View style={styles.auditNotice}>
              <Text style={styles.auditNoticeTitle}>Next Audit: 18-Nov-2024</Text>
              <Text style={styles.auditNoticeDesc}>
                Surveillance inspection for IS 4151 (Two-Wheeler Helmets) scheduled by CNBO.
                Maintain test logs and factory calibration registers in the Document Vault.
              </Text>
              <TouchableOpacity
                style={styles.auditNoticeBtn}
                onPress={() => router.push('/vault')}
                activeOpacity={0.8}
              >
                <Text style={styles.auditNoticeBtnText}>Prepare Audit Documents</Text>
                <ChevronRight size={14} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {/* Stepper list */}
            <View style={styles.lifecycleCard}>
              <Text style={styles.lifecycleTitle}>Compliance Lifecycle</Text>
              {AUDIT_STEPS.map((step, idx) => (
                <View key={idx} style={styles.lifecycleRow}>
                  <View style={styles.stepNumBox}>
                    <Text style={styles.stepNumText}>{idx + 1}</Text>
                  </View>
                  <View style={styles.stepDetail}>
                    <Text style={styles.stepName}>{step.title}</Text>
                    <Text style={styles.stepSub}>{step.date} · {step.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Tab 3: BIS Officer */}
        {activeTab === 'officer' && (
          <View style={styles.tabContent}>
            <View style={styles.officerCard}>
              <Text style={styles.officerName}>{BIS_OFFICER.name}</Text>
              <Text style={styles.officerRole}>{BIS_OFFICER.title}</Text>
              <Text style={styles.officerDept}>{BIS_OFFICER.dept}</Text>

              <View style={styles.divider} />

              <View style={styles.detailLine}>
                <Text style={styles.detailKey}>Branch Office</Text>
                <Text style={styles.detailVal}>{BIS_OFFICER.office}</Text>
              </View>
              <View style={styles.detailLine}>
                <Text style={styles.detailKey}>Office Hours</Text>
                <Text style={styles.detailVal}>{BIS_OFFICER.hours}</Text>
              </View>

              <View style={styles.officerActionRow}>
                <TouchableOpacity
                  style={styles.officerBtn}
                  onPress={() => openPhone(BIS_OFFICER.phone)}
                  activeOpacity={0.8}
                >
                  <Phone size={14} color="#0F172A" />
                  <Text style={styles.officerBtnText}>{BIS_OFFICER.phone}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.officerBtn}
                  onPress={() => openEmail(BIS_OFFICER.email)}
                  activeOpacity={0.8}
                >
                  <Mail size={14} color="#0F172A" />
                  <Text style={styles.officerBtnText}>Email Branch</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.jurisdictionBox}>
              <Text style={styles.jurisdictionText}>
                Jurisdiction assigned according to registered factory location at SIDCO Guindy, Chennai.
                All audit documentation must be authenticated by the Chennai Branch Office.
              </Text>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Stylesheet ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  screenSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  // Enterprise Card
  enterpriseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  titleSection: {
    gap: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 22,
  },
  companySub: {
    fontSize: 12,
    color: '#475569',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  infoGrid: {
    gap: 8,
  },
  infoRow: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginTop: 4,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  metricNum: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  metricSeparator: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },

  // Segmented Control
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    padding: 3,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  segmentTextActive: {
    fontWeight: '800',
    color: '#0F172A',
  },

  // Tab Content
  tabContent: {
    gap: 12,
  },

  // License Card
  licenseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  licenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  licenseMain: {
    flex: 1,
    gap: 3,
  },
  schemeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
  },
  licenseCode: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: 'monospace',
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 2,
    lineHeight: 18,
  },
  standardMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  licenseSide: {
    alignItems: 'flex-end',
    gap: 8,
  },
  validUntilText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#047857',
  },
  licenseExpanded: {
    gap: 8,
    marginTop: 4,
  },
  detailLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  detailKey: {
    fontSize: 11,
    color: '#64748B',
  },
  detailVal: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  primaryBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 9,
  },
  primaryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Audit Tab
  auditNotice: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  auditNoticeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  auditNoticeDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  auditNoticeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  auditNoticeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  lifecycleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 12,
  },
  lifecycleTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  lifecycleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  stepNumBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  stepDetail: {
    flex: 1,
    gap: 1,
  },
  stepName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepSub: {
    fontSize: 11,
    color: '#64748B',
  },

  // Officer Tab
  officerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 6,
  },
  officerName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  officerRole: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  officerDept: {
    fontSize: 11,
    color: '#64748B',
  },
  officerActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  officerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  officerBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  jurisdictionBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
  },
  jurisdictionText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
});
