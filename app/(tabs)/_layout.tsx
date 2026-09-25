import React from 'react';

import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { ShieldCheck, MessageSquare, FileCheck2, Building2, UserCheck } from 'lucide-react-native';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0D9488', // Mint Teal active indicator
        tabBarInactiveTintColor: '#64748B', // Slate muted
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          height: Platform.OS === 'web' ? 64 : 68,
          paddingBottom: Platform.OS === 'web' ? 8 : 12,
          paddingTop: 8,
          shadowColor: '#1E1B4B',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 4,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <ShieldCheck size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ask"
        options={{
          title: 'Praman AI',
          tabBarIcon: ({ color }) => <MessageSquare size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="standards"
        options={{
          title: 'Standards & QCO',
          tabBarIcon: ({ color }) => <FileCheck2 size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'NABL Labs',
          tabBarIcon: ({ color }) => <Building2 size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Enterprise',
          tabBarIcon: ({ color }) => <UserCheck size={22} color={color} />,
        }}
      />
      {/* Hidden legacy tab names */}
      <Tabs.Screen name="home" options={{ href: null }} />
      <Tabs.Screen name="history" options={{ href: null }} />
    </Tabs>
  );
}
