import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Modal,
  Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Bell, 
  ChevronRight, 
  Search,
  ArrowRight,
  Settings,
  X,
  ExternalLink,
  Phone
} from 'lucide-react-native';
import { TODAYS_BRIEF } from '../../services/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1. Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SR</Text>
          </View>
          <View>
            <Text style={styles.greetingTitle}>Good evening, Sripathi</Text>
            <Text style={styles.greetingSub}>BIS Licensee Dashboard</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity 
            style={styles.bellBtn} 
            onPress={() => router.push('/settings')}
            activeOpacity={0.7}
            accessibilityLabel="Settings"
          >
            <Settings size={18} color="#475569" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.bellBtn} 
            onPress={() => setShowNotifications(true)}
            activeOpacity={0.7}
            accessibilityLabel="Notifications"
          >
            <Bell size={18} color="#475569" />
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{TODAYS_BRIEF.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. Valid Enterprise Compliance Card */}
        <View style={styles.enterpriseCard}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardSuperTitle}>ENTERPRISE COMPLIANCE STATUS</Text>
              <Text style={styles.companyName}>Apex Safety Gear & Flasks Pvt. Ltd.</Text>
              <Text style={styles.udyamText}>UDYAM-TN-02-0049281 · MSME Manufacturing</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>QCO Compliant</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.facilityRow}>
            <Text style={styles.facilityLabel}>Registered Facility:</Text>
            <Text style={styles.facilityVal}>Plot 42, SIDCO Guindy Industrial Estate, Chennai</Text>
          </View>

          {/* Certified Product Lines */}
          <View style={styles.productLinesBox}>
            <Text style={styles.productLinesTitle}>Certified Product Lines (2 Active ISI Licenses):</Text>
            
            <View style={styles.productItem}>
              <View style={styles.bulletPoint} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productItemName}>Two-Wheeler Helmets</Text>
                <Text style={styles.productItemMeta}>Standard: IS 4151:2015 · License: CM/L-8472910</Text>
              </View>
              <Text style={styles.productExpiry}>Valid 2027</Text>
            </View>

            <View style={styles.productItem}>
              <View style={styles.bulletPoint} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productItemName}>Stainless Steel Flasks & Water Bottles</Text>
                <Text style={styles.productItemMeta}>Standard: IS 17803:2022 · License: CM/L-9104823</Text>
              </View>
              <Text style={styles.productExpiry}>Valid 2026</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.cardActionBtn}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.cardActionBtnText}>Manage Enterprise Credentials & Officer Details</Text>
            <ChevronRight size={14} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* 3. Primary Elevated Action: Ask Praman */}
        <TouchableOpacity 
          style={styles.heroAskCard}
          onPress={() => router.push('/(tabs)/ask')}
          activeOpacity={0.9}
        >
          <Text style={styles.heroHeading}>Ask Praman Compliance Assistant</Text>
          <Text style={styles.heroSubheading}>
            Ask questions in English, Hindi, Tamil, Marathi, Bengali, Odia, Kannada, or Tanglish. Instant parallel retrieval from official BIS gazettes.
          </Text>

          <View style={styles.fakeSearchTrigger}>
            <Search size={15} color="#94A3B8" />
            <Text style={styles.fakeSearchPlaceholder}>
              Ask about IS 4151, QCO status, or lab near you...
            </Text>
            <ArrowRight size={15} color="#0D9488" />
          </View>
        </TouchableOpacity>

        {/* 4. Quick Services Grid */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionHeader}>Quick Services</Text>

          <View style={styles.gridContainer}>
            {/* Card 1: QCO Checker */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/standards')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardMainTitle}>QCO & Standards Checker</Text>
              <Text style={styles.cardSubtitle}>Search 14,000+ Indian standards & mandatory gazettes</Text>
              <ChevronRight size={16} color="#CBD5E1" style={styles.chevronPos} />
            </TouchableOpacity>

            {/* Card 2: Document Vault */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/vault')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardMainTitle}>Document Vault</Text>
              <Text style={styles.cardSubtitle}>3 verified certificates & NABL test reports</Text>
              <ChevronRight size={16} color="#CBD5E1" style={styles.chevronPos} />
            </TouchableOpacity>

            {/* Card 3: NABL Labs */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/map')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardMainTitle}>All-India Testing Labs Directory</Text>
              <Text style={styles.cardSubtitle}>Find accredited test facilities by product and city</Text>
              <ChevronRight size={16} color="#CBD5E1" style={styles.chevronPos} />
            </TouchableOpacity>

            {/* Card 4: BIS Services & Programmes */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/services')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardMainTitle}>BIS Services & Programmes</Text>
              <Text style={styles.cardSubtitle}>Standards Clubs, NITS training, LRS lab scheme & certification</Text>
              <ChevronRight size={16} color="#CBD5E1" style={styles.chevronPos} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Citizen & Consumer Corner */}
        <View style={styles.consumerSection}>
          <Text style={styles.sectionHeader}>Consumer Protection & Grievance Corner</Text>
          
          <View style={styles.consumerCard}>
            <View style={styles.consumerCardHeader}>
              <View style={styles.consumerIconBox}>
                <Phone size={18} color="#0D9488" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.consumerCardTitle}>National Consumer Helpline</Text>
                <Text style={styles.consumerCardPhone}>1800-11-4000 (Toll-Free)</Text>
              </View>
              <TouchableOpacity 
                style={styles.callBtn}
                onPress={() => Linking.openURL('tel:1800114000')}
                activeOpacity={0.8}
              >
                <Text style={styles.callBtnText}>Call Now</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.consumerCardDesc}>
              Report spurious ISI marks, substandard goods, or gold jewellery sold without mandatory 6-digit HUID code directly to BIS enforcement.
            </Text>

            <View style={styles.consumerLinksRow}>
              <TouchableOpacity 
                style={styles.consumerLinkBtn}
                onPress={() => Linking.openURL('https://www.services.bis.gov.in/php/BIS_2.0/dgasp/consumer_grievance.php')}
                activeOpacity={0.7}
              >
                <Text style={styles.consumerLinkText}>BIS Grievance Portal</Text>
                <ExternalLink size={11} color="#0D9488" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.consumerLinkBtn}
                onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bis.bis_care')}
                activeOpacity={0.7}
              >
                <Text style={styles.consumerLinkText}>Download BIS CARE App</Text>
                <ExternalLink size={11} color="#0D9488" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* 5. Notifications & Today's BIS Brief Modal */}
      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Notifications & BIS Briefs</Text>
                <Text style={styles.modalSub}>Real-time Gazette updates & compliance circulars</Text>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setShowNotifications(false)}
              >
                <X size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {TODAYS_BRIEF.map((item) => (
                <View key={item.id} style={styles.notificationCard}>
                  <View style={styles.notificationTop}>
                    <Text style={styles.notificationSource}>{item.source}</Text>
                    <Text style={styles.notificationDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDesc}>{item.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  greetingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  greetingSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
  },
  bellBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  // Valid Enterprise Card
  enterpriseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardSuperTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  companyName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  udyamText: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#047857',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  facilityRow: {
    gap: 2,
  },
  facilityLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  facilityVal: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '600',
  },
  productLinesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  productLinesTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletPoint: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#0F172A',
    marginTop: 6,
  },
  productItemName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  productItemMeta: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  productExpiry: {
    fontSize: 10,
    fontWeight: '700',
    color: '#047857',
  },
  cardActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  cardActionBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Hero Card
  heroAskCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 18,
    gap: 12,
  },
  heroHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSubheading: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
  },
  fakeSearchTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  fakeSearchPlaceholder: {
    flex: 1,
    fontSize: 12,
    color: '#94A3B8',
  },

  // Quick Services
  actionsSection: {
    gap: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  gridContainer: {
    gap: 8,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 3,
    position: 'relative',
  },
  cardMainTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#64748B',
    paddingRight: 24,
  },
  chevronPos: {
    position: 'absolute',
    right: 14,
    top: 18,
  },

  // Consumer Section
  consumerSection: {
    gap: 10,
    marginTop: 4,
  },
  consumerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    padding: 16,
    gap: 10,
  },
  consumerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  consumerIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#99F6E4',
  },
  consumerCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  consumerCardPhone: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },
  callBtn: {
    backgroundColor: '#0D9488',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  callBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  consumerCardDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  consumerLinksRow: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  consumerLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  consumerLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: '80%',
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  notificationTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationSource: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284C7',
  },
  notificationDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
  notificationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  notificationDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
    marginTop: 2,
  },
});
