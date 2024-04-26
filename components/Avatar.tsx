import { View } from 'tamagui';
import { Image } from 'react-native';
import React from 'react';
import { AvatarProps } from '@/interfaces/Avatar';

export default function Avatar(props: AvatarProps) {
  return (
    <View
      style={{ width: props.w ?? 100, height: props.h ?? 100, borderRadius: 100, padding: (props.h ?? 100) /20, borderColor: 'black', borderWidth: 1}}
      onPress={props.onPress}
    >
      <Image
        source={{
          uri: props.imageUri,
        }}
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover',
          borderRadius: 100,
          zIndex:props.zi ?? 0
        }}
      ></Image>
    </View>
  );
}
