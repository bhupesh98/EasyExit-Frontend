import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, H6, Button, ButtonText, H4, ScrollView, Spinner, Dialog, TextArea, Paragraph } from 'tamagui';
import { Link, router, useLocalSearchParams } from 'expo-router';
import Avatar from '@/components/Avatar';
import { useMutation } from '@tanstack/react-query';
import { Role } from '@/constants/Role';
import { ToastAndroid } from 'react-native';
import { acceptToken, rejectToken } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';

export default function managerApproveOutPass() {
  const [rejectionReason, setReason] = React.useState<string>('');
  const [showD, setShowD] = React.useState<boolean>(false);

  const { heading, name, startTime, endTime, email, reason, phoneNumber, profileImg, token } =
    useLocalSearchParams<Record<any, any>>();

  const acceptMutation = useMutation({
    mutationKey: [Role.MANAGER, 'approveToken'],
    mutationFn: acceptToken,
    async onSuccess() {
      ToastAndroid.show('Approved Successfully', ToastAndroid.SHORT);
      if (router.canGoBack) router.back();
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
    },
  });

  const rejectMutation = useMutation({
    mutationKey: [Role.MANAGER, 'rejectToken'],
    mutationFn: rejectToken,
    async onSuccess() {
      ToastAndroid.show('Denied Successfully', ToastAndroid.SHORT);
      if (router.canGoBack) router.back();
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
    },
  });

  const onButtonPress = async (type: string) => {
    try {
      const data = { token: token, ...(type === 'reject' ? { rejectionReason: rejectionReason } : {}) };
      if (type === 'approve') await acceptMutation.mutateAsync(data);
      else await rejectMutation.mutateAsync(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1, paddingHorizontal: 15 }}>
      <View flex={1}>
        <ScrollView>
          <Avatar imageUri={profileImg} />
          <H4 mt={'$4'}>{name}</H4>
          <Paragraph theme='alt2'>
            {`${email}`}
            {phoneNumber && (
              <Link href={`tel:+91 ${phoneNumber}`}>
                <Paragraph theme='alt2'>{` | +91${phoneNumber}`}</Paragraph>
              </Link>
            )}
          </Paragraph>
          <H6 my={'$4'}>{reason}</H6>
          <H6>
            {'StartTime: '}
            <H6 theme='alt2'>{startTime}</H6>
          </H6>
          <H6>
            {'EndTime: '}
            <H6 theme='alt2'>{endTime}</H6>
          </H6>
        </ScrollView>
        <View jc='space-between' pos='absolute' bottom={0} w={'100%'} pb={'$4'} bg={'#fbfdff'}>
          <Button
            bg={'#fbfdff'}
            theme='green'
            borderWidth={1.5}
            mb={'$2'}
            borderColor={'#21bf73'}
            w={'100%'}
            size={'$5'}
            onPress={() => onButtonPress('approve')}
            disabled={acceptMutation.isPending}
          >
            {acceptMutation.isPending ?
              <Spinner color={'$blue1Dark'} />
            : <ButtonText col={'#21bf73'}>Approve</ButtonText>}
          </Button>
          <Button
            bg={'#fbfdff'}
            theme='red'
            borderWidth={1.5}
            borderColor={'#f45954'}
            w={'100%'}
            size={'$5'}
            onPress={() => setShowD(true)}
          >
            <ButtonText col={'#f45954'}>Deny</ButtonText>
          </Button>
          <Dialog modal open={showD}>
            <Dialog.Portal>
              <Dialog.Overlay key='overlay' opacity={0.5} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
              <Dialog.Content
                width={'90%'}
                h={'auto'}
                bordered
                elevate
                key='content'
                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                gap='$4'
              >
                <H6>Enter reason for rejection</H6>
                <TextArea
                  value={rejectionReason}
                  borderColor={'$blue6Light'}
                  cursorColor={'black'}
                  marginTop='$2'
                  placeholder='Reason'
                  textAlignVertical='top'
                  placeholderTextColor={'$grey'}
                  backgroundColor={'$blue1Light'}
                  size={'$5'}
                  onChangeText={text => setReason(text)}
                />
                <Button
                  theme='red'
                  bg={'#fbfdff'}
                  themeInverse
                  borderWidth={1.5}
                  borderColor={'#f45954'}
                  onPress={() => onButtonPress('reject')}
                  disabled={rejectMutation.isPending}
                >
                  {rejectMutation.isPending ?
                    <Spinner color={'$blue1Dark'} />
                  : <ButtonText col={'#f45954'} textAlign='center'>
                      Deny
                    </ButtonText>
                  }
                </Button>
                <Dialog.Close asChild>
                  <Button
                    position='absolute'
                    onPress={() => setShowD(false)}
                    top='$3'
                    right='$3'
                    size='$2'
                    circular
                    icon={props => <Ionicons name='close' size={props.size} color={props.color} />}
                  />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
        </View>
      </View>
    </SafeAreaView>
  );
}
