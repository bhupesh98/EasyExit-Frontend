import { ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Card,
  H2,
  H4,
  Heading,
  ListItem,
  Paragraph,
  Separator,
  ScrollView,
  Spinner,
  View,
  YGroup,
  YStack,
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Camera } from 'expo-camera/next';
import { useQuery } from '@tanstack/react-query';
import { getCheckedTokens } from '@/services/api';
import { colorName, iconName } from '@/constants/outPassStatus';
import NoDataSVG from '@/assets/no-data.svg';

export default function CheckerHome() {
  const handleScanQRCode = async () => {
    const { granted } = await Camera.getCameraPermissionsAsync();
    if (!granted) {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      if (!granted) return;
    }
    router.push('/scanQRcode');
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ['checkedOutpass', 'checker'],
    queryFn: () => getCheckedTokens(),
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', gap: 10, backgroundColor: '#fbfdff' }}>
      <View h={'35%'} w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View f={1} jc='center' ai='center' bg={'rgba(0,0,0,0.6)'}>
            <H2 fontWeight={'bold'} col={'white'}>
              Welcome to EasyExit
            </H2>
            <H4 col={'white'}>Manage Your Outpass</H4>
          </View>
        </ImageBackground>
      </View>
      <Card w={'90%'} backgroundColor={'$blue6Dark'} bordered onPress={handleScanQRCode}>
        <Card.Header fd='row' jc='space-around' ai='center'>
          <YStack>
            <H2 col={'white'}>Scan</H2>
            <H2 col={'white'}>Outpass</H2>
          </YStack>
          <Separator vertical als='stretch' />
          <Ionicons size={64} name='qr-code' color={'white'} />
          <Ionicons size={24} name='chevron-forward' color={'white'} />
        </Card.Header>
      </Card>
      <View ai='center' flex={1} w='90%' mb='$2' gap={10}>
        <Heading>Checked Outpasses</Heading>
        <ScrollView w={'100%'} showsVerticalScrollIndicator={false} bouncesZoom centerContent>
          {isLoading ?
            <Spinner size='large' />
          : data.length ?
            <YGroup width={'100%'} size='$5' separator={<Separator />}>
              {data.map(item => (
                <YGroup.Item key={item.token}>
                  <ListItem
                    bordered
                    bg={'#fbfdff'}
                    icon={<Ionicons name={iconName[item.status]} size={24} color={colorName[item.status]} />}
                    title={<H4>{item.heading}</H4>}
                    subTitle={
                      <YStack>
                        <Paragraph>
                          <Paragraph theme='alt2'>Exit Time: </Paragraph>
                          {item.exitTime?.toLocaleString()}
                        </Paragraph>
                        {item.returnedTime && (
                          <Paragraph>
                            <Paragraph theme='alt2'>Return Time: </Paragraph>
                            {item.returnedTime?.toLocaleString()}
                          </Paragraph>
                        )}
                      </YStack>
                    }
                  />
                </YGroup.Item>
              ))}
            </YGroup>
          : <View ai='center' f={1} pt='$5' gap={40}>
              <NoDataSVG width={170} height={170} />
              <H4 fontStyle='italic'>No data</H4>
            </View>
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
