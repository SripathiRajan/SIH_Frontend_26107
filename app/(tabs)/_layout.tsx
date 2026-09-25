import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View, TouchableOpacity } from 'react-native';
import { MessageSquare, ClipboardList, Grid, User } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F1F5F9',
          borderTopWidth: 1,
          height: Platform.OS === 'web' ? 70 : 74,
          paddingBottom: Platform.OS === 'web' ? 6 : 10,
          paddingTop: 6,
          paddingHorizontal: 8,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.03,
          shadowRadius: 6,
          elevation: 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 2,
        },
        tabBarButton: (props: any) => {
          const focused = props.accessibilityState?.selected;
          return (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8}
              style={[
                props.style,
                {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 3,
                  marginVertical: 4,
                  paddingVertical: 5,
                  borderRadius: 12,
                  backgroundColor: focused ? '#EBF5FF' : 'transparent',
                },
              ]}
            >
              {props.children}
            </TouchableOpacity>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab_dashboard'),
          tabBarIcon: ({ color }) => (
            <View style={{ width: 17, height: 17, borderWidth: 1.8, borderColor: color, borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 7, height: 7, backgroundColor: color, borderRadius: 1 }} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ask"
        options={{
          title: t('tab_praman_ai'),
          tabBarIcon: ({ color }) => <MessageSquare size={19} color={color} />,
        }}
      />
      <Tabs.Screen
        name="standards"
        options={{
          title: t('tab_standards'),
          tabBarIcon: ({ color }) => <ClipboardList size={19} color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t('tab_services'),
          tabBarIcon: ({ color }) => (
            <View style={{ width: 17, height: 17, borderWidth: 1.8, borderColor: color, borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'absolute', width: 9, height: 1.8, backgroundColor: color }} />
              <View style={{ position: 'absolute', width: 1.8, height: 9, backgroundColor: color }} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t('tab_nabl_labs'),
          tabBarIcon: ({ color }) => <Grid size={19} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab_enterprise'),
          tabBarIcon: ({ color }) => <User size={19} color={color} />,
        }}
      />
      {/* Hidden legacy tab names */}
      <Tabs.Screen name="home" options={{ href: null }} />
      <Tabs.Screen name="history" options={{ href: null }} />
    </Tabs>
  );
}
