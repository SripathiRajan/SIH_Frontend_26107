import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft,
  Settings
} from 'lucide-react-native';
import { VAULT_DOCS } from '../../services/mockData';
import { Colors, Shadows } from '../../constants/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function VaultScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('vault_title')}</Text>
        <TouchableOpacity 
          onPress={() => router.push('/settings')} 
          style={styles.settingsBtn}
          activeOpacity={0.7}
          accessibilityLabel="Settings"
        >
          <Settings size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Upload Card */}
        <TouchableOpacity style={styles.uploadCard} activeOpacity={0.8}>
          <Text style={styles.uploadTitle}>{t('upload_doc_title')}</Text>
          <Text style={styles.uploadSub}>{t('upload_doc_sub')}</Text>
          <View style={styles.ocrBadge}>
            <Text style={styles.ocrBadgeText}>Legal Hash Verification Active</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>{t('stored_certs')} ({VAULT_DOCS.length})</Text>
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
    color: '#0F172A',
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  uploadCard: {
    backgroundColor: '#F0FDFA',
    borderWidth: 2,
    borderColor: '#99F6E4',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    gap: 6,
    ...Shadows.sm,
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
    color: '#0F172A',
  },
  uploadSub: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
  },
  ocrBadge: {
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  ocrBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  listHeader: {
    marginTop: 4,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  docsList: {
    gap: 12,
  },
  docCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 16,
    gap: 8,
    ...Shadows.sm,
  },
  docTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catPill: {
    backgroundColor: Colors.primaryMuted,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  catPillText: {
    color: Colors.primary,
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
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  verifiedText: {
    color: '#0D9488',
    fontSize: 10,
    fontWeight: '700',
  },
  docName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  docStandard: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  docMeta: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    gap: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metaRow: {
    fontSize: 11,
    color: '#475569',
  },
  metaBold: {
    fontWeight: '700',
    color: '#0F172A',
  },
  hashText: {
    fontSize: 10,
    color: '#94A3B8',
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
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
  },
  receiptText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  askBtn: {
    backgroundColor: Colors.primaryMuted,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
  },
  askBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
});
