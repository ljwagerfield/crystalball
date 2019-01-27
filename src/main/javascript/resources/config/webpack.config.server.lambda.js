//
// Configuration specific to the SERVER when running on AWS LAMBDA.
//
import path from 'path';
import ExternalModulesPlugin from '../../src/webpack/ExternalModulesPlugin.js'
import baseConfig from './webpack.config.server.base.js';
const outputFile             = path.join(baseConfig.output.path, baseConfig.output.filename);
const outputFileDir          = outputFile.substr(0, outputFile.lastIndexOf("/"));
const nodeExternalsOutputDir = path.join(outputFileDir, "node_modules");
const externalModulesPlugin  = new ExternalModulesPlugin(nodeExternalsOutputDir);

export default {
  ...baseConfig,
  entry: './src/server/index.lambda.ts',
  plugins: [ ...baseConfig.plugins, externalModulesPlugin ],
  externals: [externalModulesPlugin.predicate()], // Externalise NATIVE node modules only.
  output: {
    ...baseConfig.output,

    // AWS Lambda requires us to export a function that can handle incoming requests (we call that function "handler").
    libraryTarget: "commonjs",
    library: "handler"
  }
};
