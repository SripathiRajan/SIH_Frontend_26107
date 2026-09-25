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
import {
  GraduationCap,
  Award,
  ShieldCheck,
  FlaskConical,
  AlertCircle,
  Smartphone,
  ExternalLink,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react-native';
import { BIS_SERVICES, BisService } from '../../services/mockData';

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Industry & Manufacturing', 'Youth & Academia', 'Capacity Building', 'Testing & Calibration', 'Citizen Services', 'Digital Verification'];

  const filteredServices = selectedCategory === 'All'
    ? BIS_SERVICES
    : BIS_SERVICES.filter(s => s.category === selectedCategory);

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={22} color="#0D9488" />;
      case 'Award':
        return <Award size={22} color="#0D9488" />;
      case 'ShieldCheck':
        return <ShieldCheck size={22} color="#0D9488" />;
      case 'FlaskConical':
        return <FlaskConical size={22} color="#0D9488" />;
      case 'AlertCircle':
        return <AlertCircle size={22} color="#0D9488" />;
      case 'Smartphone':
        return <Smartphone size={22} color="#0D9488" />;
      default:
        return <ShieldCheck size={22} color="#0D9488" />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Sparkles size={12} color="#0D9488" />
            <Text style={styles.headerBadgeText}>OFFICIAL BIS PROGRAMMES & SCHEMES</Text>
          </View>
          <Text style={styles.title}>Bureau of Indian Standards Services</Text>
          <Text style={styles.subtitle}>
            Explore key government initiatives across product certification, Standards Clubs in academia, professional NITS training, NABL lab empanelment, and consumer affairs.
          </Text>
        </View>

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
          {filteredServices.map((service: BisService) => (
            <View key={service.id} style={styles.serviceCard}>
              {/* Card Top Row */}
              <View style={styles.cardTopRow}>
                <View style={styles.iconContainer}>
                  {renderServiceIcon(service.iconName)}
                </View>
                <View style={styles.badgeGroup}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{service.category}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>{service.badge}</Text>
                  </View>
                </View>
              </View>

              {/* Title & Description */}
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc}>{service.description}</Text>

              {/* Eligibility Strip */}
              <View style={styles.eligibilityBox}>
                <Text style={styles.eligibilityLabel}>TARGET ELIGIBILITY:</Text>
                <Text style={styles.eligibilityValue}>{service.eligibility}</Text>
              </View>

              {/* Key Features */}
              <View style={styles.featuresList}>
                {service.features.map((feature: string, fIdx: number) => (
                  <View key={fIdx} style={styles.featureItem}>
                    <CheckCircle2 size={13} color="#0D9488" style={{ marginTop: 2 }} />
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
                <Text style={styles.actionBtnText}>Open Official Scheme Portal</Text>
                <ExternalLink size={13} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
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
  header: {
    gap: 6,
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
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  servicesList: {
    gap: 14,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 10,
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
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 2,
  },
  eligibilityLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
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
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
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
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 11,
    marginTop: 4,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  helpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    padding: 16,
    gap: 10,
    marginTop: 4,
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
