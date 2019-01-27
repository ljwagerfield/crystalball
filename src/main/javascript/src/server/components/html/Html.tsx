import * as React from "react";
import {HelmetData} from "react-helmet";
import {RootState} from "shared/state/RootState";
import {isProduction} from "shared/modules/Environment";
import {assetsBaseUrl, siteDescription} from "shared/modules/Constants";

// Favicons (Standard)
import icon16 from "assets/external/hashed/favicons/favicon-16x16.png"
import icon32 from "assets/external/hashed/favicons/favicon-32x32.png"
import icon96 from "assets/external/hashed/favicons/favicon-96x96.png"
import icon128 from "assets/external/hashed/favicons/favicon-128.png"

// Favicons (Apple)
import icon57 from "assets/external/hashed/favicons/apple-touch-icon-57x57.png"
import icon60 from "assets/external/hashed/favicons/apple-touch-icon-60x60.png"
import icon72 from "assets/external/hashed/favicons/apple-touch-icon-72x72.png"
import icon76 from "assets/external/hashed/favicons/apple-touch-icon-76x76.png"
import icon114 from "assets/external/hashed/favicons/apple-touch-icon-114x114.png"
import icon120 from "assets/external/hashed/favicons/apple-touch-icon-120x120.png"
import icon144 from "assets/external/hashed/favicons/apple-touch-icon-144x144.png"
import icon152 from "assets/external/hashed/favicons/apple-touch-icon-152x152.png"
import icon196 from "assets/external/hashed/favicons/favicon-196x196.png"

// Favicons (Microsoft)
import icon70 from "assets/external/hashed/favicons/mstile-70x70.png"
import icon150 from "assets/external/hashed/favicons/mstile-150x150.png"
import icon310_150 from "assets/external/hashed/favicons/mstile-310x150.png"
import icon310 from "assets/external/hashed/favicons/mstile-310x310.png"

import "./Html.scss";

// Todo: should probably change from page-to-page... if a page doesn't supply one, what do we do? i.e.
// if the use decides to share some random page -- if we don't have a description, what gets displayed
// in Twitter etc.?
const pageDescription = siteDescription;

function getHtmlAttrs(helmet: HelmetData) {
  const {children, ...htmlAttrs} = helmet.htmlAttributes.toComponent();
  return htmlAttrs;
}

function getBodyAttrs(helmet: HelmetData) {
  const {children, ...bodyAttrs} = helmet.bodyAttributes.toComponent();
  return bodyAttrs;
}

export default ({ helmet, placeholder, clientState, enableBrowserJS }: { helmet: HelmetData, placeholder: string, clientState: RootState, enableBrowserJS: boolean}) => {
  return (
      <html lang="en" itemScope itemType="http://schema.org/Article" {...getHtmlAttrs(helmet)}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <link id="pre_compiled_styles-global"     rel="stylesheet" href={`${assetsBaseUrl}global.css`} />
        <link id="pre_compiled_styles-components" rel="stylesheet" href={`${assetsBaseUrl}components.css`} />

        {/* Favicons */}
        <link rel="apple-touch-icon-precomposed" sizes="57x57"   href={icon57} />
        <link rel="apple-touch-icon-precomposed" sizes="60x60"   href={icon60} />
        <link rel="apple-touch-icon-precomposed" sizes="72x72"   href={icon72} />
        <link rel="apple-touch-icon-precomposed" sizes="76x76"   href={icon76} />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href={icon114} />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href={icon120} />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href={icon144} />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href={icon152} />
        <link rel="icon" type="image/png" sizes="196x196" href={icon196} />
        <link rel="icon" type="image/png" sizes="96x96"   href={icon96} />
        <link rel="icon" type="image/png" sizes="32x32"   href={icon32} />
        <link rel="icon" type="image/png" sizes="16x16"   href={icon16} />
        <link rel="icon" type="image/png" sizes="128x128" href={icon128} />

        {/* Windows/IE tags */}
        <meta name="application-name"                content="CrystalBall"/>
        <meta name="msapplication-TileColor"         content="#00a562" />
        <meta name="msapplication-TileImage"         content={icon144} />
        <meta name="msapplication-square70x70logo"   content={icon70} />
        <meta name="msapplication-square150x150logo" content={icon150} />
        <meta name="msapplication-wide310x150logo"   content={icon310_150} />
        <meta name="msapplication-square310x310logo" content={icon310} />

        {/* General */}
        <meta name="viewport"                        content="width=device-width, initial-scale=1" />
        <meta name="description"                     content={pageDescription} />

      </head>
      <body {...getBodyAttrs(helmet)}>
      <div id="react_container" className="hide_on_old_browsers">{placeholder}</div>
      <div className="show_on_old_browsers">
        {/* Place at bottom to ensure Google doesn't treat as important content. */}
        <div className="container browsers">
          <h2>You are using an <strong>outdated</strong> browser.</h2>
          <p>This website requires a modern web browser -- the latest versions of these browsers are supported:</p>
          <div className="row browsers-choices">
            <div className="col-sm-3 col-lg-2">
              <a target="_blank" href="https://www.google.com/chrome/browser/desktop/">
                <div className="browsers-choice browsers-chrome with-icon">
                  <p className="browsers-title">Chrome</p>
                  <p className="browsers-download">Download</p>
                </div>
              </a>
            </div>
            <div className="col-sm-3 col-lg-2">
              <a target="_blank" href="https://www.mozilla.org/firefox/new/">
                <div className="browsers-choice browsers-firefox with-icon">
                  <p className="browsers-title">Firefox</p>
                  <p className="browsers-download">Download</p>
                </div>
              </a>
            </div>
            <div className="col-sm-3 col-lg-2">
              <a target="_blank" href="https://www.opera.com/">
                <div className="browsers-choice browsers-opera with-icon">
                  <p className="browsers-title">Opera</p>
                  <p className="browsers-download">Download</p>
                </div>
              </a>
            </div>
            <div className="col-sm-3 col-lg-2">
              <a target="_blank" href="https://support.apple.com/en-us/HT204416">
                <div className="browsers-choice browsers-safari with-icon">
                  <p className="browsers-title">Safari</p>
                  <p className="browsers-download">Download<br/>(macOS only)</p>
                </div>
              </a>
            </div>
            <div className="col-sm-offset-3 col-lg-offset-0 col-sm-3 col-lg-2">
              <a target="_blank" href="https://windows.microsoft.com/ie">
                <div className="browsers-choice browsers-ie with-icon">
                  <p className="browsers-title">Internet Explorer</p>
                  <p className="browsers-download">Download<br/>(Windows only)</p>
                </div>
              </a>
            </div>
            <div className="col-sm-3 col-lg-2">
              <a target="_blank" href="https://www.microsoft.com/en-us/windows/microsoft-edge">
                <div className="browsers-choice browsers-edge with-icon">
                  <p className="browsers-title">Microsoft Edge</p>
                  <p className="browsers-download">Download<br/>(Windows only)</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <script type="text/javascript" dangerouslySetInnerHTML={{__html: `

            // Google Analytics.

            ${!isProduction ? "" : `
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-99626680-1', 'auto');
              ga('send', 'pageview');
            `}

            ${!enableBrowserJS ? "" : `

            // Application state.

            window.__REDUX_INITIAL_STATE__ = ${JSON.stringify(clientState).replace(/</g, '\\u003c')};
            window.__IS_PRODUCTION__ = ${isProduction};

            // Load JS files asynchronously.

            function loadScript(scriptUrl) {
              const element = document.createElement("script");
              element.src = scriptUrl;
              document.body.appendChild(element);
            }

            function runAsync() {
              loadScript("${assetsBaseUrl}index.browser.js");
            }

            if (window.addEventListener) {
              window.addEventListener("load", runAsync, false);
            }
            else if (window.attachEvent) {
              window.attachEvent("onload", runAsync);
            }
            else {
              window.onload = runAsync;
            }

            `}

          `}}></script>
      </body>
      </html>
  );
}