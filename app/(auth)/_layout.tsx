import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_left' }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='register' />
      <Stack.Screen name='createOrganization' />
    </Stack>
  );
}
