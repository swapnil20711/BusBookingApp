const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Optional: Extend source extensions if needed
defaultConfig.resolver.sourceExts.push('ts', 'tsx');

const config = mergeConfig(
  getDefaultConfig(__dirname, {
    transformer: {
      // Required only if you’re doing custom transforms
      // e.g., using SVGs with `react-native-svg-transformer`
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
  }),
);

module.exports = withNativeWind(config, {input: './global.css'});
