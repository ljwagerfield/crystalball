//
// Configuration specific to the SERVER when running on LOCAL MACHINE.
//
import nodeExternals from 'webpack-node-externals';
import baseConfig from './webpack.config.server.base.js';

export default {
  ...baseConfig,
  entry: './src/server/index.express.ts',
  externals: [nodeExternals()] // Externalise ALL node modules.
};
