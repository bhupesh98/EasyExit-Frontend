import React from 'react';
import CustomTextInput from '@/components/CustomTextInput';
import { AlertDialog, Button, ButtonText, H4, View, XStack, YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { addSupervisor } from '@/services/api';
import { addSupervisorData } from '@/interfaces/ApiDTO';
import { ToastAndroid, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import AgreeSVG from '@/assets/agree.svg';

export default function AddSupervisors() {
  const [managerEmails, setManagerEmails] = React.useState<string[]>(['']);
  const [checkerEmails, setCheckerEmails] = React.useState<string[]>(['']);
  const [open, setOpen] = React.useState<boolean>(false);

  const { mutateAsync } = useMutation({
    mutationKey: ['add', 'supervisors'],
    mutationFn: addSupervisor,
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
    },
    onSuccess(data) {
      setOpen(true);
    },
  });

  const handleSubmit = () => {
    const data: addSupervisorData = { managerEmails, checkerEmails };
    mutateAsync(data);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'space-between' }}>
      <AlertDialog open={open}>
        <View>
          <H4 theme='alt2'>Add Mangaers</H4>
          {managerEmails.map((email, index) => (
            <XStack ai='center' gap='$4' key={`manager-${index}`}>
              <CustomTextInput
                width={'75%'}
                value={email}
                onChangeText={text => {
                  const newEmails = [...managerEmails];
                  newEmails[index] = text;
                  setManagerEmails(newEmails);
                }}
                placeholder='Manager Email'
              />
              <Button
                mt='$2'
                size={'$4'}
                icon={props => <Ionicons name='trash' color={'#0e294b'} size={24} />}
                onPress={() => {
                  const newEmails = [...managerEmails];
                  newEmails.splice(index, 1);
                  setManagerEmails(newEmails);
                }}
              />
            </XStack>
          ))}
          <Button
            als='center'
            my={'$4'}
            w={'40%'}
            bg={'$blue7Dark'}
            themeInverse
            icon={props => <Ionicons name='add' size={props.size} color={'white'} />}
            onPress={() => setManagerEmails(arr => [...arr, ''])}
          >
            <ButtonText>Add More</ButtonText>
          </Button>
          <H4 theme='alt2'>Add Checkers</H4>
          {checkerEmails.map((email, index) => (
            <XStack ai='center' gap='$4' key={`checker-${index}`}>
              <CustomTextInput
                width={'75%'}
                value={email}
                onChangeText={text => {
                  const newEmails = [...checkerEmails];
                  newEmails[index] = text;
                  setCheckerEmails(newEmails);
                }}
                placeholder='Checker Email'
              />
              <Button
                mt='$2'
                size={'$4'}
                icon={props => <Ionicons name='trash' color={'#0e294b'} size={24} />}
                onPress={() => {
                  const newEmails = [...checkerEmails];
                  newEmails.splice(index, 1);
                  setCheckerEmails(newEmails);
                }}
              />
            </XStack>
          ))}
          <Button
            als='center'
            my={'$4'}
            w={'40%'}
            bg={'$blue7Dark'}
            themeInverse
            icon={props => <Ionicons name='add' size={props.size} color={'white'} />}
            onPress={() => setCheckerEmails(arr => [...arr, ''])}
          >
            <ButtonText>Add More</ButtonText>
          </Button>
        </View>
        <Button size={'$5'} themeInverse mb='$4' onPress={handleSubmit}>
          <ButtonText>Submit</ButtonText>
        </Button>
        <AlertDialog.Portal>
          <AlertDialog.Overlay animation='quick' opacity={0.5} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
          <AlertDialog.Content
            bordered
            elevate
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            mx='$5'
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack jc='center' ai='center' gap='$4'>
              <AlertDialog.Title fow={'bold'}>Done</AlertDialog.Title>
              <AgreeSVG width={150} height={150} />
              <AlertDialog.Description>
                {'Supervisors added successfully.\n An email has been sent to each supervisor.'}
              </AlertDialog.Description>
              <Button
                theme='active'
                onPress={() => {
                  setOpen(false);
                  if (router.canGoBack) router.back();
                }}
              >
                Accept
              </Button>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </SafeAreaView>
  );
}
