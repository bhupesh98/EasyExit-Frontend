import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NotificationPopup from './NotificationPopup';

export interface Announcement {
  title: string;
  description: string;
  topic: string;
  notificationStatus: string;
  senderEmail: string;
  createdAt: string;
}

interface AnnouncementItemProps {
  announcement: Announcement;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ announcement }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'INITIATED':
        return '#E0E0E0'; // Grey color
      case 'SUCCESS':
        return '#C8E6C9'; // Light green color
      case 'FAILED':
        return '#FFCDD2'; // Light red color
      default:
        return '#FFFFFF'; // Default white color
    }
  };
  return (
    <TouchableOpacity onPress={togglePopup}>
      <View style={[styles.container, { backgroundColor: getStatusColor(announcement.notificationStatus) }]}>
        {/* Left section */}
        <View style={styles.leftSection}>
          <Text style={styles.title}>{announcement.title}</Text>
          <Text style={styles.description}>{announcement.description}</Text>
          <Text style={styles.detail}>From: {announcement.senderEmail}</Text>
        </View>
        {/* Right section */}
        <View style={styles.rightSection}>
          <Text style={[styles.detail, styles.createdAt]}>
            {new Date(announcement.createdAt).toLocaleString().replace(', ', '\n')}
          </Text>
        </View>
      </View>
      <NotificationPopup visible={popupVisible} announcement={announcement} onClose={togglePopup} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 3,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  detail: {
    fontStyle: 'italic',
    color: '#666',
  },
  status: {
    fontSize: 24, // Adjust size of status symbol
  },
  createdAt: {
    textAlign: 'right',
  },
});

export default AnnouncementItem;
