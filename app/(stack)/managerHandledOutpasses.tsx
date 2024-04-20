import { SafeAreaView } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { OutpassHandledByManager } from '@/services/api';
import { Spinner, ScrollView, View, H4 } from 'tamagui';
import AddNotesSVG from '@/assets/add-notes.svg';
import CustomCard2 from '@/components/CustomCard2';
import { Role } from '@/constants/Role';
import { useLocalSearchParams } from 'expo-router';

export default function ApprovedOutpass() {
  const { type } = useLocalSearchParams<Record<string, string>>();
  console.log(type);

  const { data = [], isLoading } = useQuery({
    queryKey: ['getTokens', Role.MANAGER, 'accepted', 'rejected'],
    queryFn: () => OutpassHandledByManager(type),
  });

  return (
    <ScrollView style={{ backgroundColor: '#fbfdff' }}>
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10, alignItems: 'center', backgroundColor: '#fbfdff' }}
      >
        {isLoading ?
          <Spinner size='large' color='$blue1Dark' />
        : data.length === 0 ?
          <View ai='center' pt='$5' gap={40}>
            <AddNotesSVG width={170} height={170} />
            <H4 fontStyle='italic'>{type === 'accepted' ? 'Start Approving Outpasses' : 'Deny Any OutPass'}</H4>
          </View>
        : data.map((value, index) => (
            <CustomCard2
              key={value.token}
              value={value.token}
              status={value.status}
              name={value.name}
              email={value.email}
              startTime={value.startTime}
              endTime={value.endTime}
              heading={value.heading}
              phoneNumber={value.phoneNumber}
            />
          ))
        }
      </SafeAreaView>
    </ScrollView>
  );
}
