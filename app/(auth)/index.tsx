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

export default function Login() {
  const { subscribeTopic } = useNotification();

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
      const organization_id = data.organizationId.toString();
      await SecureStore.setItemAsync('organization_id', organization_id);
      subscribeTopic(`${organization_id}-${'ann'}`);
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
        <View w={'100%'}>
          <RadioGroup
            borderColor={'$blue6Light'}
            borderWidth={1}
            borderRadius={'$4'}
            aria-labelledby='Select one item'
            name='form'
            paddingLeft='$3'
            value={role}
            // width={"200%"}
            onValueChange={value => {
              setRole(value as Role);
            }}
            mb='$3'
          >
            <YStack width={'100%'} gap='$1' paddingHorizontal={"$2"}>
              <RadioGroupItemWithLabel size='$4' value={Role.ADMIN} label='Admin' />
              <RadioGroupItemWithLabel size='$4' value={Role.USER} label='People' />
              <RadioGroupItemWithLabel size='$4' value={Role.MANAGER} label='Manager' />
              <RadioGroupItemWithLabel size='$4' value={Role.CHECKER} label='Checker' />
            </YStack>
          </RadioGroup>
        </View>
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
