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
  ExternalLink,
  BadgeCheck,
  UserCheck,
  Layers,
  ArrowUpRight,
} from 'lucide-react-native';

// ─── Data Definitions ──────────────────────────────────────────────────────────
const COMPANY_INFO = {
  name: 'Apex Safety Gear & Flasks Pvt. Ltd.',
  udyam: 'UDYAM-TN-02-0049281',
  regType: 'Verified MSME (Manufacturing)',
  signatory: 'Sripathinathan R. (Managing Director)',
  address: 'Plot 42, SIDCO Guindy, Chennai - 600 032, Tamil Nadu',
  complianceScore: 96,
  status: 'Compliant & Active',
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
    status: 'Active',
    factory: 'Plot 42, SIDCO Guindy, Chennai',
    labClearance: 'NTH Chennai (Oct 2024)',
    nextAudit: '18-Nov-2024',
    daysLeft: 1188,
  },
  {
    id: 'lic-2',
    cmNumber: 'CM/L-9104823',
    product: 'Stainless Steel Flasks & Water Bottles',
    standard: 'IS 17803:2022',
    scheme: 'Scheme-I (ISI Mark)',
    brand: 'APEX-PURE',
    validTill: '15-Oct-2026',
    status: 'Active',
    factory: 'Unit-B, SIDCO Guindy, Chennai',
    labClearance: 'CSIR-CECRI (Dec 2023)',
    nextAudit: '02-Jan-2025',
    daysLeft: 385,
  },
];

const AUDIT_STEPS = [
  { title: 'Initial Application & Scrutiny', date: 'Nov 2021', completed: true },
  { title: 'Factory Technical Inspection', date: 'Dec 2021', completed: true },
  { title: 'NTH Sample Testing Clearance', date: 'Jan 2022', completed: true },
  { title: 'ISI Mark License Grant', date: 'Jan 2022', completed: true },
  { title: 'Annual Surveillance Audit (Upcoming)', date: '18-Nov-2024', completed: false, active: true },
  { title: 'License Renewal Cycle', date: '31-Dec-2027', completed: false },
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

// ─── Main Component ───────────────────────────────────────────────────────────
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
      {/* 1. Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Enterprise Credentials</Text>
          <Text style={styles.headerSubtitle}>BIS Licensee Registry & Compliance Profile</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsIconBtn}
          onPress={() => router.push('/settings')}
          activeOpacity={0.7}
          accessibilityLabel="Settings"
        >
          <Settings size={20} color="#334155" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 2. Enterprise Master Card */}
        <View style={styles.enterpriseCard}>
          <View style={styles.cardTopRow}>
            <View style={styles.logoBadge}>
              <Building2 size={24} color="#1E3A8A" />
            </View>
            <View style={styles.topInfo}>
              <View style={styles.statusBadgeRow}>
                <View style={styles.activePill}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeText}>ACTIVE LICENSEE</Text>
                </View>
                <View style={styles.msmePill}>
                  <BadgeCheck size={11} color="#059669" />
                  <Text style={styles.msmeText}>Verified MSME</Text>
                </View>
              </View>
              <Text style={styles.companyTitle}>{COMPANY_INFO.name}</Text>
              <Text style={styles.udyamCode}>{COMPANY_INFO.udyam}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <UserCheck size={12} color="#64748B" />
              <Text style={styles.metaText}>{COMPANY_INFO.signatory}</Text>
            </View>
            <View style={styles.metaItem}>
              <MapPin size={12} color="#64748B" />
              <Text style={styles.metaText} numberOfLines={1}>{COMPANY_INFO.address}</Text>
            </View>
          </View>

          {/* Quick Metrics Bar */}
          <View style={styles.metricsBar}>
            <View style={styles.metricCell}>
              <Text style={styles.metricValue}>96<Text style={styles.metricUnit}>/100</Text></Text>
              <Text style={styles.metricLabel}>Audit Score</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCell}>
              <Text style={styles.metricValue}>2</Text>
              <Text style={styles.metricLabel}>Active CM/L</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCell}>
              <Text style={[styles.metricValue, { color: '#B45309' }]}>18 Nov</Text>
              <Text style={styles.metricLabel}>Surveillance</Text>
            </View>
          </View>
        </View>

        {/* 3. Segmented Navigation Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'licenses' && styles.tabButtonActive]}
            onPress={() => setActiveTab('licenses')}
            activeOpacity={0.8}
          >
            <Award size={15} color={activeTab === 'licenses' ? '#1E3A8A' : '#64748B'} />
            <Text style={[styles.tabText, activeTab === 'licenses' && styles.tabTextActive]}>
              Licenses ({LICENSES.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'audit' && styles.tabButtonActive]}
            onPress={() => setActiveTab('audit')}
            activeOpacity={0.8}
          >
            <Clock size={15} color={activeTab === 'audit' ? '#1E3A8A' : '#64748B'} />
            <Text style={[styles.tabText, activeTab === 'audit' && styles.tabTextActive]}>
              Audit & Visits
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'officer' && styles.tabButtonActive]}
            onPress={() => setActiveTab('officer')}
            activeOpacity={0.8}
          >
            <Layers size={15} color={activeTab === 'officer' ? '#1E3A8A' : '#64748B'} />
            <Text style={[styles.tabText, activeTab === 'officer' && styles.tabTextActive]}>
              BIS Officer
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4. Tab Content: Licenses */}
        {activeTab === 'licenses' && (
          <View style={styles.tabSection}>
            {LICENSES.map((lic) => {
              const isExpanded = expandedLic === lic.id;
              return (
                <View key={lic.id} style={styles.licenseCard}>
                  {/* Header Row */}
                  <TouchableOpacity
                    style={styles.licenseHeader}
                    onPress={() => setExpandedLic(isExpanded ? null : lic.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.licenseHeaderLeft}>
                      <View style={styles.schemeTag}>
                        <ShieldCheck size={12} color="#1E3A8A" />
                        <Text style={styles.schemeTagText}>{lic.scheme}</Text>
                      </View>
                      <Text style={styles.licenseNum}>{lic.cmNumber}</Text>
                      <Text style={styles.productName}>{lic.product}</Text>
                    </View>
                    <View style={styles.licenseHeaderRight}>
                      <View style={styles.validityBadge}>
                        <Text style={styles.validityText}>Valid till {lic.validTill.split('-')[2]}</Text>
                      </View>
                      <ChevronRight
                        size={16}
                        color="#64748B"
                        style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Standard & Quick Tags */}
                  <View style={styles.tagRow}>
                    <View style={styles.standardPill}>
                      <Text style={styles.standardPillText}>{lic.standard}</Text>
                    </View>
                    <View style={styles.brandPill}>
                      <Text style={styles.brandPillText}>Brand: {lic.brand}</Text>
                    </View>
                  </View>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <View style={styles.expandedDetails}>
                      <View style={styles.detailDivider} />
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Factory Location</Text>
                        <Text style={styles.detailValue}>{lic.factory}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Latest Lab Clearance</Text>
                        <Text style={styles.detailValue}>{lic.labClearance}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Next Surveillance Audit</Text>
                        <Text style={[styles.detailValue, { color: '#B45309', fontWeight: '700' }]}>
                          {lic.nextAudit}
                        </Text>
                      </View>

                      {/* Action Buttons */}
                      <View style={styles.cardActionRow}>
                        <TouchableOpacity
                          style={styles.primaryActionBtn}
                          onPress={() => router.push('/vault')}
                          activeOpacity={0.8}
                        >
                          <FileText size={13} color="#FFFFFF" />
                          <Text style={styles.primaryActionText}>View Certificate (PDF)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.secondaryActionBtn}
                          onPress={() => router.push('/(tabs)/standards')}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.secondaryActionText}>Standard Details</Text>
                          <ArrowUpRight size={13} color="#1E3A8A" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* 5. Tab Content: Audit & Visits */}
        {activeTab === 'audit' && (
          <View style={styles.tabSection}>
            {/* Urgent Alert Banner */}
            <View style={styles.auditAlertCard}>
              <View style={styles.alertHeader}>
                <Calendar size={18} color="#B45309" />
                <Text style={styles.alertTitle}>Surveillance Audit: 18-Nov-2024</Text>
              </View>
              <Text style={styles.alertDesc}>
                Surveillance inspection for IS 4151 (Motorcycle Helmets) by Chennai Branch Office (CNBO).
                Keep calibration registers, batch testing sheets, and NTH test records accessible in the Document Vault.
              </Text>
              <TouchableOpacity
                style={styles.alertActionBtn}
                onPress={() => router.push('/vault')}
                activeOpacity={0.8}
              >
                <Text style={styles.alertActionText}>Open Vault for Audit Preparation</Text>
                <ChevronRight size={14} color="#92400E" />
              </TouchableOpacity>
            </View>

            {/* Stepper Timeline */}
            <View style={styles.timelineBox}>
              <Text style={styles.timelineBoxTitle}>Certification Lifecycle</Text>
              {AUDIT_STEPS.map((step, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.connectorCol}>
                    <View
                      style={[
                        styles.stepDot,
                        step.completed && styles.stepDotCompleted,
                        step.active && styles.stepDotActive,
                      ]}
                    >
                      {step.completed ? (
                        <CheckCircle2 size={12} color="#FFFFFF" />
                      ) : (
                        <Clock size={10} color={step.active ? '#B45309' : '#94A3B8'} />
                      )}
                    </View>
                    {idx < AUDIT_STEPS.length - 1 && (
                      <View
                        style={[
                          styles.stepLine,
                          step.completed && styles.stepLineCompleted,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.stepInfo}>
                    <Text
                      style={[
                        styles.stepTitle,
                        step.active && styles.stepTitleActive,
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text style={styles.stepDate}>{step.date}</Text>
                  </View>
                  {step.active && (
                    <View style={styles.upcomingPill}>
                      <Text style={styles.upcomingPillText}>IN 54 DAYS</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 6. Tab Content: BIS Officer */}
        {activeTab === 'officer' && (
          <View style={styles.tabSection}>
            <View style={styles.officerCard}>
              <View style={styles.officerHeader}>
                <View style={styles.officerAvatar}>
                  <Text style={styles.officerInitials}>KR</Text>
                </View>
                <View style={styles.officerMain}>
                  <Text style={styles.officerName}>{BIS_OFFICER.name}</Text>
                  <Text style={styles.officerTitle}>{BIS_OFFICER.title}</Text>
                  <Text style={styles.officerDept}>{BIS_OFFICER.dept}</Text>
                </View>
              </View>

              <View style={styles.officerInfoRow}>
                <MapPin size={13} color="#64748B" />
                <Text style={styles.officerInfoText}>{BIS_OFFICER.office}</Text>
              </View>

              <View style={styles.officerInfoRow}>
                <Clock size={13} color="#64748B" />
                <Text style={styles.officerInfoText}>{BIS_OFFICER.hours}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.contactRow}>
                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => openPhone(BIS_OFFICER.phone)}
                  activeOpacity={0.8}
                >
                  <Phone size={14} color="#1E3A8A" />
                  <Text style={styles.contactBtnText}>Call Branch</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => openEmail(BIS_OFFICER.email)}
                  activeOpacity={0.8}
                >
                  <Mail size={14} color="#1E3A8A" />
                  <Text style={styles.contactBtnText}>Send Email</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Jurisdiction Notice */}
            <View style={styles.noticeBox}>
              <ShieldCheck size={14} color="#059669" />
              <Text style={styles.noticeText}>
                Official BIS jurisdiction assigned according to factory location (SIDCO Guindy, Chennai).
                All surveillance sample receipts must be stamped by CNBO.
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  settingsIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
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
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topInfo: {
    flex: 1,
    gap: 3,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  activeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: 0.5,
  },
  msmePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  msmeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#15803D',
  },
  companyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 18,
  },
  udyamCode: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E3A8A',
    fontFamily: 'monospace',
  },
  metaRow: {
    gap: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metricCell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricUnit: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  metricDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#E2E8F0',
  },

  // Segmented Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 3,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 9,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    fontWeight: '800',
    color: '#1E3A8A',
  },

  // Tab Content Wrapper
  tabSection: {
    gap: 12,
  },

  // License Card
  licenseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  licenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  licenseHeaderLeft: {
    flex: 1,
    gap: 3,
  },
  schemeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  schemeTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1E3A8A',
    textTransform: 'uppercase',
  },
  licenseNum: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: 'monospace',
  },
  productName: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
    marginTop: 2,
  },
  licenseHeaderRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  validityBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  validityText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#047857',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  standardPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  standardPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  brandPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  brandPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  expandedDetails: {
    gap: 8,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  cardActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  primaryActionBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 8,
  },
  primaryActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E3A8A',
  },

  // Audit Tab
  auditAlertCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  alertDesc: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 16,
  },
  alertActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    paddingVertical: 7,
    marginTop: 4,
  },
  alertActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  timelineBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 12,
  },
  timelineBoxTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    minHeight: 38,
  },
  connectorCol: {
    alignItems: 'center',
    width: 20,
  },
  stepDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  stepDotCompleted: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  stepDotActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#D97706',
  },
  stepLine: {
    width: 2,
    flex: 1,
    minHeight: 18,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  stepLineCompleted: {
    backgroundColor: '#059669',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  stepTitleActive: {
    fontWeight: '800',
    color: '#B45309',
  },
  stepDate: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  upcomingPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  upcomingPillText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#B45309',
  },

  // Officer Tab
  officerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 12,
  },
  officerHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  officerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  officerInitials: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  officerMain: {
    flex: 1,
  },
  officerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  officerTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  officerDept: {
    fontSize: 10,
    color: '#64748B',
  },
  officerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  officerInfoText: {
    fontSize: 11,
    color: '#475569',
    flex: 1,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  noticeBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  noticeText: {
    fontSize: 11,
    color: '#065F46',
    flex: 1,
    lineHeight: 16,
  },
});
