import { Alert, TouchableWithoutFeedback, Keyboard, Linking, ToastAndroid, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button, ButtonText, Label, RadioGroup, YStack, H6 } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '@/components/Avatar';
import * as SecureStore from 'expo-secure-store';
import { PermissionStatus, launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { Heading } from '@/tamagui.config';
import CustomTextInput from '@/components/CustomTextInput';
import { router } from 'expo-router';
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel';
import CustomSelect from '@/components/CustomSelect';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSearchResults, studentRegister } from '@/services/api';
import useDebounce from '@/hooks/useDebounce';
import { Role } from '@/constants/Role';
import * as FileSystem from 'expo-file-system';
import useNotification from '@/hooks/useNotification';

export default function Register() {
  const { subscribeTopic } = useNotification();
  const [profileImg, setProfileImg] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [organizationId, setOrganizationId] = React.useState<string>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [role, setRole] = React.useState<Role>(Role.ADMIN);
  const [searchString, setSearchString] = React.useState<string>('');
  const debouncedString = useDebounce(searchString);

  const { data = [], isLoading } = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length >= 3,
    retry: false,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [Role.USER, 'register'],
    mutationFn: studentRegister,
    async onSuccess(data, variables) {
      await SecureStore.setItemAsync('token', data.token);
      await SecureStore.setItemAsync('role', Role.USER);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      const organization_id = variables.organizationId;
      subscribeTopic(`${organization_id}-${'ann'}`);
      router.replace('/home');
    },
    onError(error) {
      ToastAndroid.show(JSON.parse(error.message).message, ToastAndroid.SHORT);
    },
  });

  const handleNext = async () => {
    const trimmedName: string = name.trim();
    const trimmedEmail: string = email.trim();
    const trimmedPassword: string = password.trim();

    if (trimmedName === '' || trimmedEmail === '' || trimmedPassword === '') {
      setError(true);
      return;
    }
    setError(false);
    if (!profileImg) {
      ToastAndroid.show('Please select a profile image', ToastAndroid.SHORT);
      return;
    }
    try {
      if (role === Role.ADMIN) {
        router.push({
          pathname: '/createOrganization',
          params: {
            name: trimmedName,
            email: trimmedEmail,
            password: trimmedPassword,
            profileImg,
          },
        });
      } else {
        const data = {
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
          organizationId,
          profileImg,
        };
        await mutateAsync(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    if (profileImg) return;
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== PermissionStatus.GRANTED) {
      Alert.alert('Permission Denied', 'Camera Roll permission is required to upload images', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    } else {
      const result = await launchImageLibraryAsync();

      if (!result.canceled) {
        const documentDirectory = FileSystem.documentDirectory || `${FileSystem.cacheDirectory}document/`;
        await FileSystem.makeDirectoryAsync(documentDirectory, { intermediates: true });

        const filename = 'profileImg.jpeg';
        const destinationFilePath = `${documentDirectory}${filename}`;

        await FileSystem.moveAsync({
          from: result.assets[0].uri,
          to: destinationFilePath,
        });
        setProfileImg(destinationFilePath);
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View px='$4' mt='$6' ai='center'>
          <Heading>Hello! Register to Get Started</Heading>
          <View ai='center' marginBottom='$6' marginTop='$3'>
            {profileImg ?
              <Avatar imageUri={profileImg} />
            : <Ionicons name='person-circle-outline' size={120} onPress={pickImage} />}
          </View>
          <CustomTextInput value={name} placeholder='Name' id='name' onChangeText={setName} error={error} />
          {error && name.trim() === '' && <H6 col={'$red10'}>Name is required</H6>}
          <CustomTextInput
            value={email}
            placeholder='Email'
            id='register-email'
            onChangeText={setEmail}
            keyboardType='email-address'
            error={error}
          />
          {error && email.trim() === '' && <H6 col={'$red10'}>Email is required</H6>}
          <CustomTextInput
            value={password}
            placeholder='Password'
            id='register-password'
            onChangeText={setPassword}
            secureTextEntry={true}
            error={error}
          />
          {error && password.trim() === '' && <H6 col={'$red10'}>Password is required</H6>}
          <Label ml='$2' mb='$1' unstyled mt='$1'>
            Select Role
          </Label>
          <View w={'100%'}>
            <RadioGroup
              aria-labelledby='Select one item'
              name='form'
              value={role}
              onValueChange={value => setRole(value as Role)}
              mb='$3'
              w={'100%'}
              borderColor={'$blue6Light'}
              borderWidth={1}
              paddingLeft='$3'
              borderRadius={'$4'}
            >
              <YStack width={'100%'} gap='$1' paddingHorizontal={'$2'}>
                <RadioGroupItemWithLabel size='$4' value={Role.ADMIN} label='Admin' />
                <RadioGroupItemWithLabel size='$4' value={Role.USER} label='People' />
              </YStack>
            </RadioGroup>
          </View>
          {role === Role.USER && (
            <CustomSelect
              value={organizationId}
              onValueChange={setOrganizationId}
              data={data}
              isLoading={isLoading}
              searchValue={searchString}
              setSearchValue={setSearchString}
              title='Select Organization'
              placeholder='Select your organization'
            />
          )}
          <Button mt='$2' themeInverse w={'100%'} h={'$5'} onPress={handleNext} disabled={isPending}>
            {isPending ?
              <ActivityIndicator />
            : <ButtonText>{role === Role.USER ? 'Register' : 'Continue'}</ButtonText>}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
