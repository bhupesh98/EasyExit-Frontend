import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Button, ButtonText, Card, H2, H4, Separator, View, YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ImageBackground } from 'react-native';

export default function AdminHome() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fbfdff' }}>
      <View h='35%' w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
            <H2 col={'white'}>Welcome to EasyExit</H2>
            <H4 col={'white'}>Manage Your Outpass</H4>
          </View>
        </ImageBackground>
      </View>
      <Card
        w={'90%'}
        mt='$3'
        als='center'
        backgroundColor={'$blue6Dark'}
        bordered
        onPress={() => router.push('/addSupervisors')}
      >
        <Card.Header fd='row' jc='space-around' ai='center'>
          <YStack>
            <H2 col={'white'}>Add</H2>
            <H2 col={'white'}>Members</H2>
          </YStack>
          <Separator vertical als='stretch' />
          <Ionicons size={64} name='person-add-outline' color={'white'} />
          <Ionicons size={24} name='chevron-forward' color={'white'} />
        </Card.Header>
      </Card>
    </SafeAreaView>
  );
}
