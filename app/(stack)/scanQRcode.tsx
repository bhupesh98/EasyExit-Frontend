import { Alert, StyleSheet, TouchableNativeFeedback, SafeAreaView } from 'react-native';
import React from 'react';
import { CameraView } from 'expo-camera/next';
import { Ionicons } from '@expo/vector-icons';
import { H3, XStack, View, Square, H4, AlertDialog, YStack, Button, Image } from 'tamagui';
import { useMutation } from '@tanstack/react-query';
import { checkToken } from '@/services/api';
import { router } from 'expo-router';

export default function scanQRcode() {
  const [scanned, setScanned] = React.useState<boolean>(false);
  const [flash, setFlash] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const { mutateAsync } = useMutation({
    mutationKey: ['scanQRcode'],
    mutationFn: checkToken,
    onSuccess(data) {
      setError(false);
      setOpen(true);
    },
    onError(error) {
      setError(true);
      setOpen(true);
    },
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    mutateAsync(data);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <AlertDialog open={open}>
        <CameraView
          enableTorch={flash}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          style={StyleSheet.absoluteFillObject}
        >
          <View f={1} ai='center' bg={'rgba(0,0,0,0.5)'} jc='space-evenly'>
            <H4 col={'white'} fontWeight={'bold'}>
              Scan product QR Code
            </H4>
            <Square
              size={'$19'}
              bg={'rgba(240,240,240,0.1)'}
              borderColor={'$blue10Dark'}
              borderWidth='$1'
              borderRadius={'$4'}
            />
            <View b={0} jc='center' ai='center'>
              <TouchableNativeFeedback onPress={() => setFlash(!flash)}>
                <XStack w={'45%'} bg={'rgba(0,0,0,0.6)'} jc='center' br={'$5'} p={'$3'} px={'$5'} mb='$8'>
                  <Ionicons name={flash ? 'flash' : 'flash-off'} size={24} color={'white'} />
                  <H3 color={'white'}> Flash {flash ? 'on' : 'off'}</H3>
                </XStack>
              </TouchableNativeFeedback>
            </View>
          </View>
        </CameraView>
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
            <YStack gap='$4'>
              <Image
                als='center'
                src={error ? require('@/assets/wrong.gif') : require('@/assets/tick.gif')}
                w={200}
                h={200}
              />
              <AlertDialog.Title als='center'>Verified</AlertDialog.Title>
              <AlertDialog.Description als='center'>
                Student QR code has been {error ? 'Rejected' : 'verified'}
              </AlertDialog.Description>
              <XStack jc='center'>
                <Button
                  onPress={() => {
                    setOpen(false);
                    if (error) {
                      setScanned(false);
                    } else {
                      router.replace('/checkerHome');
                    }
                  }}
                  theme='active'
                >
                  {error ? 'Retry' : 'Ok'}
                </Button>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </SafeAreaView>
  );
}
