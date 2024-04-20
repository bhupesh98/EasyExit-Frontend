import { SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { H4, ScrollView, Spinner, View } from 'tamagui';
import OutpassCardManger from '@/components/OutpassCardManger';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getPendingOutPass } from '@/services/api';
import { OutpassResultsData } from '@/interfaces/ApiResults';
import { Role } from '@/constants/Role';
import NoDataSVG from '@/assets/no-data.svg';

export default function ApprovedOutpass() {
  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['getPendingTokens', Role.MANAGER],
    queryFn: getPendingOutPass,
  });

  // const data = {
  //   heading: 'Heading',
  //   requestedBy: 'Harshal',
  //   startTime: new Date(),
  //   endTime: new Date(),
  //   email: 'harshal@gmhnjkl;lkail.com',
  //   reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   phoneNo:'1234567890',
  //   profileImg:
  //     'data:image/jpeg;base64,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',
  // };

  React.useEffect(() => {
    (() => {
      refetch();
    })();
  }, []);

  const onOutPassPress = (data: OutpassResultsData & { name: string; profileImg: string }) => {
    router.push({
      pathname: '/(stack)/managerApproveOutPass',
      params: {
        heading: data.heading,
        name: data.name,
        startTime: new Date(data.startTime).toLocaleString(),
        endTime: new Date(data.endTime).toLocaleString(),
        email: data.email,
        reason: data.reason,
        profileImg: data.profileImg,
        phoneNumber: data.phoneNumber,
        token: data.token,
      },
    });
  };

  return (
    <ScrollView bg={'#fbfdff'}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#fbfdff', padding: 10 }}>
        {isPending ?
          <Spinner size='large' color='$blue1Dark' />
        : data.length === 0 ?
          <View ai='center' pt='$5' gap={40}>
            <NoDataSVG width={170} height={170} />
            <H4 fontStyle='italic'>No data</H4>
          </View>
        : data.map((value, index) => (
            <OutpassCardManger
              key={value.token}
              email={value.email}
              endTime={value.endTime}
              heading={value.heading}
              phoneNumber={value.phoneNumber}
              name={value.name}
              startTime={value.startTime}
              value={value.token}
              onPressCard={() => onOutPassPress(value)}
              doRefetch={refetch}
            />
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
