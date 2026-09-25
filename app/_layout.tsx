import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../context/LanguageContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="vault" options={{ presentation: 'modal', title: 'Document Vault' }} />
        <Stack.Screen name="settings" options={{ presentation: 'card', title: 'Settings' }} />
      </Stack>
    </LanguageProvider>
  );
}
