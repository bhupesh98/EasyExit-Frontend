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

SplashScreen.preventAutoHideAsync();

Notification.setNotificationHandler({
  async handleNotification(notification) {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority: Notification.AndroidNotificationPriority.HIGH,
    };
  },
});

export default function RootLayout() {
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

  React.useEffect(() => { }, [loaded]);

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
