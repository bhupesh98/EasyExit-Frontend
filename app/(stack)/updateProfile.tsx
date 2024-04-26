import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, Alert, Linking } from 'react-native';
import CustomTextInput from '@/components/CustomTextInput';
import { Button, ButtonText, H6 } from 'tamagui';
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, PermissionStatus } from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '@/components/Avatar';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/services/api';

export default function Profile() {
  const [editable, setEditable] = React.useState<boolean>(false);
  const [profileLogo, setProfileLogo] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<number>(null);
  const [password, setPassword] = React.useState<string>(null);
  
  // const profile = {
  //   name: 'John Doe',
  //   email: 'john@doe.com',
  //   unrestrictedStartTime: new Date().toLocaleString(),
  //   unrestrictedEndTime: new Date().toLocaleString(),
  //   phoneNumber: '1234567890',
  // };

  const { mutateAsync } = useMutation({
    mutationKey: ['update', 'profile'],
    mutationFn: updateProfile,
    onSuccess() {
      Alert.alert('Profile Updated', 'Your profile has been updated successfully', [
        { text: 'OK', onPress: () => setEditable(false) },
      ]);
    },
  });

  const pickImage = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== PermissionStatus.GRANTED) {
      Alert.alert('Permission Denied', 'We need Camera Roll permission to upload images', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Go to Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    } else {
      const result = await launchImageLibraryAsync();

      if (!result.canceled) {
        setProfileLogo(result.assets[0].uri);
      }
    }
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
        {profileLogo ?
          <Avatar imageUri={profileLogo} onPress={pickImage} />
        : <Ionicons name='business' size={120} onPress={pickImage} />}
      </View>

      {/* Detail Sections */}
      <View style={styles.detailContainer}>
        <ScrollView>
          {/* Name */}
          <View style={styles.detailItem}>
            <H6>Name</H6>
            <CustomTextInput
              editable={false}
              value={name}
              placeholder='********'
              onChangeText={(text) => setName(text)}
              id='profile-Name'
            />
          </View>
          {/* Password */}
          <View style={styles.detailItem}>
            <H6>Password</H6>
            <CustomTextInput
              editable={false}
              value={password}
              placeholder='********'
              onChangeText={(text) => setPassword(text)}
              id='profile-Password'
              // onChangeText={handlePasswordChange}
              keyboardType='visible-password'
              secureTextEntry
            />
          </View>
          {/* Phone Number */}
          <View style={styles.detailItem}>
            <H6>Phone Number</H6>
            <CustomTextInput
              editable={editable}
              value={String(phoneNumber)}
              onChangeText={(text) => setPhoneNumber(parseInt(text))}
              placeholder='Phone Number'
              id='profile-phone'
              // onChangeText={handlePhoneNumberChange}
              keyboardType='phone-pad'
            />
          </View>
        </ScrollView>
        <Button
          onPress={() => {
            if (editable) {
              mutateAsync({ name, phoneNumber, password });
            }
            setEditable(!editable);
          }}
          ><ButtonText>{editable ? 'Save' : 'Edit'}</ButtonText></Button>
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
