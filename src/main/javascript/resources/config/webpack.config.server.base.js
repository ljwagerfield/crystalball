//
// Configuration specific to the SERVER.
//
import path from 'path';
import R from "ramda";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import webpack from "webpack";
import baseConfig from "./webpack.config.base.js";

const isProduction    = process.env.NODE_ENV === "production";
const plugins         = [...baseConfig.plugins];

// Global vs. Component Styles
// ---------------------------
// (*) Global styles: styles that aren't included by any of the browser-side components. These styles can therefore
// be separated into a CSS file and also _removed_ from the browser-side JS bundle (since these styles are never
// loaded/referenced by any of the components, they aren't required in the browser-side JS bundle - the styles
// can "just exist" as global styles that are part of the template HTML).
// (*) Component styles: contains the styles for all the components. These styles are also bundled into the
// browser-side JS bundle. The "components CSS file" generated here is removed by JS on page load (to avoid problems
// caused by duplicate styles), but also allows the page to display correctly pre-dom-ready (or w/o JS altogether).
const assetVersion    = isProduction ? "[contenthash]." : "";
const globalStyles    = new ExtractTextPlugin(`global.${assetVersion}css`);
const componentStyles = new ExtractTextPlugin(`components.${assetVersion}css`);
plugins.push(globalStyles, componentStyles);

if (!isProduction) {
  // Required, even for inline source maps.
  plugins.push(
    new webpack.BannerPlugin({
      banner: "require('source-map-support').install();",
      entryOnly: true,
      raw: true,
      include: [/\.js$/]
    }),
  );
}

function adjustLoader(loaderObj) {
  return adjustLoaderForCssExtraction(loaderObj);
}

function adjustLoaderForCssExtraction(loaderObj) {
  const styleLoader = "style-loader!";
      
  if (!loaderObj.loader || !loaderObj.loader.startsWith(styleLoader))
    return [ loaderObj ];

  const cssLoader        = loaderObj.loader.substring(styleLoader.length);

  // Styles introduced only by server-side components are global: the browser app is completely unaware of them (they
  // are not included in the browser's JS bundle).
  const globalStylesPath = path.resolve(__dirname, "../../src/server");
  
  return [
    {
      ...loaderObj,
      loader: globalStyles.extract(cssLoader),
      include: globalStylesPath
    },
    {
      ...loaderObj,
      loader: componentStyles.extract(cssLoader),
      exclude: globalStylesPath
    }
  ];
}

export default {
  ...baseConfig,
  entry: "<PLACEHOLDER>",
  target: "node",
  output: {
    ...baseConfig.output,
    filename: "../server/index.js",
  },
  plugins: plugins,
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    loaders: R.chain(adjustLoader, baseConfig.module.loaders)
  }
};
