import React from 'react';
import { Slot, SplashScreen, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '@/tamagui.config';
import { useFonts } from 'expo-font';
import * as Notification from 'expo-notifications';

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
    if (loaded) {
      SplashScreen.hideAsync();
    }
    // const time = setTimeout(() => {
    //   router.push('/checkerHome');
    // }, 500);
    // return () => clearTimeout(time);
  }, [loaded]);

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
