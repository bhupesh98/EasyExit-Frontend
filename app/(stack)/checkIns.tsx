import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Spinner, H4, View } from 'tamagui';
import { getCheckIns } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Role } from '@/constants/Role';
import AdminCard from '@/components/AdminCard';
import NoDataSVG from '@/assets/no-data.svg';

export default function CheckIns() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['checkin', Role.ADMIN],
    queryFn: getCheckIns,
  });

  // const data = [
  //   {
  //     name: 'John Doe',
  //     email: 'john@doe.com',
  //     phoneNumber: 1234567890,
  //     heading: 'Heading',
  //     exitTime: new Date(),
  //     returnTime: new Date(),
  //     status: TokenStatus.LATE
  //   },
  //   {
  //     name: 'Jane Doe',
  //     email: 'jane@doe.com',
  //     phoneNumber: 1234567890,
  //     heading: 'Heading',
  //     exitTime: new Date(),
  //     returnTime: new Date(),
  //     status: TokenStatus.EXPIRED
  //   },
  // ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fbfdff' }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10, alignItems: 'center' }}>
        {isLoading ?
          <Spinner size='large' color='$blue1Dark' />
        : data.length === 0 ?
          <View ai='center' pt='$5' gap={40}>
            <NoDataSVG width={170} height={170} />
            <H4 fontStyle='italic'>No data</H4>
          </View>
        : data.map((value, index) => (
            <AdminCard
              name={value.name}
              email={value.email}
              heading={value.heading}
              key={value.email}
              exitTime={value.exitTime}
              returnTime={value.returnedTime}
              status={value.status}
              phoneNumber={value.phoneNumber}
              profileImg={value.profileImg}
            />
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
