import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ScrollView, View, H2, H4, Button, Text, H5 } from 'tamagui';
import { outPassStatus } from '@/constants/outPassStatus';
import { Ionicons } from '@expo/vector-icons';
import CustomCard from '@/components/CustomCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/services/api';
import { router } from 'expo-router';

export default function Home() {
  const [showOutPass, setShowOutPass] = React.useState<boolean>(false);
  const [tokenId, setTokenId] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      const tokenId = await AsyncStorage.getItem('tokenId');
      if (!tokenId) return;
      setTokenId(tokenId);
      setShowOutPass(true);
    })();
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getToken'],
    queryFn: () => getToken(tokenId),
    enabled: showOutPass
  });

  const handlePress = (status: string) => {
    if (status === 'Generate') {
      router.push('/generateOutpass');
      return;
    }
    let outpassType: string;
    if (status === 'Approved') outpassType = 'approvedOutpass';
    if (status === 'Denied') outpassType = 'rejectedOutpass';
    if (status === 'Pending') outpassType = 'pendingOutpass';
    router.push({
      pathname: '/(stack)/studentOutpasses',
      params: {
        outpassType: outpassType,
      },
    });
    return;
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1, alignItems: 'center' }}>
      <View h='35%' w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View style={styles.overlay}>
            <H2 fontWeight={'bold'} col={'white'}>
              Welcome to EasyExit
            </H2>
            <H4 col={'white'}>Manage Your Outpass</H4>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{ padding: 10 }}>
        {showOutPass && !isLoading && !isError &&(
          <CustomCard
            acceptedBy={data?.acceptedBy}
            endTime={data.endTime}
            heading={data.heading}
            phoneNumber={data?.phoneNumber}
            reason={data.reason}
            startTime={data.startTime}
            status={data.status}
            value={data.token}
          />
        )}
        <View fd='row' w={'100%'} jc='space-between' flexWrap='wrap' py='$2'>
          {outPassStatus.map(status => {
            return (
              <Button
                borderColor='$blue6Light'
                fd='column'
                h='$13'
                w={'48.5%'}
                mb='$3'
                backgroundColor={'#fbfdff'}
                key={status.id}
                onPress={() => handlePress(status.status)}
              >
                <Ionicons name={status.iconName} size={50} color={status.color} />
                <H5>{status.status}</H5>
                <Text textAlign='center'>{status.text}</Text>
              </Button>
            );
          })}
        </View>
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
