import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ScrollView, View, H2, H4 } from 'tamagui';
import CustomCardManager from '@/components/CustomCardManager';
import { useQuery } from '@tanstack/react-query';
import { getTokenStats } from '@/services/api';
import { router } from 'expo-router';

export default function ManagerHome() {
  const { data } = useQuery({
    queryKey: ['tokenStats'],
    queryFn: getTokenStats,
    // enabled:false
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#fbfdff' }}>
      <View h='35%' w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View style={styles.overlay}>
            <H2 col={'white'}>Welcome to EasyExit</H2>
            <H4 col={'white'}>Manage Your Outpass</H4>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{ width: '100%', padding: 10, flex: 1 }}>
        <CustomCardManager
          key={1}
          text='Check Pending OutPasses'
          number={data ? data.pending : 0}
          title='Pending'
          onPress={() => router.push('/(stack)/managerPending')}
        />
        <CustomCardManager
          key={2}
          text='Check Approved OutPasses'
          number={data ? data.approved : 0}
          title='Approved'
          onPress={() =>
            router.push({
              pathname: '/(stack)/managerHandledOutpasses',
              params: {
                type: 'accepted',
              },
            })
          }
        />
        <CustomCardManager
          key={3}
          text='Check Denied OutPasses'
          number={data ? data.denied : 0}
          title='Denied'
          onPress={() =>
            router.push({
              pathname: '/(stack)/managerHandledOutpasses',
              params: {
                type: 'rejected',
              },
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
