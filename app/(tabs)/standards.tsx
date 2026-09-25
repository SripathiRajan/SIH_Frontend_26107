import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Modal,
  Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Search, 
  ArrowRight,
  ExternalLink,
  X,
  Settings
} from 'lucide-react-native';
import { BIS_STANDARDS, CATEGORIES } from '../../services/mockData';
import { Tints } from '../../constants/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function StandardsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('Southern zone · Tamil Nadu and Puducherry (CNBO)');
  const [showJurisdictionModal, setShowJurisdictionModal] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const JURISDICTIONS = [
    { id: 'j-south', name: 'Southern zone · Tamil Nadu and Puducherry (CNBO)' },
    { id: 'j-north', name: 'Northern zone · Delhi NCR, Punjab and Haryana (CL Sahibabad)' },
    { id: 'j-west', name: 'Western zone · Maharashtra and Goa (Mumbai BO)' },
    { id: 'j-east', name: 'Eastern zone · West Bengal and Odisha (Kolkata Hub)' },
    { id: 'j-south2', name: 'Southern zone II · Karnataka and Kerala (Bengaluru BO)' },
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const matched = BIS_STANDARDS.find(s => 
      s.isNumber.toLowerCase().includes(q) || 
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );

    if (matched) {
      setResult({
        product: matched.title,
        isNumber: matched.isNumber,
        status: matched.qcoStatus.toUpperCase() + ' (ISI Scheme-I)',
        scheme: matched.applicableScheme,
        ministry: 'Ministry of Heavy Industries and DPIIT',
        gazette: matched.version,
        tests: matched.testParams.join(', '),
        sourceUrl: matched.sourceUrl,
        relatedStandards: matched.relatedStandards
      });
    } else {
      setResult({
        product: query,
        isNumber: 'Under Evaluation',
        status: 'VOLUNTARY STANDARD',
        scheme: 'Scheme-I / Scheme-IV',
        ministry: 'BIS Standards Promotion Council',
        gazette: 'Consult latest gazette amendment',
        tests: 'General chemical purity and dimensional endurance',
        sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/',
        relatedStandards: []
      });
    }
  };

  const handleDivisionClick = (div: typeof CATEGORIES[0]) => {
    setSelectedDivision(selectedDivision === div.id ? null : div.id);
    setQuery(div.code);
    const matched = BIS_STANDARDS.find(s => s.divisionCode === div.code);
    if (matched) {
      setResult({
        product: matched.title,
        isNumber: matched.isNumber,
        status: matched.qcoStatus.toUpperCase() + ' (ISI Scheme-I)',
        scheme: matched.applicableScheme,
        ministry: 'Central Government Gazette',
        gazette: matched.version,
        tests: matched.testParams.join(', '),
        sourceUrl: matched.sourceUrl,
        relatedStandards: matched.relatedStandards
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Top Header Panel with Top Right Settings Button */}
      <View style={styles.topHeader}>
        <View style={{ flex: 1, gap: 3, paddingRight: 12 }}>
          <Text style={styles.title}>{t('standards_title')}</Text>
          <Text style={styles.subtitle}>
            {t('standards_sub')}
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
        
        {/* Scheme Selector Tabs */}
        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8, paddingHorizontal: 2 }}>
          {[
            { label: 'All Schemes', filter: 'all' },
            { label: 'Scheme-I (ISI)', filter: 'Scheme-I' },
            { label: 'Scheme-II (CRS)', filter: 'CRS' },
            { label: 'Hallmarking', filter: 'Hallmarking' }
          ].map((tab, tidx) => (
            <TouchableOpacity
              key={tidx}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 20,
                backgroundColor: query.includes(tab.filter) || (tab.filter === 'all' && !query) ? '#0D9488' : '#F1F5F9',
                borderWidth: 1,
                borderColor: query.includes(tab.filter) || (tab.filter === 'all' && !query) ? '#0D9488' : '#CBD5E1'
              }}
              onPress={() => {
                if (tab.filter === 'all') {
                  setQuery('');
                  setResult(null);
                } else {
                  setQuery(tab.filter);
                  const matched = BIS_STANDARDS.find(s => s.applicableScheme.toLowerCase().includes(tab.filter.toLowerCase()));
                  if (matched) {
                    setResult({
                      product: matched.title,
                      isNumber: matched.isNumber,
                      status: matched.qcoStatus.toUpperCase() + ` (${matched.applicableScheme})`,
                      scheme: matched.applicableScheme,
                      ministry: 'Central Government Gazette',
                      gazette: matched.version,
                      tests: matched.testParams.join(', '),
                      sourceUrl: matched.sourceUrl,
                      relatedStandards: matched.relatedStandards
                    });
                  }
                }
              }}
            >
              <Text style={{
                fontSize: 11,
                fontWeight: '700',
                color: query.includes(tab.filter) || (tab.filter === 'all' && !query) ? '#FFFFFF' : '#475569'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Search Card */}
        <View style={styles.searchCard}>
          <Text style={styles.searchPrompt}>{t('verify_compliance_prompt')}</Text>
          <View style={styles.inputRow}>
            <Search size={16} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder={t('standards_input_placeholder')}
              placeholderTextColor="#9CA3AF"
              onSubmitEditing={handleSearch}
            />
          </View>

          <TouchableOpacity 
            style={styles.searchBtn} 
            onPress={handleSearch}
            activeOpacity={0.85}
          >
            <Text style={styles.searchBtnText}>{t('run_qco_check_btn')}</Text>
          </TouchableOpacity>
        </View>

        {/* Structured Result Card */}
        {result && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.resultTag}>{t('resolved_classification')}</Text>
                <Text style={styles.resultProduct}>{result.product}</Text>
              </View>
              <View style={styles.mandatoryBadge}>
                <Text style={styles.mandatoryText}>{result.status}</Text>
              </View>
              <TouchableOpacity onPress={() => setResult(null)} style={{ padding: 4 }}>
                <X size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.detailGrid}>
              <View style={[styles.detailBox, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
                <Text style={[styles.detailLabel, { color: '#1565C0' }]}>{t('applicable_standard')}</Text>
                <Text style={[styles.detailValBold, { color: '#1E3A8A' }]}>{result.isNumber}</Text>
              </View>
              <View style={[styles.detailBox, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                <Text style={[styles.detailLabel, { color: '#047857' }]}>{t('certification_scheme')}</Text>
                <Text style={[styles.detailVal, { color: '#065F46', fontWeight: '700' }]}>{result.scheme}</Text>
              </View>
            </View>

            <View style={styles.extraBox}>
              <Text style={styles.extraLabel}>{t('enforcing_authority')}</Text>
              <Text style={styles.extraVal}>{result.ministry} ({result.gazette})</Text>
              <Text style={styles.extraLabel}>{t('mandatory_testing_scope')}</Text>
              <Text style={styles.extraVal}>{result.tests}</Text>
            </View>

            {/* Link to Official BIS Standard Registry */}
            {result.sourceUrl && (
              <TouchableOpacity 
                style={styles.sourceUrlBtn}
                onPress={() => Linking.openURL(result.sourceUrl)}
                activeOpacity={0.8}
              >
                <Text style={styles.sourceUrlBtnText}>{t('open_bis_registry')}</Text>
                <ExternalLink size={13} color="#0D9488" />
              </TouchableOpacity>
            )}

            {/* Related Standards Cross-Reference */}
            {result.relatedStandards && result.relatedStandards.length > 0 && (
              <View style={styles.relatedBox}>
                <Text style={styles.relatedHeading}>{t('related_standards')}</Text>
                <View style={styles.relatedChipsRow}>
                  {result.relatedStandards.map((std: string, idx: number) => (
                    <TouchableOpacity 
                      key={idx}
                      style={styles.relatedChip}
                      onPress={() => {
                        const parts = std.split(' ');
                        const isCode = parts.slice(0, 2).join(' ');
                        setQuery(isCode);
                        const matchedStd = BIS_STANDARDS.find(s => s.isNumber.toLowerCase().includes(isCode.toLowerCase()));
                        if (matchedStd) {
                          setResult({
                            product: matchedStd.title,
                            isNumber: matchedStd.isNumber,
                            status: matchedStd.qcoStatus.toUpperCase() + ' (ISI Scheme-I)',
                            scheme: matchedStd.applicableScheme,
                            ministry: 'Ministry of Heavy Industries and DPIIT',
                            gazette: matchedStd.version,
                            tests: matchedStd.testParams.join(', '),
                            sourceUrl: matchedStd.sourceUrl,
                            relatedStandards: matchedStd.relatedStandards
                          });
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.relatedChipText}>{std}</Text>
                      <ArrowRight size={11} color="#0D9488" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Regulatory Jurisdiction Card */}
        <View style={styles.jurisdictionCard}>
          <View style={styles.jurisdictionTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.jurisdictionLabel}>{t('jurisdiction_label')}</Text>
              <Text style={styles.jurisdictionValue}>{selectedJurisdiction}</Text>
            </View>
            <TouchableOpacity 
              style={styles.modifyBtn}
              onPress={() => setShowJurisdictionModal(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.modifyBtnText}>{t('change_zone_btn')}</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.jurisdictionExplanation}>
            {t('jurisdiction_desc')}
          </Text>
        </View>

        {/* BIS Standards Division Councils */}
        <View style={styles.categorySection}>
          <View style={styles.catHeaderRow}>
            <Text style={styles.categoryHeader}>{t('division_councils_title')}</Text>
            <Text style={styles.categorySub}>{t('division_councils_sub')}</Text>
          </View>

          <View style={styles.divisionList}>
            {CATEGORIES.slice(0, 6).map(cat => {
              const isSelected = selectedDivision === cat.id;
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  style={[styles.divisionCard, isSelected && styles.divisionCardSelected]}
                  onPress={() => handleDivisionClick(cat)}
                  activeOpacity={0.8}
                >
                  <View style={styles.divisionCodeBadge}>
                    <Text style={styles.divisionCodeText}>{cat.code}</Text>
                  </View>
                  <View style={styles.divisionInfo}>
                    <Text style={styles.divisionName}>{cat.name}</Text>
                    <Text style={styles.divisionScope}>{cat.scope}</Text>
                  </View>
                  <View style={styles.divisionCountBadge}>
                    <Text style={styles.divisionCountText}>{cat.count.toLocaleString()} {t('standards_count_suffix')}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Jurisdiction Change Modal */}
      <Modal
        visible={showJurisdictionModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowJurisdictionModal(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select regulatory jurisdiction</Text>
              <TouchableOpacity onPress={() => setShowJurisdictionModal(false)}>
                <X size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalList}>
              {JURISDICTIONS.map(j => (
                <TouchableOpacity
                  key={j.id}
                  style={[
                    styles.jurisdictionOption,
                    selectedJurisdiction === j.name && styles.jurisdictionOptionActive
                  ]}
                  onPress={() => {
                    setSelectedJurisdiction(j.name);
                    setShowJurisdictionModal(false);
                  }}
                >
                  <Text style={[
                    styles.jurisdictionOptionText,
                    selectedJurisdiction === j.name && styles.jurisdictionOptionTextActive
                  ]}>
                    {j.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
  scrollContent: {
    padding: 16,
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
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  searchPrompt: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  searchBtn: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Jurisdiction Card
  jurisdictionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 8,
  },
  jurisdictionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  jurisdictionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  jurisdictionValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 4,
  },
  modifyBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modifyBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  jurisdictionExplanation: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 17,
  },

  // Standards Divisions Section
  categorySection: {
    gap: 12,
  },
  catHeaderRow: {
    gap: 2,
  },
  categoryHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  categorySub: {
    fontSize: 12,
    color: '#6B7280',
  },
  divisionList: {
    gap: 8,
  },
  divisionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divisionCardSelected: {
    borderColor: '#1565C0',
    backgroundColor: '#F8FAFC',
  },
  divisionCodeBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divisionCodeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1565C0',
  },
  divisionInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  divisionName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  divisionScope: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 3,
  },
  divisionCountBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  divisionCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1565C0',
  },

  // Result Card
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  resultTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#6B7280',
  },
  resultProduct: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  mandatoryBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  mandatoryText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#047857',
  },
  detailGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  detailBox: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '700',
  },
  detailValBold: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  detailVal: {
    fontSize: 11,
    marginTop: 2,
  },
  extraBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    gap: 4,
  },
  extraLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
  },
  extraVal: {
    fontSize: 11,
    color: '#0F172A',
    marginBottom: 4,
  },
  sourceUrlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  sourceUrlBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },
  relatedBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    gap: 6,
  },
  relatedHeading: {
    fontSize: 9,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  relatedChipsRow: {
    gap: 6,
  },
  relatedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  relatedChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    gap: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalList: {
    gap: 8,
  },
  jurisdictionOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  jurisdictionOptionActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1565C0',
  },
  jurisdictionOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  jurisdictionOptionTextActive: {
    color: '#1565C0',
    fontWeight: '700',
  },
});
