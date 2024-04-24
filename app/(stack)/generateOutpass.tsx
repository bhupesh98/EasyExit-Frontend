import React from 'react';
import { SafeAreaView } from 'react-native';
import { Heading, View, TextArea, XStack, Button, ButtonText, H6 } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '@/components/CustomTextInput';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ActivityIndicator, Pressable, ToastAndroid } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Role } from '@/constants/Role';
import { generateOutPass } from '@/services/api';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function generateOutpass() {
  const [heading, setHeading] = React.useState<string>('');
  const [reason, setReason] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<Date>(null);
  const [endTime, setEndTime] = React.useState<Date>(null);
  const [showStartPicker, setStartPicker] = React.useState<boolean>(false);
  const [showEndPicker, setEndPicker] = React.useState<boolean>(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [Role.USER, 'generateOutPass'],
    mutationFn: generateOutPass,
    async onSuccess(data) {
      await AsyncStorage.setItem('tokenId', data.token);
      router.replace('/home');
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
    },
  });

  const handleTime = (event: DateTimePickerEvent, selectedDate: Date, isStartTime: boolean = true) => {
    if (event.type === 'dismissed' || !selectedDate) return;
    const currentDate = selectedDate || startTime;
    if (isStartTime) {
      setStartTime(currentDate);
    } else {
      setEndTime(currentDate);
    }
    setStartPicker(false);
    setEndPicker(false);
  };

  const handleGenerateOutPass = async () => {
    const trimmedHeading: string = heading.trim();
    const trimmedReason: string = reason.trim();

    if (trimmedHeading === '' || trimmedReason === '' || !startTime || !endTime) {
      setError(true);
      return;
    }
    setError(false);
    try {
      const data = {
        heading: trimmedHeading,
        reason: trimmedReason,
        startTime,
        endTime,
      };
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1, paddingHorizontal: 10 }}>
      <View jc='space-between' fd='row' p={'$1'} mb={'$5'}>
        <Heading>OutPass Information</Heading>
        <Ionicons name='calendar' color={'#21bf73'} size={36} />
      </View>
      <View>
        <H6 ml={'$1'}>OutPass Title</H6>
        <CustomTextInput value={heading} placeholder='Title' error={error} onChangeText={setHeading} />
        {error && heading.trim() === '' && <H6 col={'$red10'}>Please enter a heading</H6>}
        <H6 ml={'$1'} mt={'$3'}>
          Reason
        </H6>
        <TextArea
          value={reason}
          borderColor={error && !reason.length ? '$red10' : '$blue6Light'}
          cursorColor={'black'}
          marginTop='$2'
          placeholder='Reason'
          textAlignVertical='top'
          placeholderTextColor={'$grey'}
          backgroundColor={'$blue1Light'}
          size={'$5'}
          onChangeText={text => setReason(text)}
        />
        {error && reason.trim() === '' && <H6 col={'$red10'}>Please enter a reason</H6>}
        <H6 ml={'$1'} mt={'$3'}>
          Enter Start and End time
        </H6>
        <XStack jc='space-between'>
          {showStartPicker && (
            <RNDateTimePicker
              display='clock'
              is24Hour={false}
              onChange={(event, selectedDate) => handleTime(event, selectedDate)}
              value={startTime === null ? new Date() : startTime}
              mode='time'
            />
          )}
          <Pressable style={{ width: '48%' }} onPress={() => setStartPicker(val => !val)}>
            <CustomTextInput
              editable={false}
              placeholder='06:00:00 PM'
              value={startTime?.toLocaleTimeString() ?? ''}
              error={error}
            />
          </Pressable>
          {showEndPicker && (
            <RNDateTimePicker
              display='clock'
              is24Hour={false}
              onChange={(event, selectedDate) => handleTime(event, selectedDate, false)}
              value={endTime === null ? new Date() : endTime}
              mode='time'
            />
          )}
          <Pressable style={{ width: '48%' }} onPress={() => setEndPicker(val => !val)}>
            <CustomTextInput
              editable={false}
              placeholder='11:00:00 PM'
              value={endTime?.toLocaleTimeString() ?? ''}
              error={error}
            />
          </Pressable>
        </XStack>
        {error && reason.trim() === '' && <H6 col={'$red10'}>Please select a time</H6>}
        <Button w={'100%'} h={'$5'} disabled={isPending} onPress={handleGenerateOutPass} themeInverse mt={'$5'}>
          {isPending ?
            <ActivityIndicator />
          : <ButtonText>Generate OutPass</ButtonText>}
        </Button>
      </View>
    </SafeAreaView>
  );
}
