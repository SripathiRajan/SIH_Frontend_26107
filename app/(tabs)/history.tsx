import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, CheckCircle2, MessageSquare, ChevronRight, FileText } from 'lucide-react-native';

export default function HistoryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'All' | 'Chats' | 'Applications' | 'Verifications'>('All');

  const historyItems = [
    {
      id: 'h-1',
      type: 'Application',
      title: 'Grant of ISI Mark: Stainless Steel Flasks (IS 17803:2022)',
      sub: 'Stage 3: Sample testing in progress at NABL lab',
      date: 'Applied 12-Jul-2024',
      badge: 'Active Application',
      badgeColor: '#D97706',
      badgeBg: '#FEF3C7'
    },
    {
      id: 'h-2',
      type: 'Chat',
      title: 'Two-Wheeler Helmet Standard & Lab Proximity Query',
      sub: 'Located National Test House Taramani (4.8 km)',
      date: 'Yesterday, 04:15 PM',
      badge: 'Grounded Query',
      badgeColor: '#0D9488',
      badgeBg: '#F0FDFA'
    },
    {
      id: 'h-3',
      type: 'Verification',
      title: 'BIS Helmet License Verification (CM/L-8472910)',
      sub: 'Hash 0x8F94...B104-BIS-OK verified on central ledger',
      date: '18-Aug-2024',
      badge: 'Authenticated',
      badgeColor: '#059669',
      badgeBg: '#ECFDF5'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Audit History & Filings</Text>
          <Text style={styles.subtitle}>
            Review past consultations, application steppers, and certificate verifications.
          </Text>
        </View>

        {/* Filter Pills */}
        <View style={styles.filters}>
          {(['All', 'Chats', 'Applications', 'Verifications'] as const).map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.filterChip, filter === tab && styles.filterChipActive]}
              onPress={() => setFilter(tab)}
            >
              <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* History List */}
        <View style={styles.list}>
          {historyItems.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onPress={() => item.type === 'Chat' ? router.push('/(tabs)/ask') : router.push('/vault')}
              activeOpacity={0.8}
            >
              <View style={styles.cardTop}>
                <View style={[styles.badge, { backgroundColor: item.badgeBg }]}>
                  <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipActive: {
    backgroundColor: '#312E81',
    borderColor: '#312E81',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  cardSub: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
  },
});
