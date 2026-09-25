import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { useLanguage, LANGUAGES, LanguageCode } from '../context/LanguageContext';

export default function LanguageSelectorBar() {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.pill, isSelected ? styles.pillActive : styles.pillInactive]}
              onPress={() => setLanguage(lang.code)}
              activeOpacity={0.8}
            >
              <Text style={[styles.pillText, isSelected ? styles.pillTextActive : styles.pillTextInactive]}>
                {lang.nativeName}
              </Text>
              {isSelected && (
                <CheckCircle2 size={13} color="#FFFFFF" style={{ marginLeft: 5 }} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  scrollList: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  pillActive: {
    backgroundColor: '#1565C0',
  },
  pillInactive: {
    backgroundColor: '#F1F5F9',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  pillTextInactive: {
    color: '#1E293B',
  },
});
