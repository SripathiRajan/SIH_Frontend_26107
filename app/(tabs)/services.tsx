import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  FlaskConical,
  AlertCircle,
  Smartphone,
  Phone,
  Mail,
  ArrowUpRight,
  Settings
} from 'lucide-react-native';
import { BIS_SERVICES, BisService } from '../../services/mockData';
import { Colors, Shadows } from '../../constants/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function ServicesScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Industry and manufacturing',
    'Youth and academia',
    'Capacity building',
    'Testing and calibration',
    'Citizen services',
    'Digital verification'
  ];

  const filteredServices = selectedCategory === 'All'
    ? BIS_SERVICES
    : BIS_SERVICES.filter(s => {
        const catNorm = s.category.toLowerCase().replace(/&/g, 'and').trim();
        const selNorm = selectedCategory.toLowerCase().replace(/&/g, 'and').trim();
        return catNorm === selNorm;
      });

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={20} color="#111827" />;
      case 'Award':
        return <Award size={20} color="#111827" />;
      case 'ShieldCheck':
        return <ShieldCheck size={20} color="#111827" />;
      case 'FlaskConical':
        return <FlaskConical size={20} color="#111827" />;
      case 'AlertCircle':
        return <AlertCircle size={20} color="#111827" />;
      case 'Smartphone':
        return <Smartphone size={20} color="#111827" />;
      default:
        return <ShieldCheck size={20} color="#111827" />;
    }
  };

  const getCleanTitle = (title: string) => {
    return title.replace('&', 'and');
  };

  const getCleanCategory = (cat: string) => {
    return cat.replace('&', 'and');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Top Header Panel with Top Right Settings Button */}
      <View style={styles.topHeader}>
        <View style={{ flex: 1, gap: 4, paddingRight: 12 }}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{t('services_badge')}</Text>
          </View>
          <Text style={styles.title}>{t('services_title')}</Text>
          <Text style={styles.subtitle}>
            {t('services_sub')}
          </Text>
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Category Horizontal Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Services List */}
        <View style={styles.servicesList}>
          {filteredServices.map((service: BisService) => {
            return (
              <View key={service.id} style={styles.serviceCard}>
                {/* Card Top Row */}
                <View style={styles.cardTopRow}>
                  <View style={styles.cardHeaderLeft}>
                    <View style={styles.iconContainer}>
                      {renderServiceIcon(service.iconName)}
                    </View>
                    <Text style={styles.serviceTitle}>{getCleanTitle(service.title)}</Text>
                  </View>
                  <View style={styles.badgeGroup}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{getCleanCategory(service.category)}</Text>
                    </View>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusBadgeText}>{service.badge}</Text>
                    </View>
                  </View>
                </View>

                {/* Description */}
                <Text style={styles.serviceDesc}>{service.description}</Text>

                {/* Eligibility Strip */}
                <View style={styles.eligibilityBox}>
                  <Text style={styles.eligibilityLabel}>{t('target_eligibility')}</Text>
                  <Text style={styles.eligibilityValue}>{service.eligibility.replace('&', 'and')}</Text>
                </View>

                {/* Key Features */}
                <View style={styles.featuresList}>
                  {service.features.map((feature: string, fIdx: number) => (
                    <View key={fIdx} style={styles.featureItem}>
                      <Text style={styles.checkMark}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {/* Action Button */}
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => Linking.openURL(service.link)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionBtnText}>{t('open_scheme_portal')}</Text>
                  <ArrowUpRight size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Central Assistance & Support Card */}
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Need Direct Administrative Assistance?</Text>
          <Text style={styles.helpSub}>
            Reach out to the Central Directorate or your regional BIS Branch Office for scheme enrollment, licensing guidelines, and grievance redressal.
          </Text>

          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => Linking.openURL('tel:1800114000')}
              activeOpacity={0.8}
            >
              <Phone size={15} color="#0D9488" />
              <View>
                <Text style={styles.contactBtnLabel}>Toll-Free Helpline</Text>
                <Text style={styles.contactBtnVal}>1800-11-4000</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => Linking.openURL('mailto:info@bis.gov.in')}
              activeOpacity={0.8}
            >
              <Mail size={15} color="#0D9488" />
              <View>
                <Text style={styles.contactBtnLabel}>Central Inquiries</Text>
                <Text style={styles.contactBtnVal}>info@bis.gov.in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
    gap: 16,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F0FDFA',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  headerBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  categoryScroll: {
    marginHorizontal: -18,
    paddingHorizontal: 18,
  },
  categoryContainer: {
    gap: 8,
    paddingVertical: 2,
  },
  categoryChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryChipActive: {
    backgroundColor: Colors.primaryMuted,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  servicesList: {
    gap: 14,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 10,
    ...Shadows.sm,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  statusBadge: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#047857',
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  serviceDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  eligibilityBox: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    gap: 2,
  },
  eligibilityLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 0.5,
  },
  eligibilityValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  featuresList: {
    gap: 6,
    paddingVertical: 2,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 8,
  },
  checkMark: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 11,
    color: '#334155',
    flex: 1,
    lineHeight: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 11,
    marginTop: 4,
    ...Shadows.sm,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  helpCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#99F6E4',
    padding: 16,
    gap: 10,
    marginTop: 4,
    ...Shadows.sm,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  helpSub: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  contactBtnLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  contactBtnVal: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
  },
});
