import browserConfig from './webpack.config.browser.js';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const plugins = [...browserConfig.plugins];

plugins.push(new BundleAnalyzerPlugin({defaultSizes: 'gzip',}));

export default {
  ...browserConfig,
  plugins: plugins
};
