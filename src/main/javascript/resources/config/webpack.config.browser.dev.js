//
// Configuration specific to the BROWSER (when running with HMR).
//
import path from 'path';
import browserConfig from './webpack.config.browser.js';

const isProduction = process.env.NODE_ENV === 'production';
const applicationPort = 3000;
const hotReloadPort = 3001;
const assetDir = browserConfig.output.publicPath;

if (isProduction) {
  console.error("You must not build in 'production' mode when compiling the HMR version of the codebase.")
}

export default {
  ...browserConfig,
  entry: [
    'react-hot-loader/patch',
    './src/browser/index.tsx'
  ],
  devServer: {
    hotOnly: true,
    open: true,
    port: hotReloadPort,
    contentBase: path.join(__dirname, '../tmp/dist/assets'),
    proxy: [
      {
        path: function(path) {
          return path.startsWith('/blog');
        },
        target: 'http://localhost:3002/'
      },
      {
        path: function(path) {
          // Catch every path, except those which must be handled by webpack.
          // Note: generated JS assets automatically override whatever gets 
          // served by the proxy, so we don't need to exclude JS asset paths here.
          return !path.endsWith('.hot-update.json');
        },
        target: 'http://localhost:' + applicationPort,
        bypass: function(req, res, proxyOptions) {
          if (req.path.startsWith(assetDir)) {
            const localFileName = req.path.substring(assetDir.length);
            return localFileName; // Translate /assets/blah.jpg to /blah.jpg & serve from underlying webpack server.
          }
          else {
            return false;
          }        
        }
      }
    ]
  }
};
