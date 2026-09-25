import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Bell, 
  MapPin, 
  MessageSquare, 
  FileCheck2, 
  FolderLock, 
  Building2, 
  ChevronRight, 
  ShieldCheck,
  Search,
  ArrowRight,
  Settings
} from 'lucide-react-native';
import { TODAYS_BRIEF } from '../../services/mockData';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 1. Clean, Spacious Top Bar */}
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SR</Text>
          </View>
          <View>
            <Text style={styles.greetingTitle}>Good evening, Sripathinathan</Text>
            <Text style={styles.greetingSub}>Apex MSME Safety Facility</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity 
            style={styles.bellBtn} 
            onPress={() => router.push('/settings')}
            activeOpacity={0.7}
            accessibilityLabel="Settings"
          >
            <Settings size={18} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
            <Bell size={18} color="#64748B" />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. Unified Context Card (Spacious, Elegant, Light) */}
        <View style={styles.contextCard}>
          <View style={styles.locationRow}>
            <MapPin size={14} color="#0D9488" />
            <Text style={styles.locationText}>Chennai, Tamil Nadu • Regional Desk</Text>
          </View>
          
          <Text style={styles.sectorTitle}>Two-Wheeler Helmets & Stainless Flasks</Text>
          
          <View style={styles.metricsPillsRow}>
            <View style={styles.pillMandatory}>
              <View style={styles.pillDotAmber} />
              <Text style={styles.pillMandatoryText}>QCO Mandatory</Text>
            </View>

            <View style={styles.pillStandard}>
              <Text style={styles.pillStandardText}>2 Active Licenses (CM/L)</Text>
            </View>
          </View>
        </View>

        {/* 3. Primary Elevated Action: Ask Praman */}
        <TouchableOpacity 
          style={styles.heroAskCard}
          onPress={() => router.push('/ask')}
          activeOpacity={0.9}
        >
          <View style={styles.heroTop}>
            <View style={styles.heroIconBox}>
              <MessageSquare size={20} color="#2DD4BF" />
            </View>
            <View style={styles.askTag}>
              <Text style={styles.askTagText}>AI ASSISTANT</Text>
            </View>
          </View>

          <Text style={styles.heroHeading}>Ask Praman Anything</Text>
          <Text style={styles.heroSubheading}>
            Plain-language Q&A for Indian Standards, ISI mark licensing, and NABL testing labs.
          </Text>

          <View style={styles.fakeSearchTrigger}>
            <Search size={15} color="#94A3B8" />
            <Text style={styles.fakeSearchPlaceholder}>
              Ask about IS 4151, QCO status, or lab near you...
            </Text>
            <ArrowRight size={15} color="#0D9488" />
          </View>
        </TouchableOpacity>

        {/* 4. Quick Actions Grid (Clean, Roomy 3 Cards) */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionHeader}>Quick Services</Text>

          <View style={styles.gridContainer}>
            {/* Card 1: QCO Checker */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/standards')}
              activeOpacity={0.8}
            >
              <View style={[styles.cardIconCircle, { backgroundColor: '#F0FDFA' }]}>
                <FileCheck2 size={20} color="#0D9488" />
              </View>
              <Text style={styles.cardMainTitle}>QCO Checker</Text>
              <Text style={styles.cardSubtitle}>Check mandatory standards</Text>
              <ChevronRight size={16} color="#CBD5E1" style={styles.chevronPos} />
            </TouchableOpacity>

            {/* Card 2: Document Vault */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/vault')}
              activeOpacity={0.8}
            >
              <View style={[styles.cardIconCircle, { backgroundColor: '#EEF2FF' }]}>
                <FolderLock size={20} color="#4338CA" />
              </View>
              <Text style={styles.cardMainTitle}>Document Vault</Text>
              <Text style={styles.cardSubtitle}>3 verified certificates</Text>
              <ChevronRight size={16} color="#CBD5E1" style={styles.chevronPos} />
            </TouchableOpacity>

            {/* Card 3: NABL Labs */}
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => router.push('/map')}
              activeOpacity={0.8}
            >
              <View style={[styles.cardIconCircle, { backgroundColor: '#ECFDF5' }]}>
                <Building2 size={20} color="#059669" />
              </View>
              <Text style={styles.cardMainTitle}>Find a Lab</Text>
              <Text style={styles.cardSubtitle}>NABL accredited near you</Text>
              <ChevronRight size={16} color="#CBD5E1" style={styles.chevronPos} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Today's Brief (Just 2 clean cards with breathing space) */}
        <View style={styles.briefSection}>
          <View style={styles.briefHeaderRow}>
            <Text style={styles.sectionHeader}>Today's BIS Brief</Text>
            <Text style={styles.freshnessTag}>as on 24-Sep-2024</Text>
          </View>

          <View style={styles.briefList}>
            {TODAYS_BRIEF.slice(0, 2).map((item) => (
              <View key={item.id} style={styles.briefCard}>
                <View style={styles.briefIconBox}>
                  <ShieldCheck size={18} color="#312E81" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.briefTitle}>{item.title}</Text>
                  <Text style={styles.briefDesc}>{item.description}</Text>
                </View>
              </View>
            ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#312E81',
  },
  greetingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  greetingSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
    position: 'absolute',
    top: 9,
    right: 9,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  contextCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 20,
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F766E',
  },
  sectorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
  },
  metricsPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  pillMandatory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  pillDotAmber: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  pillMandatoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  pillStandard: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  pillStandardText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  heroAskCard: {
    backgroundColor: '#1E1B4B',
    borderRadius: 22,
    padding: 22,
    gap: 12,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  askTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  askTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2DD4BF',
    letterSpacing: 0.5,
  },
  heroHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSubheading: {
    fontSize: 12,
    color: '#C7D2FE',
    lineHeight: 18,
  },
  fakeSearchTrigger: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  fakeSearchPlaceholder: {
    flex: 1,
    fontSize: 12,
    color: '#64748B',
  },
  actionsSection: {
    gap: 12,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  gridContainer: {
    gap: 10,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    position: 'relative',
  },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMainTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  chevronPos: {
    marginLeft: 'auto',
  },
  briefSection: {
    gap: 12,
  },
  briefHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  freshnessTag: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  briefList: {
    gap: 10,
  },
  briefCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  briefIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  briefTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  briefDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 3,
    lineHeight: 16,
  },
});
