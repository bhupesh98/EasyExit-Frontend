export default {
  expo: {
    name: 'easy-exit',
    slug: 'easy-exit',
    version: '1.0.0',
    scheme: 'com.automatefreely.easyexit',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.automatefreely.easyexit',
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      permissions: ['android.permission.CAMERA'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    experiments: {
      typedRoutes: true,
    },
    plugins: [
      '@react-native-firebase/app',
      'expo-router',
      'expo-font',
      [
        'expo-notifications',
        {
          icon: './assets/adaptive-icon.png',
          color: '#ffffff',
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        },
      ],
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'dc32e4e9-969e-4a8b-a7c0-1f8940b2c780',
      },
    },
    owner: 'aidnitra',
  },
};
