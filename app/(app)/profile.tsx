import { Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from 'tamagui';
import { router } from 'expo-router';
import { deleteItemAsync } from 'expo-secure-store';

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Profile</Text>
      <Button onPress={async () => {
        await deleteItemAsync('token');
        await deleteItemAsync('role');
        router.replace('/');
      }}><ButtonText>Logout</ButtonText></Button>
    </SafeAreaView>
  );
}
