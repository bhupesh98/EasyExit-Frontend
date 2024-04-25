import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Card, XStack, H4, Paragraph, Separator, YStack, H6, H3, Heading, H5 } from 'tamagui';
import { AdminCardProps, CustomCardProps } from '@/interfaces/CustomCard';
import { TokenStatus } from '@/constants/TokenStatus';
import { iconName, colorName } from '@/constants/outPassStatus';
import Avatar from './Avatar';

export default function AdminCard(props: AdminCardProps) {
  return (
    <Card size={'$3'} bordered w={'100%'} my={'$2'} backgroundColor={'#fbfdff'}>
      <Card.Header padded w={'100%'}>
        <XStack ai='center' gap='$3' mb='$2'>
          <Avatar w={50} h={50} imageUri={props.profileImg} />
          <H3>{props.heading}</H3>
        </XStack>
        <Separator />
        <H4 theme='alt2'>
          <H4>By:</H4> {props.name}
        </H4>
        <XStack py='$2' w={'100%'} jc='space-between'>
          <Link href={`mailto: ${props.email}`}>
            <Ionicons name='mail' size={24} />
            <H5 col={'grey'}> {props.email}</H5>
          </Link>
          <Separator backgroundColor={'$blue1Dark'} vertical/>
          <Link href={`tel: +91 ${props.phoneNumber}`}>
            <H5 theme='alt2'>
              <Ionicons name='call' size={24} /> +91 {props.phoneNumber}
            </H5>
          </Link>
        </XStack>
        <YStack w={'100%'} py='$2'>
          <Paragraph theme='alt2'>
            <Paragraph>Start Time:</Paragraph> {props.exitTime?.toLocaleString()}
          </Paragraph>
          {props.returnTime && (
            <Paragraph theme='alt2'>
              <Paragraph>End Time:</Paragraph> {props.returnTime?.toLocaleString()}
            </Paragraph>
          )}
        </YStack>
      </Card.Header>
    </Card>
  );
}
