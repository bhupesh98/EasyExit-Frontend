import { SafeAreaView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetStudentOutpasses } from '@/services/api';
import { Spinner, Image, ScrollView, View, H4 } from 'tamagui';
import CustomCard from '@/components/CustomCard';
import NoDataSVG from '@/assets/no-data.svg';
import { useLocalSearchParams } from 'expo-router';

export default function StudentOutpass() {
  const { outpassType } = useLocalSearchParams<Record<string, string>>();

  const { data = [], isLoading } = useQuery({
    queryKey: ['approved','denied', 'pending', 'student', 'outpass'],
    queryFn: ()=>GetStudentOutpasses(outpassType),
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fbfdff', alignItems: 'center' }}>
      <ScrollView style={{  width:'100%', paddingHorizontal: 10, paddingTop: 10 }}>
        {isLoading ?
          <Spinner size='large' color='$blue1Dark' />
        : data.length === 0 ?
          <View ai='center' pt='$5' gap={40}>
            <NoDataSVG width={170} height={170} />
            <H4 fontStyle='italic'>No data</H4>
          </View>
        : data.map((value, index) => (
            <CustomCard
              key={value.token}
              value={value.token}
              status={value.status}
              acceptedBy={value.acceptedBy}
              startTime={value.startTime}
              endTime={value.endTime}
              heading={value.heading}
              phoneNumber={value.phoneNumber}
              reason={value.reason}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}
