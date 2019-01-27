/**
 * Performs the following actions:
 *
 * 1) Synchronizes route changes redux w/ react-router. We didn't use ConnectedRouter since we have our own
 *    isomorphic abstractions in place.
 *
 * 2) Calls our 'route handlers' (things that prefetch state for URLs, and optionally redirect away from the route).
 *
 * 3) Tracks page changes via GA.
 */
import * as React from "react";
import {RootState} from "shared/state/RootState";
import {Store} from "redux";
import {handleError} from "shared/modules/Errors";
import {getRoute} from "shared/modules/routing/Routes";
import {setLocation} from "shared/state/http/isomorphic/location/LocationActions";
import {trackRouteChange} from "browser/modules/VirtualPageTracking";
import Url from "url-parse";
import {
  fetchRouteStateFailed, fetchRouteStateStarted,
  fetchRouteStateSuccess
} from "shared/state/http/browser/BrowserActions";

interface RouteChangeHandlerProps {
  store: Store<RootState>;
  history: any;
}

export interface QueryStringObj {
  [key: string]: string | string[]
}

// Singleton object... this is OK as is browser-only!
let previousUrlCache: string = null;

export default class RouteChangeHandler extends React.Component<RouteChangeHandlerProps, {}> {

  // Must use _WILL_ mount to ensure URL state is made available before the first browser-side render,
  // otherwise it will not match what was rendered on the server (if we were to use *DidMount).
  componentWillMount() {
    this.onPotentialRouteChange();
  }

  componentWillReceiveProps() {
    this.onPotentialRouteChange();
  }

  render(): any {
    return null;
  }

  onPotentialRouteChange() {
    const pathName = window.location.pathname;
    const queryString = window.location.search;
    const newUrl = pathName + queryString;

    if (newUrl === previousUrlCache) {
      return;
    }


    const previousUrl = previousUrlCache;
    previousUrlCache  = newUrl;

    this.onRouteChange(pathName, queryString, previousUrl);
  }

  onRouteChange(pathName: string, queryString: string, previousUrl: string|null): void {
    const store          = this.props.store;
    const queryObj       = Url.qs.parse(queryString) as QueryStringObj;
    const urlWithoutHost = pathName + queryString; // Includes the '?' prefix already.

    store.dispatch(
      setLocation(urlWithoutHost, pathName, queryObj)
    );

    store.dispatch(
      fetchRouteStateStarted(previousUrl, window.scrollY)
    );

    // Fetch next route's state, then invoke it.
    const route = getRoute(pathName);
    route
      .fetchState(store.getState, store.dispatch)
      .then(() => route.onArrive(store.getState, store.dispatch))
      .then((redirectUrl) => {

        // Include 'fetchState' and 'onArrive' in the loading progress.
        store.dispatch(
          fetchRouteStateSuccess()
        );

        // Handle redirects.
        if (typeof redirectUrl === "string") {
          this.onRedirect(this.props.history, redirectUrl);
        }
        else {
          this.onRouteChangeCommit(pathName);
        }
      })
      .catch(e => store.dispatch(
        fetchRouteStateFailed(
          handleError(e)
        )
      ))
      .return();
  }

  onRedirect(history: any, redirectUrl: string): void {
    history.replace(redirectUrl);
  }

  onRouteChangeCommit(newPath: string): void {
    trackRouteChange(newPath)
  }
}