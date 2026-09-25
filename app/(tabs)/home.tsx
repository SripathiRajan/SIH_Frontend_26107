import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Bell, 
  MapPin, 
  AlertTriangle, 
  MessageSquare, 
  FileText, 
  FolderLock, 
  Building2, 
  ChevronRight, 
  ShieldCheck 
} from 'lucide-react-native';
import { Colors, Shadows } from '../../constants/theme';
import { TODAYS_BRIEF } from '../../services/mockData';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.monogram}>
            <Text style={styles.monogramText}>PR</Text>
          </View>
          <Text style={styles.greetingText}>GOOD EVENING, USER</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Bell size={18} color="#4B5563" />
          <View style={styles.bellBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Dark Location & Context Card */}
        <View style={styles.darkCard}>
          <View style={styles.locationTag}>
            <MapPin size={13} color="#F59E0B" />
            <Text style={styles.locationTagText}>You are in</Text>
          </View>
          <Text style={styles.locationCity}>Chennai</Text>
          <Text style={styles.locationSub}>Tamil Nadu • Live BIS Context</Text>

          {/* Bottom stats strip */}
          <View style={styles.statsStrip}>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>QCO STATUS</Text>
              <Text style={styles.statValue}>Mandatory</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>STANDARDS CATALOG</Text>
              <Text style={styles.statValue}>21,480 Active</Text>
            </View>
          </View>
        </View>

        {/* Pink/Red Alert Strip */}
        <TouchableOpacity 
          style={styles.alertStrip} 
          onPress={() => router.push('/(tabs)/standards')}
          activeOpacity={0.8}
        >
          <View style={styles.alertLeft}>
            <View style={styles.alertIconCircle}>
              <AlertTriangle size={16} color="#DC2626" />
            </View>
            <View style={styles.alertTexts}>
              <Text style={styles.alertTitle}>QCO Compliance Alert</Text>
              <Text style={styles.alertSubtitle}>Mandatory ISI mark required for Helmets & Bottles</Text>
            </View>
          </View>
          <ChevronRight size={18} color="#F87171" />
        </TouchableOpacity>

        {/* 2x2 Bento Action Cards Grid */}
        <View style={styles.grid}>
          {/* Card 1: Ask Praman (Deep Indigo) */}
          <TouchableOpacity 
            style={[styles.card, styles.cardPrimary]}
            onPress={() => router.push('/(tabs)/ask')}
            activeOpacity={0.85}
          >
            <View style={styles.cardIconBoxPrimary}>
              <MessageSquare size={20} color="#14B8A6" />
            </View>
            <View>
              <Text style={styles.cardTitlePrimary}>Ask Praman</Text>
              <Text style={styles.cardSubPrimary}>Plain-language Q&A</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2: QCO Checker */}
          <TouchableOpacity 
            style={[styles.card, styles.cardWhite]}
            onPress={() => router.push('/(tabs)/standards')}
            activeOpacity={0.85}
          >
            <View style={[styles.cardIconBoxWhite, { backgroundColor: '#FFFBEB' }]}>
              <FileText size={20} color="#D97706" />
            </View>
            <View>
              <Text style={styles.cardTitleWhite}>QCO checker</Text>
              <Text style={styles.cardSubWhite}>Check mandatory standards</Text>
            </View>
          </TouchableOpacity>

          {/* Card 3: Document Vault */}
          <TouchableOpacity 
            style={[styles.card, styles.cardWhite]}
            onPress={() => router.push('/vault')}
            activeOpacity={0.85}
          >
            <View style={[styles.cardIconBoxWhite, { backgroundColor: '#F0FDFA' }]}>
              <FolderLock size={20} color="#0D9488" />
            </View>
            <View>
              <Text style={styles.cardTitleWhite}>Document vault</Text>
              <Text style={styles.cardSubWhite}>3 documents verified</Text>
            </View>
          </TouchableOpacity>

          {/* Card 4: Find Lab */}
          <TouchableOpacity 
            style={[styles.card, styles.cardWhite]}
            onPress={() => router.push('/(tabs)/map')}
            activeOpacity={0.85}
          >
            <View style={[styles.cardIconBoxWhite, { backgroundColor: '#FAF5FF' }]}>
              <Building2 size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.cardTitleWhite}>Find Testing Lab</Text>
              <Text style={styles.cardSubWhite}>Locate NABL & BIS labs</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Today's Brief Section */}
        <View style={styles.briefSection}>
          <View style={styles.briefHeader}>
            <Text style={styles.briefTitle}>Today's brief</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.briefList}>
            {TODAYS_BRIEF.map((item) => (
              <View key={item.id} style={styles.briefItem}>
                <View style={styles.briefIconBox}>
                  <ShieldCheck size={18} color="#312E81" />
                </View>
                <View style={styles.briefContent}>
                  <Text style={styles.briefItemTitle}>{item.title}</Text>
                  <Text style={styles.briefItemDesc}>{item.description}</Text>
                  <Text style={styles.briefItemDate}>{item.date} • {item.source}</Text>
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  monogram: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramText: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  bellButton: {
    padding: 6,
    position: 'relative',
  },
  bellBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    position: 'absolute',
    top: 6,
    right: 6,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  darkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Shadows.sm,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationTagText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '600',
  },
  locationCity: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  locationSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 16,
  },
  statsStrip: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statColumn: {
    flex: 1,
  },
  statLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statValue: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  alertStrip: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  alertIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTexts: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#991B1B',
  },
  alertSubtitle: {
    fontSize: 11,
    color: '#DC2626',
    marginTop: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    borderRadius: 18,
    padding: 16,
    minHeight: 130,
    justifyContent: 'space-between',
  },
  cardPrimary: {
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    ...Shadows.sm,
  },
  cardIconBoxPrimary: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitlePrimary: {
    color: Colors.primaryDark,
    fontSize: 15,
    fontWeight: '700',
  },
  cardSubPrimary: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  cardWhite: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardIconBoxWhite: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleWhite: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  cardSubWhite: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 2,
  },
  briefSection: {
    marginTop: 4,
    gap: 12,
  },
  briefHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  briefTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D9488',
  },
  briefList: {
    gap: 10,
  },
  briefItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  briefIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  briefContent: {
    flex: 1,
  },
  briefItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  briefItemDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 16,
  },
  briefItemDate: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
