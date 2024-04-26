import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Linking } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

export default function useNotification() {
  function setBackgroundMessageHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      // send a notification to the user
      Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.data?.title.toString(),
          body: remoteMessage.data?.description.toString(),
        },
        trigger: null,
      });
    });
  }
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  function subscribeTopic(topic: string) {
    messaging()
      .subscribeToTopic(topic)
      .then(() => console.log(`Subscribed to topic - ${topic}`));
  }

  function unsubscribeTopic(topic: string) {
    messaging()
      .unsubscribeFromTopic(topic)
      .then(() => console.log(`Unsubscribed to topic - ${topic}`));
  }

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log('TOKEN: ', pushTokenString);
        // return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  }

  const handleNotification = () => {
    messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage));
      Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.data?.title.toString(),
          body: remoteMessage.data?.description.toString(),
        },
        trigger: null,
      });
    });
  };

  const handleNotificationResponce = (response: Notifications.NotificationResponse) => {
    const data: { url?: string } = response.notification.request.content.data;
    if (data?.url) {
      Linking.openURL(data.url);
    }
  };

  const getToken = () => {
    messaging()
      .getToken()
      .then(token => console.log(token));
  };
  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponce,
    requestUserPermission,
    subscribeTopic,
    unsubscribeTopic,
    setBackgroundMessageHandler,
    getToken,
  };
}
