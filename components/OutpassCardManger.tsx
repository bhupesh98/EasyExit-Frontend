import React from 'react';
import {
  View,
  Card,
  XStack,
  Paragraph,
  Separator,
  H4,
  Button,
  ButtonText,
  TextArea,
  H6,
  Spinner,
  Dialog,
} from 'tamagui';
import { OutPassCardManagerProps } from '@/interfaces/CustomCardManagerProps';
import { useMutation } from '@tanstack/react-query';
import { Role } from '@/constants/Role';
import { acceptToken, rejectToken } from '@/services/api';
import { ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OutpassCardManger(props: OutPassCardManagerProps) {
  const startTime = new Date(props.startTime);
  const endTime = new Date(props.endTime);

  const [rejectionReason, setReason] = React.useState<string>('');
  const [showD, setShowD] = React.useState<boolean>(false);

  const acceptMutation = useMutation({
    mutationKey: [Role.MANAGER, 'approveToken'],
    mutationFn: acceptToken,
    async onSuccess() {
      ToastAndroid.show('Approved Successfully', ToastAndroid.SHORT);
      props.doRefetch();
      return;
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
      return;
    },
  });

  const rejectMutation = useMutation({
    mutationKey: [Role.MANAGER, 'rejectToken'],
    mutationFn: rejectToken,
    async onSuccess() {
      ToastAndroid.show('Denied Successfully', ToastAndroid.SHORT);
      props.doRefetch();
      setShowD(false);
      return;
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
      return;
    },
  });

  const onButtonPress = async (type: string) => {
    try {
      const data = { token: props.value, ...(type === 'reject' ? { rejectionReason: rejectionReason } : {}) };
      if (type === 'approve') await acceptMutation.mutateAsync(data);
      else await rejectMutation.mutateAsync(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card animation={'bouncy'} size={'$3'} bordered w={'100%'} my={'$2'} bg={'#fbfdff'} onPress={props.onPressCard}>
      <Card.Header unstyled>
        <XStack jc='space-between'>
          <View>
            <H4 col={'$blue1Dark'}>{props.heading}</H4>
            <XStack>
              <Paragraph theme='alt1'>{'Requested by: '}</Paragraph>
              <Paragraph wordWrap='break-word' theme='alt2'>
                {props.email}
              </Paragraph>
            </XStack>
            <View fd='row' jc='space-between' pr={'$3'}>
              <Paragraph theme='alt2'>
                <Paragraph theme='alt1'>{'Start Time:'}</Paragraph> {startTime.getDate()}/{startTime.getMonth()}{' '}
                {startTime.getHours()}:{startTime.getMinutes()}
              </Paragraph>
              <Paragraph theme='alt2'>
                <Paragraph theme='alt1'>{'End Time:'}</Paragraph> {endTime.getDate()}/{endTime.getMonth()}{' '}
                {endTime.getHours()}:{endTime.getMinutes()}
              </Paragraph>
            </View>
          </View>
        </XStack>
      </Card.Header>
      <Separator />
      <Card.Footer unstyled py={'$3'} px={'$4'}>
        <XStack jc='space-between'>
          <Button
            bg={'#fbfdff'}
            theme='green'
            borderWidth={1.5}
            borderColor={'#21bf73'}
            w={'$10'}
            size={'$3'}
            onPress={() => onButtonPress('approve')}
          >
            {acceptMutation.isPending ?
              <Spinner color={'$blue1Dark'} />
            : <ButtonText col={'#21bf73'}>Approve</ButtonText>}
          </Button>
          <Button bg={'#fbfdff'} theme='red' borderWidth={1.5} borderColor={'#f45954'} w={'$10'} size={'$3'} onPress={()=>setShowD(true)}>
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
        </XStack>
      </Card.Footer>
    </Card>
  );
}
