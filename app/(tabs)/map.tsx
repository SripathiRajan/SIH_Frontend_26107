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
import { Phone, ExternalLink, Settings } from 'lucide-react-native';
import { TESTING_LABS } from '../../services/mockData';
import { useLanguage } from '../../context/LanguageContext';

export default function MapScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string>('All India');
  const [selectedProduct, setSelectedProduct] = useState<string>('All standards');

  const REGIONS = [
    'All India',
    'Tamil Nadu (current location)',
    'Delhi NCR',
    'Maharashtra',
    'Karnataka',
    'Gujarat',
    'West Bengal'
  ];

  const PRODUCTS = [
    'All standards',
    'Helmets (IS 4151)',
    'Flasks (IS 17803)',
    'Batteries (IS 16046)',
    'Electricals (IS 1293)',
    'Steel (IS 1786)'
  ];

  const filteredLabs = TESTING_LABS.filter(lab => {
    // Region match
    let matchRegion = true;
    if (selectedRegion === 'Tamil Nadu (current location)') {
      matchRegion = lab.state.includes('Tamil Nadu');
    } else if (selectedRegion !== 'All India') {
      matchRegion = lab.state.toLowerCase().includes(selectedRegion.toLowerCase()) || 
                    lab.city.toLowerCase().includes(selectedRegion.toLowerCase());
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
      {/* Fixed Top Header Panel with Top Right Settings Button */}
      <View style={styles.topHeader}>
        <View style={{ flex: 1, gap: 3, paddingRight: 12 }}>
          <Text style={styles.title}>{t('labs_title')}</Text>
          <Text style={styles.subtitle}>
            {t('labs_sub')}
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

        {/* Current Location & User Facility Banner */}
        <View style={styles.locationBanner}>
          <View style={styles.locationBannerTop}>
            <Text style={styles.locationBannerLabel}>{t('current_facility_label')}</Text>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>{t('primary_facility_badge')}</Text>
            </View>
          </View>
          <Text style={styles.facilityName}>Plot 42, SIDCO Guindy Industrial Estate, Chennai</Text>
          <Text style={styles.facilityDesc}>
            Laboratories within 15 km in the Chennai cluster are highlighted for rapid lot sampling and third-party surveillance clearances.
          </Text>
        </View>

        {/* Filter 1: State / Region */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>{t('filter_region')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {REGIONS.map(reg => {
              const isSelected = selectedRegion === reg;
              return (
                <TouchableOpacity
                  key={reg}
                  style={[styles.filterChip, isSelected && styles.filterChipActive]}
                  onPress={() => setSelectedRegion(reg)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
                    {reg}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Filter 2: Product Standard Scope */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>{t('filter_scope')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {PRODUCTS.map(prod => {
              const isSelected = selectedProduct === prod;
              return (
                <TouchableOpacity
                  key={prod}
                  style={[styles.filterChip, isSelected && styles.filterChipActive]}
                  onPress={() => setSelectedProduct(prod)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
                    {prod}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Results Counter */}
        <View style={styles.resultsBar}>
          <Text style={styles.resultsCount}>
            {t('showing_facilities')}: {filteredLabs.length}
          </Text>
        </View>

        {/* Labs List */}
        <View style={styles.labsList}>
          {filteredLabs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No testing facilities found</Text>
              <Text style={styles.emptyStateDesc}>
                No accredited lab in {selectedRegion} matches the scope "{selectedProduct}". Try switching region to "All India".
              </Text>
              <TouchableOpacity 
                style={styles.resetBtn} 
                onPress={() => { setSelectedRegion('All India'); setSelectedProduct('All standards'); }}
              >
                <Text style={styles.resetBtnText}>Reset filters to All India</Text>
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
                      <Text style={styles.nearPillText}>{t('near_you')}</Text>
                    </View>
                  )}
                </View>

                {lab.distance && (
                  <Text style={styles.distanceLine}>
                    <Text style={styles.distanceVal}>{t('proximity')}: </Text>
                    {lab.distance}
                  </Text>
                )}

                <View style={styles.accreditationBox}>
                  <Text style={styles.accreditationText}>{lab.accreditation}</Text>
                </View>

                <Text style={styles.addressText}>{lab.address}</Text>

                <View style={styles.scopeContainer}>
                  <Text style={styles.scopeHeader}>{t('accredited_scope_label')}</Text>
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
                    <Phone size={12} color="#0F172A" />
                    <Text style={styles.callBtnText}>{lab.contact}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.mapsBtn}
                    onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(lab.name + ' ' + lab.address)}`)}
                    activeOpacity={0.8}
                  >
                    <ExternalLink size={12} color="#FFFFFF" />
                    <Text style={styles.mapsBtnText}>{t('open_google_maps')}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },

  // Location Banner
  locationBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
    padding: 16,
    gap: 6,
  },
  locationBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationBannerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
    letterSpacing: 0.5,
  },
  activePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  facilityName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  facilityDesc: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 17,
  },

  // Filter Sections
  filterSection: {
    gap: 6,
  },
  filterSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  filterRow: {
    gap: 6,
    paddingRight: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    borderColor: '#1565C0',
    borderWidth: 1.5,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  filterChipTextActive: {
    color: '#1565C0',
    fontWeight: '700',
  },

  resultsBar: {
    paddingTop: 2,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  // Labs List
  labsList: {
    gap: 12,
  },
  labCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  labHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  labName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 19,
  },
  labCityState: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  nearPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  nearPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  distanceLine: {
    fontSize: 12,
    color: '#0F172A',
  },
  distanceVal: {
    fontWeight: '700',
    color: '#0F172A',
  },
  accreditationBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  accreditationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1565C0',
  },
  addressText: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 16,
  },
  scopeContainer: {
    gap: 4,
    marginTop: 2,
  },
  scopeHeader: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  scopeChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  scopeChip: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  scopeText: {
    fontSize: 11,
    color: '#1565C0',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  callBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  mapsBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#1565C0',
    paddingVertical: 9,
    borderRadius: 6,
  },
  mapsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Empty State
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  emptyStateDesc: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  resetBtn: {
    marginTop: 8,
    backgroundColor: '#1565C0',
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
