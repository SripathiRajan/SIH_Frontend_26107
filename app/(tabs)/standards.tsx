import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Platform 
} from 'react-native';
import { 
  Search, 
  MapPin, 
  AlertTriangle, 
  Car, 
  Shield, 
  Zap, 
  Coffee, 
  ChevronRight,
  FileCheck2,
  Sparkles,
  ArrowRight
} from 'lucide-react-native';
import { Colors } from '../../constants/theme';
import { CATEGORIES } from '../../services/mockData';

export default function StandardsScreen() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();

    if (q.includes('bottle') || q.includes('flask') || q.includes('steel')) {
      setResult({
        product: 'Stainless Steel Water Bottles & Vacuum Flasks',
        isNumber: 'IS 17803:2022',
        status: 'Mandatory QCO',
        scheme: 'Scheme-I (ISI Mark Certification)',
        ministry: 'DPIIT Ministry of Commerce & Industry',
        gazette: 'S.O. 3144(E) dated 14-Jul-2023',
        rawMaterial: 'Food-Grade Stainless Steel (IS 6911:2017)',
        tests: 'Vacuum thermal retention (12h/24h) & drop leakage resistance'
      });
    } else if (q.includes('helmet') || q.includes('two wheeler')) {
      setResult({
        product: 'Protective Helmets for Two Wheeler Motorcyclists',
        isNumber: 'IS 4151:2015',
        status: 'Mandatory QCO',
        scheme: 'Scheme-I (ISI Mark Certification)',
        ministry: 'MoRTH (Ministry of Road Transport & Highways)',
        gazette: 'S.O. 4252(E) - Section 129 Motor Vehicles Act',
        rawMaterial: 'Max weight 1,200g with impact attenuation shell',
        tests: 'Rigid anvil impact test, retention chin strap micro-slip'
      });
    } else {
      setResult({
        product: query,
        isNumber: 'IS 1293:2019',
        status: 'Mandatory QCO',
        scheme: 'Scheme-I (ISI Mark)',
        ministry: 'DPIIT Electrical Appliances Order',
        gazette: 'Gazette S.O. 2020',
        rawMaterial: 'Insulated flame retardant thermoplastic',
        tests: 'Glow wire test & temperature rise under load'
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* GovTech Header */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Text style={styles.badgeText}>DPIIT & BIS REPOSITORY</Text>
          </View>
          <Text style={styles.title}>QCO Knowledge Graph & Standards</Text>
          <Text style={styles.subtitle}>
            Instantly map any product description to its applicable Indian Standard (IS Code), mandatory certification scheme, and enforcing ministry gazette.
          </Text>
        </View>

        {/* QCO Search Box */}
        <View style={styles.searchCard}>
          <Text style={styles.searchPrompt}>Enter product description or keyword:</Text>
          <View style={styles.inputContainer}>
            <Search size={16} color="#94A3B8" />
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="e.g. Stainless steel bottle, two wheeler helmet, plugs..."
              placeholderTextColor="#94A3B8"
              onSubmitEditing={handleSearch}
            />
          </View>

          <TouchableOpacity 
            style={styles.searchBtn} 
            onPress={handleSearch}
            activeOpacity={0.85}
          >
            <Sparkles size={16} color="#2DD4BF" />
            <Text style={styles.searchBtnText}>Run QCO Knowledge Graph Check</Text>
          </TouchableOpacity>
        </View>

        {/* Structured Result Card */}
        {result && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.resultTag}>RESOLVED CLASSIFICATION</Text>
                <Text style={styles.resultProduct}>{result.product}</Text>
              </View>
              <View style={styles.mandatoryBadge}>
                <Text style={styles.mandatoryText}>{result.status}</Text>
              </View>
            </View>

            <View style={styles.detailGrid}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>APPLICABLE STANDARD</Text>
                <Text style={styles.detailValBold}>{result.isNumber}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>CERTIFICATION SCHEME</Text>
                <Text style={styles.detailVal}>{result.scheme}</Text>
              </View>
            </View>

            <View style={styles.extraBox}>
              <Text style={styles.extraLabel}>Enforcing Gazette & Ministry:</Text>
              <Text style={styles.extraVal}>{result.ministry} ({result.gazette})</Text>
              <Text style={styles.extraLabel}>Mandatory Testing Scope:</Text>
              <Text style={styles.extraVal}>{result.tests}</Text>
            </View>
          </View>
        )}

        {/* Localized Geofence Notice */}
        <View style={styles.geoCard}>
          <View style={styles.geoTop}>
            <View style={styles.geoLeft}>
              <MapPin size={14} color="#0D9488" />
              <Text style={styles.geoTitle}>Regional Jurisdiction: Tamil Nadu (Chennai Hub)</Text>
            </View>
            <Text style={styles.geoLink}>Modify</Text>
          </View>
          <Text style={styles.geoDesc}>
            Prioritizes local state testing laboratories and South Zone enforcement deadlines.
          </Text>
        </View>

        {/* Standards Guidelines - BROWSE BY CATEGORY */}
        <View style={styles.categorySection}>
          <View style={styles.catHeaderRow}>
            <Text style={styles.categoryHeader}>STANDARDS DIVISIONS</Text>
            <Text style={styles.catCountTotal}>6 Central Councils</Text>
          </View>

          <View style={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity 
                key={cat.id} 
                style={styles.categoryCard}
                activeOpacity={0.8}
              >
                <View style={styles.catLeft}>
                  <View style={styles.catIconBox}>
                    {cat.id === 'cat-auto' && <Car size={18} color="#D97706" />}
                    {cat.id === 'cat-safety' && <Shield size={18} color="#0D9488" />}
                    {cat.id === 'cat-elec' && <Zap size={18} color="#4338CA" />}
                    {cat.id === 'cat-food' && <Coffee size={18} color="#059669" />}
                  </View>
                  <View>
                    <Text style={styles.catName}>{cat.name}</Text>
                    <Text style={styles.catCount}>{cat.count} published standards</Text>
                  </View>
                </View>
                <ChevronRight size={16} color="#CBD5E1" />
              </TouchableOpacity>
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
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    gap: 4,
  },
  badgeRow: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#312E81',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 17,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 16,
    gap: 10,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  searchPrompt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  searchBtn: {
    backgroundColor: '#1E1B4B',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  searchBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  resultTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4338CA',
    letterSpacing: 0.5,
  },
  resultProduct: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
  },
  mandatoryBadge: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mandatoryText: {
    color: '#92400E',
    fontSize: 10,
    fontWeight: '800',
  },
  detailGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  detailBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
  },
  detailValBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E1B4B',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  extraBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 10,
    gap: 2,
  },
  extraLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  extraVal: {
    fontSize: 11,
    color: '#0F172A',
    marginBottom: 4,
  },
  geoCard: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  geoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  geoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  geoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F766E',
  },
  geoLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  geoDesc: {
    fontSize: 10,
    color: '#115E59',
  },
  categorySection: {
    gap: 10,
    marginTop: 4,
  },
  catHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  catCountTotal: {
    fontSize: 11,
    color: '#94A3B8',
  },
  categoryGrid: {
    gap: 8,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  catIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  catCount: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
});
