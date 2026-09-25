import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Globe, 
  Bell, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  RefreshCw,
  Settings
} from 'lucide-react-native';
import { Colors, Shadows } from '../../constants/theme';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [gazetteAlerts, setGazetteAlerts] = useState(true);
  const [auditReminders, setAuditReminders] = useState(true);
  const [offlineSyncDone, setOfflineSyncDone] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings_title')}</Text>
        <View style={styles.settingsBtn}>
          <Settings size={18} color="#1565C0" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Language & Dialect Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Globe size={18} color="#1565C0" />
            <Text style={styles.cardTitle}>{t('app_language_title')}</Text>
          </View>
          <Text style={styles.cardSub}>
            {t('app_language_sub')}
          </Text>

          <View style={styles.langGrid}>
            {LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <TouchableOpacity 
                  key={lang.code} 
                  style={[styles.langBtn, isSelected && styles.langBtnActive]}
                  onPress={() => setLanguage(lang.code)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.langBtnText, isSelected && styles.langBtnTextActive]}>
                    {lang.nativeName}
                  </Text>
                  {isSelected && (
                    <CheckCircle2 size={13} color="#FFFFFF" style={{ marginLeft: 4 }} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Regulatory Notifications */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Bell size={18} color="#0D9488" />
            <Text style={styles.cardTitle}>{t('notifications_title')}</Text>
          </View>

          <View style={styles.toggleRow}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.toggleLabel}>{t('gazette_alerts')}</Text>
              <Text style={styles.toggleSub}>{t('gazette_alerts_sub')}</Text>
            </View>
            <Switch 
              value={gazetteAlerts} 
              onValueChange={setGazetteAlerts}
              trackColor={{ false: '#E2E8F0', true: '#1565C0' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.toggleRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.toggleLabel}>{t('audit_reminders')}</Text>
              <Text style={styles.toggleSub}>{t('audit_reminders_sub')}</Text>
            </View>
            <Switch 
              value={auditReminders} 
              onValueChange={setAuditReminders}
              trackColor={{ false: '#E2E8F0', true: '#1565C0' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* 3. Offline Data & Sync */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <RefreshCw size={18} color="#D97706" />
            <Text style={styles.cardTitle}>Offline Standards Database</Text>
          </View>
          <Text style={styles.cardSub}>
            Cache active Indian Standards (IS codes and test scopes) on your device for access during factory inspections with low network.
          </Text>

          <TouchableOpacity 
            style={styles.syncBtn} 
            onPress={() => setOfflineSyncDone(true)}
            activeOpacity={0.8}
          >
            <RefreshCw size={14} color="#D97706" />
            <Text style={styles.syncBtnText}>
              {offlineSyncDone ? 'Offline DB Synced (21,480 Standards)' : 'Sync Offline Database Cache'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4. DPDP Act 2023 Enterprise Data Sovereignty */}
        <View style={styles.dpdpCard}>
          <View style={styles.dpdpHeader}>
            <Lock size={16} color="#1E1B4B" />
            <Text style={styles.dpdpTitle}>DPDP Act 2023 Enterprise Data Sovereignty</Text>
          </View>
          <Text style={styles.dpdpText}>
            Praman executes on-device or locally hosted model tiers. Uploaded certificates, test reports, and factory blueprints are <Text style={styles.boldText}>never stored on public AI models or used for LLM retraining</Text>. All uploads auto-purge upon request.
          </Text>
        </View>

        {/* 5. Switch Profile / Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <LogOut size={16} color="#DC2626" />
          <Text style={styles.logoutText}>Switch Enterprise Profile / Logout</Text>
        </TouchableOpacity>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 18,
    gap: 12,
    ...Shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  langBtnActive: {
    backgroundColor: '#1565C0',
    ...Shadows.sm,
  },
  langBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  langBtnTextActive: {
    color: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  toggleSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 15,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  syncBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  dpdpCard: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  dpdpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dpdpTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  dpdpText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  boldText: {
    fontWeight: '700',
    color: '#1E1B4B',
  },
  logoutBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
});
