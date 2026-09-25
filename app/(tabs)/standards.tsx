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
import { 
  Search, 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react-native';
import { BIS_STANDARDS, CATEGORIES } from '../../services/mockData';

export default function StandardsScreen() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('Southern Zone · Tamil Nadu & Puducherry (CNBO)');
  const [showJurisdictionModal, setShowJurisdictionModal] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  const JURISDICTIONS = [
    { id: 'j-south', name: 'Southern Zone · Tamil Nadu & Puducherry (CNBO Hub)' },
    { id: 'j-north', name: 'Northern Zone · Delhi NCR, Punjab & Haryana (CL Sahibabad)' },
    { id: 'j-west', name: 'Western Zone · Maharashtra & Goa (Mumbai BO)' },
    { id: 'j-east', name: 'Eastern Zone · West Bengal & Odisha (Kolkata Hub)' },
    { id: 'j-south2', name: 'Southern Zone II · Karnataka & Kerala (Bengaluru BO)' },
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
        ministry: 'Ministry of Heavy Industries & DPIIT',
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
        tests: 'General chemical purity & dimensional endurance',
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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Standards & QCO Verification</Text>
          <Text style={styles.subtitle}>
            Official Bureau of Indian Standards (BIS) Registry & Quality Control Orders
          </Text>
        </View>

        {/* Search Card */}
        <View style={styles.searchCard}>
          <Text style={styles.searchPrompt}>Verify Product Compliance & Mandatory Standards</Text>
          <View style={styles.inputRow}>
            <Search size={18} color="#64748B" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="e.g. Helmet, IS 4151, Stainless steel bottle, Plugs..."
              placeholderTextColor="#94A3B8"
              onSubmitEditing={handleSearch}
            />
          </View>

          <TouchableOpacity 
            style={styles.searchBtn} 
            onPress={handleSearch}
            activeOpacity={0.85}
          >
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
              <Text style={styles.extraLabel}>Enforcing Authority & Gazette:</Text>
              <Text style={styles.extraVal}>{result.ministry} ({result.gazette})</Text>
              <Text style={styles.extraLabel}>Mandatory Testing Scope:</Text>
              <Text style={styles.extraVal}>{result.tests}</Text>
            </View>

            {/* Link to Official BIS Standard Registry */}
            {result.sourceUrl && (
              <TouchableOpacity 
                style={styles.sourceUrlBtn}
                onPress={() => Linking.openURL(result.sourceUrl)}
                activeOpacity={0.8}
              >
                <Text style={styles.sourceUrlBtnText}>Open Official BIS Standard Registry Page</Text>
                <ExternalLink size={13} color="#0D9488" />
              </TouchableOpacity>
            )}

            {/* Related Standards Cross-Reference */}
            {result.relatedStandards && result.relatedStandards.length > 0 && (
              <View style={styles.relatedBox}>
                <Text style={styles.relatedHeading}>RELATED & CROSS-REFERENCED STANDARDS</Text>
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
                            ministry: 'Ministry of Heavy Industries & DPIIT',
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

        {/* Meaningful Regulatory Jurisdiction Card */}
        <View style={styles.jurisdictionCard}>
          <View style={styles.jurisdictionTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.jurisdictionLabel}>REGULATORY JURISDICTION & ENFORCEMENT ZONE</Text>
              <Text style={styles.jurisdictionValue}>{selectedJurisdiction}</Text>
            </View>
            <TouchableOpacity 
              style={styles.modifyBtn}
              onPress={() => setShowJurisdictionModal(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.modifyBtnText}>Change Zone</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.jurisdictionDivider} />
          
          <Text style={styles.jurisdictionExplanation}>
            This setting configures your designated BIS Branch Office for annual surveillance audits, aligns state gazette enforcement cutoffs, and prioritizes third-party NABL testing laboratories within 250 km.
          </Text>
        </View>

        {/* Official BIS Standards Divisions (Real Data, Neatly Arranged) */}
        <View style={styles.categorySection}>
          <View style={styles.catHeaderRow}>
            <View>
              <Text style={styles.categoryHeader}>BIS STANDARDS DIVISION COUNCILS</Text>
              <Text style={styles.categorySub}>8 Central Technical Divisions · 14,000+ Indian Standards</Text>
            </View>
          </View>

          <View style={styles.divisionList}>
            {CATEGORIES.map(cat => {
              const isSelected = selectedDivision === cat.id;
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  style={[styles.divisionCard, isSelected && styles.divisionCardSelected]}
                  onPress={() => handleDivisionClick(cat)}
                  activeOpacity={0.8}
                >
                  <View style={styles.divisionTopRow}>
                    <View style={styles.divisionCodeBadge}>
                      <Text style={styles.divisionCodeText}>{cat.code}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.divisionName}>{cat.name}</Text>
                      <Text style={styles.divisionScope}>{cat.scope}</Text>
                    </View>
                    <View style={styles.divisionCountBadge}>
                      <Text style={styles.divisionCountText}>{cat.count.toLocaleString()} Standards</Text>
                    </View>
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
              <Text style={styles.modalTitle}>Select Regulatory Jurisdiction</Text>
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
    padding: 18,
    paddingBottom: 40,
    gap: 16,
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
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  searchBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Result Card
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#64748B',
  },
  resultProduct: {
    fontSize: 15,
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
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  detailValBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  detailVal: {
    fontSize: 11,
    color: '#334155',
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
    color: '#64748B',
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
    borderColor: '#E2E8F0',
    padding: 10,
    gap: 6,
  },
  relatedHeading: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
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
    borderColor: '#E2E8F0',
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

  // Jurisdiction Card
  jurisdictionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    gap: 10,
  },
  jurisdictionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  jurisdictionLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  jurisdictionValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  modifyBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modifyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  jurisdictionDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  jurisdictionExplanation: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },

  // Standards Divisions Section
  categorySection: {
    gap: 12,
  },
  catHeaderRow: {
    gap: 2,
  },
  categoryHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  categorySub: {
    fontSize: 11,
    color: '#64748B',
  },
  divisionList: {
    gap: 8,
  },
  divisionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
  },
  divisionCardSelected: {
    borderColor: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  divisionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divisionCodeBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    minWidth: 46,
    alignItems: 'center',
  },
  divisionCodeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
  divisionName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  divisionScope: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  divisionCountBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  divisionCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
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
    borderColor: '#E2E8F0',
  },
  jurisdictionOptionActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  jurisdictionOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  jurisdictionOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
