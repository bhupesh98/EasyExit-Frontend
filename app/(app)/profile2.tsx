import { Role } from '@/constants/Role';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { H6 } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { toCapitalize } from '@/utils/toCapitalize';

const Profile = () => {
  const profile = {
    name: 'Bhupesh Dewangan',
    email: 'bhupeshdewangan20@gmail.com',
    unrestrictedStartTime: new Date().toLocaleString(),
    unrestrictedEndTime: new Date().toLocaleString(),
    phoneNumber: '1234567890',
    role: Role.USER,
    organization: 'IIITA'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Background Design */}
        <View style={styles.background}></View>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <Image source={require('./profile_photo.jpg')} style={styles.profilePhoto} />
            <View style={styles.basicInfo}>
              <Text style={styles.name}>{profile.name}</Text>
              <View style={styles.roleBadge}>
                <Ionicons name="person-circle-outline" size={24} color="#35ABFF" />
                <Text style={styles.roleBadgeText}>{toCapitalize(profile.role)}</Text>
              </View>
            </View>
          </View>
          {/* Basic Info */}
          <View style={styles.detailContainer}>
            <View style={styles.detailBox}>
              <View style={styles.detailRow}>
                <Ionicons name="mail-outline" size={32} color="#007bff" style={{ marginRight: 10 }} />
                <View>
                  <H6>Email</H6>
                  <Text style={styles.detailText}>{profile.email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailBox}>
              <View style={styles.detailRow}>
                <Ionicons name="call-outline" size={32} color="#007bff" style={{ marginRight: 10 }} />
                <View>
                  <H6>Phone Number</H6>
                  <Text style={styles.detailText}>{profile.phoneNumber}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Additional Details */}
          <View style={styles.detailContainer}>
            <View style={styles.detailBox}>
              <View style={styles.detailRow}>
                <Ionicons name="business-outline" size={32} color="#007bff" style={{ marginRight: 10 }} />
                <View>
                  <H6>Organization</H6>
                  <Text style={styles.detailText}>{profile.organization}</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailBox}>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={32} color="#007bff" style={{ marginRight: 10 }} />
                <View>
                  <H6>Unrestricted Start Time</H6>
                  <Text style={styles.detailText}>{profile.unrestrictedStartTime}</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailBox}>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={32} color="#007bff" style={{ marginRight: 10 }} />
                <View>
                  <H6>Unrestricted End Time</H6>
                  <Text style={styles.detailText}>{profile.unrestrictedEndTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    backgroundColor: '#add8e6',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    zIndex: -1,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  profileCard: {
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginRight: 20,
  },
  basicInfo: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  detailContainer: {
    marginBottom: 10,
  },
  detailBox: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 20,
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0075CA2E',
    borderColor: '#35ABFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  roleBadgeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#35ABFF',
    marginLeft: 5,
  },
});

export default Profile;
