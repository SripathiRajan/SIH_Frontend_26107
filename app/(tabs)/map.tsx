import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Linking, 
  Platform 
} from 'react-native';
import { ExternalLink, Phone, Navigation } from 'lucide-react-native';
import { TESTING_LABS } from '../../services/mockData';

export default function MapScreen() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All India');
  const [selectedProduct, setSelectedProduct] = useState<string>('All Standards');

  const REGIONS = [
    'All India',
    'Tamil Nadu (Current Location)',
    'Delhi NCR',
    'Maharashtra',
    'Karnataka',
    'Gujarat',
    'West Bengal'
  ];

  const PRODUCTS = [
    'All Standards',
    'Helmets (IS 4151)',
    'Flasks (IS 17803)',
    'Batteries (IS 16046)',
    'Electricals (IS 1293)',
    'Steel (IS 1786)'
  ];

  const filteredLabs = TESTING_LABS.filter(lab => {
    // Region match
    let matchRegion = true;
    if (selectedRegion === 'Tamil Nadu (Current Location)') {
      matchRegion = lab.state.includes('Tamil Nadu');
    } else if (selectedRegion !== 'All India') {
      matchRegion = lab.state.includes(selectedRegion) || lab.city.includes(selectedRegion);
    }

    // Product match
    let matchProduct = true;
    if (selectedProduct === 'Helmets (IS 4151)') {
      matchProduct = lab.productCodes.includes('IS 4151');
    } else if (selectedProduct === 'Flasks (IS 17803)') {
      matchProduct = lab.productCodes.includes('IS 17803');
    } else if (selectedProduct === 'Batteries (IS 16046)') {
      matchProduct = lab.productCodes.includes('IS 16046');
    } else if (selectedProduct === 'Electricals (IS 1293)') {
      matchProduct = lab.productCodes.includes('IS 1293');
    } else if (selectedProduct === 'Steel (IS 1786)') {
      matchProduct = lab.productCodes.includes('IS 1786');
    }

    return matchRegion && matchProduct;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>All-India Testing Laboratories Directory</Text>
          <Text style={styles.subtitle}>
            Official BIS-recognized & NABL-accredited (ISO/IEC 17025) testing facilities across India
          </Text>
        </View>

        {/* Current Location & User Facility Banner */}
        <View style={styles.locationBanner}>
          <View style={styles.locationBannerTop}>
            <Text style={styles.locationBannerLabel}>YOUR CURRENT REGISTERED FACILITY</Text>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>Primary Facility</Text>
            </View>
          </View>
          <Text style={styles.facilityName}>Plot 42, SIDCO Guindy Industrial Estate, Chennai</Text>
          <Text style={styles.facilityDesc}>
            Laboratories within 15 km in the Chennai cluster are highlighted for rapid lot sampling and third-party surveillance clearances.
          </Text>
        </View>

        {/* Filter 1: State / Region */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Filter by Region / State:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {REGIONS.map(reg => (
              <TouchableOpacity
                key={reg}
                style={[styles.filterChip, selectedRegion === reg && styles.filterChipActive]}
                onPress={() => setSelectedRegion(reg)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterChipText, selectedRegion === reg && styles.filterChipTextActive]}>
                  {reg}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter 2: Product Standard Scope */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Filter by Product Testing Scope:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {PRODUCTS.map(prod => (
              <TouchableOpacity
                key={prod}
                style={[styles.filterChip, selectedProduct === prod && styles.filterChipActive]}
                onPress={() => setSelectedProduct(prod)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterChipText, selectedProduct === prod && styles.filterChipTextActive]}>
                  {prod}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Counter */}
        <View style={styles.resultsBar}>
          <Text style={styles.resultsCount}>
            Showing {filteredLabs.length} Accredited Facilities
          </Text>
          <Text style={styles.resultsSub}>
            {selectedRegion} · {selectedProduct}
          </Text>
        </View>

        {/* Labs List */}
        <View style={styles.labsList}>
          {filteredLabs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No Testing Facilities Found</Text>
              <Text style={styles.emptyStateDesc}>
                No accredited lab in {selectedRegion} matches the scope "{selectedProduct}". Try switching region to "All India".
              </Text>
              <TouchableOpacity 
                style={styles.resetBtn} 
                onPress={() => { setSelectedRegion('All India'); setSelectedProduct('All Standards'); }}
              >
                <Text style={styles.resetBtnText}>Reset Filters to All India</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredLabs.map(lab => (
              <View key={lab.id} style={styles.labCard}>
                <View style={styles.labHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.labName}>{lab.name}</Text>
                    <Text style={styles.labCityState}>{lab.city}, {lab.state}</Text>
                  </View>
                  {lab.isCurrentLocation && (
                    <View style={styles.nearPill}>
                      <Text style={styles.nearPillText}>Near You</Text>
                    </View>
                  )}
                </View>

                {lab.distance && (
                  <Text style={styles.distanceLine}>
                    Proximity: <Text style={styles.distanceVal}>{lab.distance}</Text>
                  </Text>
                )}

                <View style={styles.accreditationBox}>
                  <Text style={styles.accreditationText}>{lab.accreditation}</Text>
                </View>

                <View style={styles.addressLine}>
                  <Text style={styles.addressText}>{lab.address}</Text>
                </View>

                <View style={styles.scopeContainer}>
                  <Text style={styles.scopeHeader}>Accredited Testing Scope:</Text>
                  <View style={styles.scopeChips}>
                    {lab.scope.map((s, idx) => (
                      <View key={idx} style={styles.scopeChip}>
                        <Text style={styles.scopeText}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity 
                    style={styles.callBtn}
                    onPress={() => Linking.openURL(`tel:${lab.contact}`)}
                    activeOpacity={0.8}
                  >
                    <Phone size={13} color="#0F172A" />
                    <Text style={styles.callBtnText}>{lab.contact}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.mapsBtn}
                    onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(lab.name + ' ' + lab.address)}`)}
                    activeOpacity={0.8}
                  >
                    <Navigation size={13} color="#FFFFFF" />
                    <Text style={styles.mapsBtnText}>Open in Google Maps</Text>
                    <ExternalLink size={12} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
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
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  header: {
    gap: 4,
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

  // Location Banner
  locationBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 6,
  },
  locationBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationBannerLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
  },
  activePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activePillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#047857',
  },
  facilityName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  facilityDesc: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },

  // Filter Sections
  filterSection: {
    gap: 6,
  },
  filterSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  filterRow: {
    gap: 6,
    paddingRight: 10,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  filterChipActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  resultsSub: {
    fontSize: 11,
    color: '#64748B',
  },

  // Labs List
  labsList: {
    gap: 12,
  },
  labCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  labHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  labName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 19,
  },
  labCityState: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  nearPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  nearPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  distanceLine: {
    fontSize: 11,
    color: '#64748B',
  },
  distanceVal: {
    fontWeight: '700',
    color: '#0F172A',
  },
  accreditationBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  accreditationText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  addressLine: {
    paddingVertical: 2,
  },
  addressText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  scopeContainer: {
    gap: 4,
  },
  scopeHeader: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  scopeChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  scopeChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  scopeText: {
    fontSize: 10,
    color: '#334155',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  callBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  mapsBtn: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    paddingVertical: 9,
    borderRadius: 8,
  },
  mapsBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Empty State
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  emptyStateDesc: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  resetBtn: {
    marginTop: 8,
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
  },
  resetBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
