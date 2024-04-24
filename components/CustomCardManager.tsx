import React from 'react';
import { H2, H5, Separator, View, Text } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { CustomCardManagerProps } from '@/interfaces/CustomCardManagerProps';

export default function CustomCardManager(props: CustomCardManagerProps) {
  const iconName: Record<string, 'checkmark-done-circle' | 'close-circle' | 'hourglass' | 'walk-outline'> = {
    Approved: 'checkmark-done-circle',
    Denied: 'close-circle',
    Pending: 'hourglass',
    'Check-Ins': 'walk-outline',
    'Check-Out': 'walk-outline',
  };

  const colorName = {
    Approved: '#21bf73',
    Denied: '#f45954',
    Pending: '#fa9715',
    'Check-Ins': '#21bf73',
    'Check-Out': '#f45954',
  };

  return (
    <View
      h={'$12'}
      w={'100%'}
      backgroundColor={'#fbfdff'}
      borderColor='$blue6Light'
      borderWidth={1}
      borderRadius={10}
      justifyContent='space-between'
      padding={12}
      marginBottom={8}
      onPress={props.onPress}
    >
      <View fd='row' jc='space-between'>
        <View>
          <H2>{props.number ?? 0}</H2>
          <H5>{props.title}</H5>
        </View>
        <View>
          <Ionicons
            style={{
              transform: [
                {
                  rotateY: props.title === 'Check-Ins' ? '180deg' : '0deg',
                },
              ],
            }}
            name={iconName[props.title]}
            size={48}
            color={colorName[props.title]}
          />
        </View>
      </View>
      <Separator p={0} borderColor={'$blue6Light'} />
      <Text theme='alt2' fontSize={'$4'}>
        {props.text}
      </Text>
    </View>
  );
}
