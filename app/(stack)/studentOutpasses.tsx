import { SafeAreaView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetStudentOutpasses } from '@/services/api';
import { Spinner, Image, ScrollView, View, H4 } from 'tamagui';
import CustomCard from '@/components/CustomCard';
import NoDataSVG from '@/assets/no-data.svg';
import { useLocalSearchParams } from 'expo-router';
import { OutpassResultsData } from '@/interfaces/ApiResults';

export default function StudentOutpass() {
  const { outpassType } = useLocalSearchParams<Record<string, string>>();

  const { data: approvedData = [], isLoading: isApprovedLoading } = useQuery({
    queryKey: ['approved', 'student', 'outpass'],
    queryFn: () => GetStudentOutpasses(outpassType),
    enabled: outpassType === 'approvedOutpass',
  });

  const { data: rejectData = [], isLoading: isRejectLoading } = useQuery({
    queryKey: ['deined', 'student', 'outpass'],
    queryFn: () => GetStudentOutpasses(outpassType),
    enabled: outpassType === 'rejectedOutpass',
  });

  const { data: pendingData = [], isLoading: isPendingLoading } = useQuery({
    queryKey: ['pending', 'student', 'outpass'],
    queryFn: () => GetStudentOutpasses(outpassType),
    enabled: outpassType === 'pendingOutpass',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fbfdff', alignItems: 'center' }}>
      <ScrollView style={{ width: '100%', paddingHorizontal: 10, paddingTop: 10 }}>
        {isRejectLoading || isApprovedLoading || isPendingLoading ?
          <Spinner size='large' color='$blue1Dark' />
        : <>
            {outpassType === 'approvedOutpass' && renderData(approvedData, 'Approved')}
            {outpassType === 'rejectedOutpass' && renderData(rejectData, 'Pending')}
            {outpassType === 'pendingOutpass' && renderData(pendingData, 'Denied')}
          </>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const renderData = (data: OutpassResultsData[], type: string) => {
  return (
    <>
      {data.length === 0 ?
        <View ai='center' pt='$5' gap={40}>
          <NoDataSVG width={170} height={170} />
          <H4 fontStyle='italic'>No {type} outPasses</H4>
        </View>
      : data.map(value => (
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
    </>
  );
};
