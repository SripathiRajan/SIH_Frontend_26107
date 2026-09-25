import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft
} from 'lucide-react-native';
import { VAULT_DOCS } from '../../services/mockData';

export default function VaultScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document Vault</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Upload Card */}
        <TouchableOpacity style={styles.uploadCard} activeOpacity={0.8}>
          <Text style={styles.uploadTitle}>Upload Certificate or Test Report</Text>
          <Text style={styles.uploadSub}>PDF, JPG or PNG up to 15MB · Instant OCR extraction</Text>
          <View style={styles.ocrBadge}>
            <Text style={styles.ocrBadgeText}>Legal Hash Verification Active</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Stored Certificates ({VAULT_DOCS.length})</Text>
        </View>

        <View style={styles.docsList}>
          {VAULT_DOCS.map(doc => (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docTop}>
                <View style={styles.catPill}>
                  <Text style={styles.catPillText}>{doc.category}</Text>
                </View>
                <View style={styles.verifiedPill}>
                  <Text style={styles.verifiedText}>{doc.status}</Text>
                </View>
              </View>

              <Text style={styles.docName}>{doc.name}</Text>
              <Text style={styles.docStandard}>{doc.standard}</Text>

              <View style={styles.docMeta}>
                <Text style={styles.metaRow}>License: <Text style={styles.metaBold}>{doc.licenseNo}</Text></Text>
                <Text style={styles.metaRow}>Valid Until: <Text style={styles.metaBold}>{doc.validTill}</Text></Text>
                <Text style={styles.hashText}>Hash: {doc.verificationHash}</Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.receiptBtn}>
                  <Text style={styles.receiptText}>Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.askBtn}
                  onPress={() => router.push('/(tabs)/ask')}
                >
                  <Text style={styles.askBtnText}>Ask AI</Text>
                </TouchableOpacity>
              </View>
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
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#CCFBF1',
    borderStyle: 'dashed',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    gap: 6,
  },
  uploadIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  uploadSub: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  ocrBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  ocrBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#312E81',
  },
  listHeader: {
    marginTop: 4,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  docsList: {
    gap: 12,
  },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  docTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  catPillText: {
    color: '#312E81',
    fontSize: 10,
    fontWeight: '700',
  },
  verifiedPill: {
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    color: '#0D9488',
    fontSize: 10,
    fontWeight: '700',
  },
  docName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  docStandard: {
    fontSize: 12,
    fontWeight: '700',
    color: '#312E81',
  },
  docMeta: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 10,
    gap: 3,
  },
  metaRow: {
    fontSize: 11,
    color: '#4B5563',
  },
  metaBold: {
    fontWeight: '700',
    color: '#111827',
  },
  hashText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 4,
  },
  receiptBtn: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  receiptText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  askBtn: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  askBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#312E81',
  },
});
