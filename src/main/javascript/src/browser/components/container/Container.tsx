//
// The container executed on the BROWSER.
//
import * as React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import {RouteRenderer} from "shared/modules/routing/Routes";
import {RootState} from "shared/state/RootState";
import {Store} from "redux";
import RouteChangeHandler from "browser/components/routechange/RouteChangeHandler";

export default ({store}: {store: Store<RootState>}) =>
  <BrowserRouter>
    <div>

      {/* Used to reset focus between 'page loads' */}
      <div id="focus-reset" tabIndex={-1} />

      <Route path="/" children={({history}: {history: any}) => (
        <RouteChangeHandler store={store} history={history} />
      )}/>

      <RouteRenderer />

    </div>
  </BrowserRouter>
