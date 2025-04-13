const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    // Add the directory where your .env file is located
    path.resolve(__dirname),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
