//
// Configuration common across BROWSER and SERVER.
//
import path from 'path';
import webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';
const isAwsLambda  = "lambda" === (process.env.SERVER_TYPE || "").toLowerCase();
const publicPath   = '/assets/';
const cssFlags     = isProduction ? '?minimize' : '?sourceMap';
const postCssFlags = isProduction ? '' : '?sourceMap';
const scssFlags    = isProduction ? '' : '&sourceMap';
const plugins      = [
  new webpack.NoEmitOnErrorsPlugin()

  // Enable to switch into 'bundle analyser' mode.
  //new BundleAnalyzerPlugin()
];

console.log(`Build mode: ${isProduction ? 'PROD' : 'DEV'}`);

if (isProduction) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}
else {
  plugins.push(
    new webpack.NamedModulesPlugin()
  );
}

export default {
  entry: '<PLACEHOLDER>',
  target: '<PLACEHOLDER>',
  output: {
    path: path.join(__dirname, '../tmp/dist/assets'),
    filename: '<PLACHOLDER>',
    publicPath: publicPath
  },
  cache: !isProduction,
  devtool: isProduction ? false : 'eval',
  plugins: plugins,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      // Remember to keep in sync with `tsconfig.js`!
      assets: path.resolve(__dirname, '../assets'),
      browser: path.resolve(__dirname, '../../src/browser'),
      server: path.resolve(__dirname, '../../src/server'),
      shared: path.resolve(__dirname, '../../src/shared')
    }
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader?presets=react", "ts-loader"],
        exclude: /node_modules/
      },
      {
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        loader: `style-loader!css-loader${cssFlags}!postcss-loader${postCssFlags}`
      },
      {
        test: /\.scss/,
        loader: `style-loader!css-loader${cssFlags}!postcss-loader${postCssFlags}!sass-loader?outputStyle=expanded${scssFlags}`
      },
      {
        test: /\.(ico|png|jpg|ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
        exclude: /\/external\//
      },
      {
        // Forces these assets to be loaded by URL (rather than inline base64 content).
        test: /\/external\/.*?\.(ico|png|jpg|ttf|eot|svg|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  }
};
