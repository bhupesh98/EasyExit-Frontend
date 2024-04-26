import React from 'react';
import { Slot, SplashScreen, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '@/tamagui.config';
import { useFonts } from 'expo-font';
import * as Notification from 'expo-notifications';
import { Role } from '@/constants/Role';
import { getItemAsync } from 'expo-secure-store';
import useNotification from '@/hooks/useNotification';

import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

SplashScreen.preventAutoHideAsync();

function useNotificationObserver(setOpenDueToNotification) {
  React.useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notification.Notification) {
      console.log('Notification form redirect: ', notification);

      router.replace('/(app)/announcements');
      setOpenDueToNotification(true);
    }

    Notification.getLastNotificationResponseAsync().then(response => {
      console.log('responce -> ', response);
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notification.addNotificationResponseReceivedListener(response => {
      console.log('Here only');
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

export default function RootLayout() {
  // notification observer
  const [openedDueToNotification, setOpenDueToNotification] = React.useState<Boolean>(false);

  useNotificationObserver(setOpenDueToNotification);

  const { subscribeTopic, setBackgroundMessageHandler, requestUserPermission, handleNotification, getToken } =
    useNotification();

  React.useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
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

    // Handle background notification
    setBackgroundMessageHandler();

    // in app notification
    handleNotification();
    // const organization_id = 'a020592e-1537-4672-aa3e-743db0e1fcf2';
    // subscribeTopic(`${organization_id}-${'ann'}`);
  }, []);

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  React.useEffect(() => {
    (async () => {
      const token = await getItemAsync('token');
      const role = await getItemAsync('role');
      if (token && role) {
        if (role === Role.ADMIN) router.replace('/(app)/adminHome');
        if (role === Role.MANAGER) router.replace('/(app)/managerHome');
        if (role === Role.USER) router.replace('/(app)/home');
        if (role === Role.CHECKER) router.replace('/(app)/checkerHome');
      }
      SplashScreen.hideAsync();
    })();
  }, [loaded]);

  React.useEffect(() => {}, [loaded]);

  // React.useEffect(() => {
  //   (async () => {
  //     const token = await getItemAsync('token');
  //     const role = await getItemAsync('role');
  //     if (token && role) {
  //       // router.replace()
  //     }
  //     SplashScreen.hideAsync();
  //   })();
  // }, [openedDueToNotification])

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Theme name='blue' inverse>
            <Slot />
          </Theme>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
