import { AppContainer } from "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk"
import {applyMiddleware, compose, createStore, Store} from "redux";
import Container from "./components/container/Container";
import {root as rootReducer, RootState} from "shared/state/RootState";
import {beginBrowserSession} from "shared/state/http/browser/BrowserActions";
import {NormalizedHttpRequest} from "server/modules/NormalizedHttp";
import {parseCookiesFromHeader} from "shared/modules/CookieUtils";
import {initializeModules} from "shared/modules/Initializer";

declare const module: any;
declare function require(moduleName: string): any;

const rootElement = document.getElementById("react_container");

function init() {
  initializeModules();
  const store = initReduxStore();
  render(store);

  // The 'setTimeout' prevents a flicker caused by removing the precompiled styles before they have been regenerated.
  setTimeout(removePreCompiledStyles, 50);
}

function initReduxStore(): Store<RootState> {
  // Disable Redux DevTools in production? Their README states it's useful to have in production... users have
  // Chrome DevTools anyhow. Only reason to disable would be for performance (not sure if it degrades).
  const windowAny        = window as any;
  const composeEnhancers = windowAny.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const preloadedState   = windowAny.__REDUX_INITIAL_STATE__;
  const reduxMiddleware  = composeEnhancers(applyMiddleware(thunkMiddleware));
  const store            = createStore(rootReducer, preloadedState, reduxMiddleware);
  const initialAction    = beginBrowserSession(buildHttpRequestObj());
  store.dispatch(initialAction);

  return store;
}

function render(store: Store<RootState>) {
  const container =
    <Provider store={store}>
      <Container store={store} />
    </Provider>;

  if (!module.hot) {
    ReactDOM.render(container, rootElement);
  }
  else {
    module.hot.accept("./components/container/Container", () => {
      const NewContainer: typeof Container = require("./components/container/Container").default;
      const newContainer =
        <Provider store={store}>
          <NewContainer store={store} />
        </Provider>;
      renderWithHotLoading(newContainer);
    });

    renderWithHotLoading(container);
  }
}

function renderWithHotLoading(component: React.ReactElement<any>) {
  ReactDOM.render(<AppContainer>{component}</AppContainer>, rootElement);
}

function removePreCompiledStyles() {
  // Remove pre-compiled styles so they do not conflict with those set by hot-reloads.
  const preCompiledStyles = document.getElementById("pre_compiled_styles-components");
  preCompiledStyles.parentNode.removeChild(preCompiledStyles);
}

function buildHttpRequestObj(): NormalizedHttpRequest {
  // NOTE: Some information isn't available to JavaScript running in the browser. If we need properties
  // such as METHOD and HEADERS, then we'll need the server to render these into the page response.
  // However, this would preclude caching, and is in general a security risk (consider cookies marked
  // with 'HttpOnly': we'd be violating this by then exposing these cookies to JS).
  return {
    // Canonical properties:
    isSSL:          document.location.protocol === "https:",
    method:         "GET", // Not available.
    body:           null,  // No request body, since we're assuming GET.
    urlWithoutHost: document.location.pathname + document.location.search,
    headers:        { },   // Not available.

    // Derived properties:
    query:          { },   // This would require parsing. We can do this, but while we don't require it, let's save on some CPU cycles!
    path:           document.location.pathname,
    cookies:        parseCookiesFromHeader(document.cookie)
  };
}

init();