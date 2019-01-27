//
// Configuration specific to the BROWSER.
//
import path from 'path';
import baseConfig from './webpack.config.base.js';

const isProduction = process.env.NODE_ENV === 'production';
const assetVersion = isProduction ? "[hash]." : "";

export default {
  ...baseConfig,
  entry: './src/browser/index.tsx',
  target: 'web',
  output: {
    ...baseConfig.output,
    filename: `index.browser.${assetVersion}js`,
    chunkFilename: `index.browser.[id].${assetVersion}js`,
  }
};
