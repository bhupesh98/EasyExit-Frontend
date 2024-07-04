const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver, ...rest } = config;

  return {
    ...rest,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    resolver: {
      ...resolver,
      assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...resolver.sourceExts, 'svg'],
    },
  };
})();
