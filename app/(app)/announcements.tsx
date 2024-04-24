import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AnnouncementItem from '../../components/AnnouncementItem';
import { ImageBackground } from 'react-native';
import { View, H2, H4 } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Announcement {
  title: string;
  description: string;
  topic: string;
  notificationStatus: string;
  senderEmail: string;
  createdAt: string;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = {
          status: 'OK',
          message: 'Notifications received successfully',
          data: [
            {
              notificationId: 'ec7bd277-f8d1-473c-b5d5-219064459fa6',
              title: 'IMPORT mess',
              description: 'not imp',
              organizationId: 'a020592e-1537-4672-aa3e-743db0e1fcf2',
              topic: 'ann',
              notificationStatus: 'INITIATED',
              senderEmail: 'bhupesh@gmail.com',
              createdAt: '2024-04-17T06:56:36.109Z',
            },
            {
              notificationId: '2acfa330-8644-4e41-94b7-d7d355069932',
              title: 'IMPORT mess',
              description: 'not imp',
              organizationId: 'a020592e-1537-4672-aa3e-743db0e1fcf2',
              topic: 'ann',
              notificationStatus: 'SUCCESS',
              senderEmail: 'bhupesh@gmail.com',
              createdAt: '2024-04-17T06:56:22.535Z',
            },
            {
              notificationId: '24acbe26-e6f4-4123-ab40-ab26034d402e',
              title: 'IMPORT mess',
              description: 'not imp',
              organizationId: 'a020592e-1537-4672-aa3e-743db0e1fcf2',
              topic: 'ann',
              notificationStatus: 'FAILED',
              senderEmail: 'bhupesh@gmail.com',
              createdAt: '2024-04-17T06:22:11.915Z',
            },
          ],
        };

        setTimeout(() => {
          setAnnouncements(response.data);
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
      <TouchableOpacity style={styles.floatingButton} onPress={handleCreateNotification}>
        <Ionicons name='add' size={24} color='#fff' />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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

export default Announcements;
