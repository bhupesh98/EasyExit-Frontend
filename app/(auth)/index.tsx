import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button, ButtonText, Text, RadioGroup, Label, YStack, H6 } from 'tamagui';
import CustomTextInput from '@/components/CustomTextInput';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { LoginApi } from '@/services/api';
import { LoginData } from '@/interfaces/ApiDTO';
import { Role } from '@/constants/Role';
import { ActivityIndicator, Image, ToastAndroid } from 'react-native';
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel';
import { Heading } from '@/tamagui.config';

import useNotification from '@/hooks/useNotification';

import messaging from '@react-native-firebase/messaging';

export default function Login() {
  const { subscribeTopic, setBackgroundMessageHandler, requestUserPermission, handleNotification, getToken } =
    useNotification();

  useEffect(() => {
    requestUserPermission().then(() => {
      getToken();
    });

    messaging()
      .getInitialNotification()
      .then(remoteM => {
        if (remoteM) {
          console.log('Meassage cause app to open from quit state ->', remoteM.notification);
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused the app to open from background state: ', remoteMessage.notification);
    });

    setBackgroundMessageHandler();
    handleNotification();
    subscribeTopic('ann');
  }, []);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<Role>(Role.ADMIN);
  const [error, setError] = React.useState<boolean>(false);
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: LoginApi,
    async onSuccess(data, variables) {
      await SecureStore.setItemAsync('token', data.token);
      await SecureStore.setItemAsync('role', variables.role);
      router.replace('/home');
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
    },
  });

  const handleLogin = async () => {
    const emailTrimmed: string = email.trim();
    const passwordTrimmed: string = password.trim();

    if (!emailTrimmed && !passwordTrimmed) {
      setError(true);
    } else {
      try {
        const loginData: LoginData = {
          email: emailTrimmed,
          password: passwordTrimmed,
          role: role,
        };
        await loginMutation.mutateAsync(loginData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // React.useEffect(() => {
  //   (async () => {
  //     const token = await SecureStore.getItemAsync('token');
  //     console.log(token);
  //     if (token) router.replace('/managerHome');
  //   })();
  // }, []);
  // if (process.env.STATUS === "DEVELOPMENT") {
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/aaa');
  //     console.log('hi');
  //   }, 20000);
  // }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <View ai='center' marginBottom='$1' marginTop='$4'>
        <Image source={require('@/assets/adaptive-icon.png')} style={{ width: 150, height: 150 }} />
      </View>
      <View>
        <Heading>Welcome to Easy Exit </Heading>
        <Text textAlign='center' mb='$3'>
          Login To Continue
        </Text>
      </View>
      <View px='$4' ai='center'>
        <CustomTextInput
          value={email}
          placeholder='Email'
          id='email'
          onChangeText={setEmail}
          keyboardType='email-address'
          error={error}
        />
        {error && email.trim() === '' && <H6 col={'$red10'}>Email is Required</H6>}
        <CustomTextInput
          value={password}
          placeholder='Password'
          id='password'
          onChangeText={setPassword}
          error={error}
          secureTextEntry
        />
        {error && password.trim() === '' && <H6 col={'$red10'}>Password is Required</H6>}
        <Label ml='$2' mb='$1' unstyled mt='$1'>
          Select Role
        </Label>
        <RadioGroup
          borderColor={'$blue6Light'}
          borderWidth={1}
          borderRadius={'$4'}
          aria-labelledby='Select one item'
          name='form'
          paddingLeft='$3'
          value={role}
          onValueChange={value => {
            setRole(value as Role);
          }}
          mb='$3'
        >
          <YStack width={300} alignItems='center' gap='$1'>
            <RadioGroupItemWithLabel size='$4' value={Role.ADMIN} label='Admin' />
            <RadioGroupItemWithLabel size='$4' value={Role.USER} label='People' />
            <RadioGroupItemWithLabel size='$4' value={Role.MANAGER} label='Manager' />
            <RadioGroupItemWithLabel size='$4' value={Role.CHECKER} label='Checker' />
          </YStack>
        </RadioGroup>
        <Button w={'100%'} h={'$5'} disabled={loginMutation.isPending} onPress={handleLogin} themeInverse>
          {loginMutation.isPending ?
            <ActivityIndicator />
          : <ButtonText>Login</ButtonText>}
        </Button>
        <View mt='$4' flexDirection='row' jc='center'>
          <Text>
            If not registered,{' '}
            <Link
              href={'/register'}
              style={{
                color: '#0e294b',
                fontWeight: 'bold',
              }}
            >
              Register
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
