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
  Phone,
  FileCheck2,
  FolderLock,
  Building2,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  CheckCheck
} from 'lucide-react-native';
import { TODAYS_BRIEF } from '../../services/mockData';
import { Colors, Shadows, Tints } from '../../constants/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1. Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SR</Text>
          </View>
            <Text style={styles.greetingTitle}>{getGreeting()}, Sripathi</Text>
            <Text style={styles.greetingSub}>{t('greeting_sub') || 'BIS Licensee Dashboard'}</Text>
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
              <Text style={styles.cardSuperTitle}>{t('enterprise_status')}</Text>
              <Text style={styles.companyName}>Apex Safety Gear and Flasks Pvt. Ltd.</Text>
              <Text style={styles.udyamText}>UDYAM-TN-02-0049281 · MSME manufacturing</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>{t('qco_compliant')}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.facilityRow}>
            <Text style={styles.facilityLabel}>{t('registered_facility')}</Text>
            <Text style={styles.facilityVal}>Plot 42, SIDCO Guindy Industrial Estate, Chennai</Text>
          </View>

          {/* Certified Product Lines */}
          <View style={styles.productLinesBox}>
            <Text style={styles.productLinesTitle}>{t('certified_product_lines')}</Text>
            
            <View style={styles.productItem}>
              <CheckCheck size={16} color="#38BDF8" style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productItemName}>{t('two_wheeler_helmets')}</Text>
                <Text style={styles.productItemMeta}>IS 4151:2015 · CM/L-8472910</Text>
              </View>
              <View style={styles.validTagGreen}>
                <Text style={styles.validTagGreenText}>{t('valid_2027')}</Text>
              </View>
            </View>

            <View style={styles.productItem}>
              <CheckCheck size={16} color="#38BDF8" style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productItemName}>{t('stainless_steel_flasks')}</Text>
                <Text style={styles.productItemMeta}>IS 17803:2022 · CM/L-9104823</Text>
              </View>
              <View style={styles.validTagAmber}>
                <Text style={styles.validTagAmberText}>{t('valid_2026')}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.cardActionBtn}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.cardActionBtnText}>{t('manage_enterprise')}</Text>
            <ChevronRight size={14} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* 3. Primary Elevated Action: Ask Praman */}
        <TouchableOpacity 
          style={styles.heroAskCard}
          onPress={() => router.push('/(tabs)/ask')}
          activeOpacity={0.9}
        >
          <View style={styles.heroTopRow}>
            <View style={styles.heroBadge}>
              <Sparkles size={11} color="#1D4ED8" />
              <Text style={styles.heroBadgeText}>{t('ask_praman_badge')}</Text>
            </View>
            <View style={styles.livePulseTag}>
              <View style={styles.pulseDot} />
              <Text style={styles.livePulseText}>{t('live_gazette_sync')}</Text>
            </View>
          </View>

          <Text style={styles.heroHeading}>{t('ask_praman_title')}</Text>
          <Text style={styles.heroSubheading}>
            {t('ask_praman_sub')}
          </Text>

          <View style={styles.fakeSearchTrigger}>
            <Search size={14} color="#6B7280" />
            <Text style={styles.fakeSearchPlaceholder}>
              {t('search_praman_placeholder')}
            </Text>
            <ArrowRight size={15} color="#1D4ED8" />
          </View>

          {/* Quick Prompt Pills */}
          <View style={styles.heroChipsRow}>
            <TouchableOpacity 
              style={styles.heroChip}
              onPress={() => router.push('/(tabs)/ask')}
              activeOpacity={0.7}
            >
              <Text style={styles.heroChipText}>{t('chip_helmets')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.heroChip}
              onPress={() => router.push('/(tabs)/ask')}
              activeOpacity={0.7}
            >
              <Text style={styles.heroChipText}>{t('chip_gold')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.heroChip}
              onPress={() => router.push('/(tabs)/ask')}
              activeOpacity={0.7}
            >
              <Text style={styles.heroChipText}>{t('chip_labs')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* 4. Quick Services Grid */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionHeader}>{t('quick_regulatory_services')}</Text>

          <View style={styles.gridContainer}>
            {/* Card 1: QCO Checker */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/standards')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconBox, { backgroundColor: Tints.amber.bg, borderColor: Tints.amber.border }]}>
                <FileCheck2 size={20} color={Tints.amber.text} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.cardMainTitle}>{t('qco_checker_title')}</Text>
                  <View style={[styles.miniCategoryBadge, { backgroundColor: Tints.amber.bg }]}>
                    <Text style={[styles.miniCategoryText, { color: Tints.amber.textDark }]}>{t('qco_checker_badge')}</Text>
                  </View>
                </View>
                <Text style={styles.cardSubtitle}>{t('qco_checker_sub')}</Text>
              </View>
              <ChevronRight size={16} color="#94A3B8" />
            </TouchableOpacity>

            {/* Card 2: Document Vault */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/vault')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconBox, { backgroundColor: Tints.indigo.bg, borderColor: Tints.indigo.border }]}>
                <FolderLock size={20} color={Tints.indigo.text} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.cardMainTitle}>{t('doc_vault_title')}</Text>
                  <View style={[styles.miniCategoryBadge, { backgroundColor: Tints.indigo.bg }]}>
                    <Text style={[styles.miniCategoryText, { color: Tints.indigo.textDark }]}>{t('doc_vault_badge')}</Text>
                  </View>
                </View>
                <Text style={styles.cardSubtitle}>{t('doc_vault_sub')}</Text>
              </View>
              <ChevronRight size={16} color="#94A3B8" />
            </TouchableOpacity>

            {/* Card 3: NABL Labs */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/map')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconBox, { backgroundColor: Tints.teal.bg, borderColor: Tints.teal.border }]}>
                <Building2 size={20} color={Tints.teal.text} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.cardMainTitle}>{t('labs_dir_title')}</Text>
                  <View style={[styles.miniCategoryBadge, { backgroundColor: Tints.teal.bg }]}>
                    <Text style={[styles.miniCategoryText, { color: Tints.teal.textDark }]}>{t('labs_dir_badge')}</Text>
                  </View>
                </View>
                <Text style={styles.cardSubtitle}>{t('labs_dir_sub')}</Text>
              </View>
              <ChevronRight size={16} color="#94A3B8" />
            </TouchableOpacity>

            {/* Card 4: BIS Services & Programmes */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/services')}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconBox, { backgroundColor: Tints.purple.bg, borderColor: Tints.purple.border }]}>
                <Award size={20} color={Tints.purple.text} />
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.cardMainTitle}>{t('services_programmes_title')}</Text>
                  <View style={[styles.miniCategoryBadge, { backgroundColor: Tints.purple.bg }]}>
                    <Text style={[styles.miniCategoryText, { color: Tints.purple.textDark }]}>{t('services_programmes_badge')}</Text>
                  </View>
                </View>
                <Text style={styles.cardSubtitle}>{t('services_programmes_sub')}</Text>
              </View>
              <ChevronRight size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Citizen & Consumer Corner */}
        <View style={styles.consumerSection}>
          <Text style={styles.sectionHeader}>{t('consumer_corner_title')}</Text>
          
          <View style={styles.consumerCard}>
            <View style={styles.consumerCardHeader}>
              <View style={styles.consumerIconBox}>
                <Phone size={18} color="#0D9488" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.consumerCardTitle}>{t('national_consumer_helpline')}</Text>
                <Text style={styles.consumerCardPhone}>{t('toll_free')}</Text>
              </View>
              <TouchableOpacity 
                style={styles.callBtn}
                onPress={() => Linking.openURL('tel:1800114000')}
                activeOpacity={0.8}
              >
                <Text style={styles.callBtnText}>{t('call_now')}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.consumerCardDesc}>
              {t('consumer_card_desc')}
            </Text>

            <View style={styles.consumerLinksRow}>
              <TouchableOpacity 
                style={styles.consumerLinkBtn}
                onPress={() => Linking.openURL('https://www.services.bis.gov.in/php/BIS_2.0/dgasp/consumer_grievance.php')}
                activeOpacity={0.7}
              >
                <Text style={styles.consumerLinkText}>{t('bis_grievance_portal')}</Text>
                <ExternalLink size={11} color="#0D9488" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.consumerLinkBtn}
                onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bis.bis_care')}
                activeOpacity={0.7}
              >
                <Text style={styles.consumerLinkText}>{t('download_bis_care')}</Text>
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
                <Text style={styles.modalTitle}>{t('notifications_briefs_title')}</Text>
                <Text style={styles.modalSub}>{t('notifications_briefs_sub')}</Text>
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
    borderRadius: 10,
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
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
    backgroundColor: Colors.primary,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
    padding: 16,
    gap: 12,
    ...Shadows.sm,
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
    fontSize: 16,
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
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
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
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  productLinesTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  validTagGreen: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  validTagGreenText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  validTagAmber: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  validTagAmberText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  productItemName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  productItemMeta: {
    fontSize: 10,
    color: '#6B7280',
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardActionBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },

  // Hero Card
  heroAskCard: {
    backgroundColor: '#EBF5FF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 18,
    gap: 12,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  livePulseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  livePulseText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  heroHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  heroSubheading: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  fakeSearchTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  fakeSearchPlaceholder: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  heroChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  heroChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  heroChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
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
    gap: 10,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Shadows.sm,
  },
  actionIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniCategoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  miniCategoryText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardMainTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },

  // Consumer Section
  consumerSection: {
    gap: 10,
    marginTop: 4,
  },
  consumerCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#99F6E4',
    padding: 16,
    gap: 10,
    ...Shadows.sm,
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
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
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
