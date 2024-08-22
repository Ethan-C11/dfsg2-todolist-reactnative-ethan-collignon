import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Todo List',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'list-outline' : 'list-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="newItem/index"
            options={{
                title: 'Nouvelle tache',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'add-outline' : 'add-outline'} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}
