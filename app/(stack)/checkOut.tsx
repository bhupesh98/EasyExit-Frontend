import CustomCard from '@/components/CustomCard2';
import { TokenStatus } from '@/constants/TokenStatus';
import { getCheckOut } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { H4, ScrollView, Spinner, View } from 'tamagui';
import { Role } from '@/constants/Role';
import AdminCard from '@/components/AdminCard';
import { SafeAreaView } from 'react-native';
import NoDataSVG from '@/assets/no-data.svg';

export default function CheckOut() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['checkout', Role.ADMIN],
    queryFn: getCheckOut,
  });

  // const data = [
  //   {
  //     name: 'John Doe',
  //     email: 'john@doe.com',
  //     phoneNumber: 1234567890,
  //     heading: 'Heading',
  //     exitTime: new Date(),
  //   },
  //   {
  //     name: 'Jane Doe',
  //     email: 'jane@doe.com',
  //     phoneNumber: 1234567890,
  //     heading: 'Heading',
  //     exitTime: new Date(),
  //   },
  // ];
  // const isLoading = false;

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
              profileImg={value.profileImg}
              exitTime={value.exitTime}
              phoneNumber={value.phoneNumber}
            />
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
