import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import CustomTextInput from '@/components/CustomTextInput';
import { H6 } from 'tamagui';

export default function Profile() {
  const [editable, setEditable] = React.useState<boolean>(false);
  const profile = {
    name: 'John Doe',
    email: 'john@doe.com',
    unrestrictedStartTime: new Date().toLocaleString(),
    unrestrictedEndTime: new Date().toLocaleString(),
    phoneNumber: '1234567890',
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.divider}></View>
      </View>

      {/* Profile Photo and Basic Info */}
      <View style={styles.basicInfoContainer}>
        <Image source={require('@/assets/profile_photo.jpg')} style={styles.profilePhoto} />
        <View style={styles.basicInfo}>
          <Text style={styles.name}>Name: {profile.name}</Text>
        </View>
      </View>

      {/* Detail Sections */}
      <View style={styles.detailContainer}>
        <ScrollView>
          {/* Unrestricted Start Time */}
          <View style={styles.detailItem}>
            <H6>Unrestricted Start Time</H6>
            <CustomTextInput
              editable={editable}
              value={profile.unrestrictedStartTime}
              placeholder='Unrestricted Start Time'
              id='profile-start-time'
              // onChangeText={handleStartTimeChange}
            />
          </View>
          {/* Unrestricted End Time */}
          <View style={styles.detailItem}>
            <H6>Unrestricted End Time</H6>
            <CustomTextInput
              editable={editable}
              value={profile.unrestrictedEndTime}
              placeholder='Unrestricted End Time'
              id='profile-end-time'
              // onChangeText={handleEndTimeChange}
            />
          </View>
          {/* Email */}
          <View style={styles.detailItem}>
            <H6>Email</H6>
            <CustomTextInput
              editable={editable}
              value={profile.email}
              placeholder='Email'
              id='profile-email'
              // onChangeText={handleEmailChange}
              keyboardType='email-address'
            />
          </View>
          {/* Phone Number */}
          <View style={styles.detailItem}>
            <H6>Phone Number</H6>
            <CustomTextInput
              editable={editable}
              value={profile.phoneNumber}
              placeholder='Phone Number'
              id='profile-phone'
              // onChangeText={handlePhoneNumberChange}
              keyboardType='phone-pad'
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfdff',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  basicInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 20,
  },
  basicInfo: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  detailContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  detailText: {
    fontSize: 18,
    color: 'black',
  },
});
