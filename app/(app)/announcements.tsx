import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AnnouncementItem from '../../components/AnnouncementItem';
import { ImageBackground } from 'react-native';
import { View, H2, H4 } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getItem } from 'expo-secure-store';
import { Role } from '@/constants/Role';

import { useQuery } from '@tanstack/react-query';

import { getNotification } from '@/services/api';
import * as SecureStore from 'expo-secure-store';

interface Announcement {
  title: string;
  description: string;
  topic: string;
  notificationStatus: string;
  senderEmail: string;
  createdAt: string;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const role = SecureStore.getItem('role');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const r = await getNotification();

        const response = await getNotification();

        setTimeout(() => {
          setAnnouncements(response);
        }, 5);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateNotification = () => {
    router.push('/createAnnouncement');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fbfdff' }}>
      <View h='35%' w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View style={styles.overlay}>
            <H2 col={'white'}>Notification</H2>
            <H4 col={'white'}>Timely Updates for You</H4>
          </View>
        </ImageBackground>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {announcements.map((announcement, index) => (
          <AnnouncementItem key={index} announcement={announcement} />
        ))}
      </ScrollView>
      {/* Floating button */}
      {role == Role.ADMIN && (
        <TouchableOpacity style={styles.floatingButton} onPress={handleCreateNotification}>
          <Ionicons name='add' size={24} color='#fff' />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
