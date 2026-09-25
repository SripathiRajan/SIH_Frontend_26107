import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="vault" options={{ presentation: 'modal', title: 'Document Vault' }} />
        <Stack.Screen name="settings" options={{ presentation: 'card', title: 'Settings' }} />
      </Stack>
    </>
  );
}
