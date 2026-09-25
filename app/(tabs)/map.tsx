import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, Platform } from 'react-native';
import { MapPin, ExternalLink, ShieldCheck } from 'lucide-react-native';
import { TESTING_LABS } from '../../services/mockData';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Testing Laboratories Directory</Text>
          <Text style={styles.subtitle}>
            BIS-recognized & NABL-accredited test facilities in Tamil Nadu
          </Text>
        </View>

        {/* Map Placeholder Card */}
        <View style={styles.mapBox}>
          <MapPin size={32} color="#312E81" />
          <Text style={styles.mapTitle}>Chennai Cluster Active</Text>
          <Text style={styles.mapSub}>3 NABL Accredited Facilities Located</Text>
        </View>

        {/* Labs List */}
        <View style={styles.labsList}>
          {TESTING_LABS.map(lab => (
            <View key={lab.id} style={styles.labCard}>
              <View style={styles.labHeader}>
                <Text style={styles.labName}>{lab.name}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{lab.accreditation}</Text>
                </View>
              </View>

              <Text style={styles.labLocation}>
                <MapPin size={12} color="#6B7280" /> {lab.location} • <Text style={styles.distanceText}>{lab.distance}</Text>
              </Text>

              <View style={styles.scopeContainer}>
                {lab.scope.map((s, idx) => (
                  <View key={idx} style={styles.scopeChip}>
                    <Text style={styles.scopeText}>{s}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.openBtn}
                onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(lab.name + ' ' + lab.location)}`)}
              >
                <Text style={styles.openBtnText}>Open in Google Maps</Text>
                <ExternalLink size={13} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
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
  mapBox: {
    height: 160,
    backgroundColor: '#E0E7FF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  mapTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
    marginTop: 4,
  },
  mapSub: {
    fontSize: 11,
    color: '#4338CA',
  },
  labsList: {
    gap: 12,
  },
  labCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  labHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    color: '#0F766E',
    fontSize: 10,
    fontWeight: '700',
  },
  labLocation: {
    fontSize: 11,
    color: '#6B7280',
  },
  distanceText: {
    fontWeight: '700',
    color: '#312E81',
  },
  scopeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  scopeChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  scopeText: {
    fontSize: 10,
    color: '#4B5563',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  openBtn: {
    backgroundColor: '#312E81',
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  openBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
