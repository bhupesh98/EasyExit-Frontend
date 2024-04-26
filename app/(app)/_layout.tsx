import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getItem } from 'expo-secure-store';
import { Role } from '@/constants/Role';
import { StatusBar } from 'expo-status-bar';

export default function HomeLayout() {
  const role = getItem('role');

  return (
    <>
      <StatusBar backgroundColor='#0e294b' style='light' />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#fbfdff',
            height: 65,
            paddingTop: 10,
          },
          headerShown: false,
          tabBarActiveTintColor: '#0e294b',
          tabBarInactiveTintColor: 'grey',
          tabBarLabel: '',
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name='adminHome'
          redirect={role !== Role.ADMIN}
          options={{
            title: 'Home',
            tabBarIcon({ focused, color, size }) {
              return <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name='checkerHome'
          redirect={role !== Role.CHECKER}
          options={{
            title: 'Home',
            tabBarIcon({ focused, color, size }) {
              return <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name='home'
          redirect={role !== Role.USER}
          options={{
            title: 'Home',
            tabBarIcon({ focused, color, size }) {
              return <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name='managerHome'
          redirect={role !== Role.MANAGER}
          options={{
            title: 'Home',
            tabBarIcon({ focused, color, size }) {
              return <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name='announcements'
          // redirect={role === Role.ADMIN}
          options={{
            title: 'Announcements',
            tabBarIcon({ focused, color, size }) {
              return <Ionicons name={focused ? 'notifications' : 'notifications-outline'} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name='createAnnouncement'
          // redirect={role !== Role.ADMIN}
          options={{
            title: 'Create Announcement',
            tabBarIcon({ focused, color, size }) {
              return <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name='profile2'
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#0e294b',
            },
            headerTitleStyle: {
              color: 'white',
            },
            title: 'My Profile',
            tabBarIcon({ focused, color, size }) {
              return <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}
