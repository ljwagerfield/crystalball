import Promise from "bluebird";
import {RouterContext} from "react-router-dom";
import {RootState} from "shared/state/RootState";
import {Dispatch} from "redux";
import {Location, LocationDescriptorObject} from 'history';
import * as H from 'history';

// ----------
// INTERFACES
// ----------

export type RouteResolver = (path: string) => RouteHandlerAggregator;

export type RedirectDestination = string | {}

export interface RouteHandler {
  matches: ((path: string) => boolean) | string;

  /**
   * Fetches all required state for the route, but makes no commitments to actually loading the route.
   * Can be used inside components (e.g. form submissions) to eagerly load the state of the next route,
   * ahead of actually navigating to it.
   */
  fetchState?(getState: () => RootState, dispatch: Dispatch<any>): Promise<void>;

  /**
   * Called when the user accesses the route, but before any components are rendered.
   */
  onArrive?(getState: () => RootState, dispatch: Dispatch<any>): Promise<RedirectDestination>;
}

export type ChangeRoute = (newLocation: H.LocationDescriptor, emulateLinkClick?: boolean) => void;

export interface RouteTransition {
  transitionName: string;
  hasExitTransition: boolean;
  hasEnterTransition: boolean;
  removeOldRouteAfterMs: number|null; // null == do not remove old route, 0 == remove immediately, >1 == remove after N ms.
}

// --------------
// IMPLEMENTATION
// --------------

// Used to eagerly set up transitions for 'TRoute's that rely on arbitrary state (e.g. <TRoute path={() => boolean}) as
// opposed to location state (e.g. <TRoute path={string | string[]}). The intended use is to call this method BEFORE
// making a potential state change that results in the (un)loading of a 'TRoute' you want to transition.
export function prepareStateTransition(transition: RouteTransition, changeRoute: ChangeRoute, state: RootState) {
  changeRoute(
    transitionTo(
      state.http.isomorphic.location.current.urlWithoutHost,
      transition
    )
  );
}

export function transitionTo(
  url: string,
  transition: RouteTransition
): LocationDescriptorObject {
  const qsIndex = url.indexOf("?");
  return qsIndex == -1
    ? { state: transition, pathname: url }
    : { state: transition, pathname: url.substring(0, qsIndex), search: url.substring(qsIndex) };
}

// export function getUrlSegment(index: number, path: string): string {
//   const segments = path.split("/", index + 1);
//   return index < segments.length ? segments[index] : null;
// }

// ("/my/base/path", "/my/base/path/child/grandchild") -> ("child")
export function getChildPath(baseUrlNoTrailingSlash: string, path: string): string {
  const startOfChildPath = baseUrlNoTrailingSlash.length + 1;
  const endOfChildPath   = path.indexOf("/", startOfChildPath);
  return path.substring(startOfChildPath, endOfChildPath > -1 ? endOfChildPath : undefined);
}

export function navLinkIsActiveFix(link: string): (match: any, location: Location) => boolean {
  return (_match: any, location: Location) => {
    return link == location.pathname + location.search;
  };
}

export function changeRoute(context: {router: RouterContext}): ChangeRoute {
  return (newLocation, canGoBack) => canGoBack
    ? context.router.history.push(newLocation)
    : context.router.history.replace(newLocation);
}

export function composeRoutes(options: RouteHandler[]): RouteResolver {
  return (urlWithoutHost: string) => {

    const qsIndex = urlWithoutHost.indexOf("?");
    let path = urlWithoutHost;

    // Strip out the `?`.
    if (qsIndex != -1) {
      path = urlWithoutHost.substring(0, qsIndex);
    }

    // Remove trailing '/' to normalise the path.
    if (path.length > 1 && path.endsWith("/")) {
      path = path.substring(0, path.length - 1);
    }

    return new RouteHandlerAggregator(
      options.filter(r => {
        if (typeof r.matches === "string") {
          return r.matches === path;
        }
        if (typeof r.matches === "function") {
          return r.matches(urlWithoutHost); // Allow matching functions to see whole URL (including querystring).
        }
        return false; // Should never happen.
      })
    );
  }
}

export class RouteHandlerAggregator {
  matchedRoutes: RouteHandler[];

  constructor(matchedRoutes: RouteHandler[]) {
    this.matchedRoutes = matchedRoutes;
  }

  fetchState(getState: () => RootState, dispatch: Dispatch<any>): Promise<void> {
    let promise = Promise.resolve();

    // Sequentially process routes. This allows routes to assume previous routes have loaded their state (e.g.
    // if they require the user profile, for example, which is loaded by the initial catch-all route).
    this.matchedRoutes.forEach(r => {
      promise = promise.then(() => {
        return r.fetchState ? r.fetchState(getState, dispatch) : Promise.resolve();
      });
    });

    return promise.return();
  }

  onArrive(getState: () => RootState, dispatch: Dispatch<any>): Promise<RedirectDestination> {
    return Promise.all(this.matchedRoutes.map(r =>
        r.onArrive ? r.onArrive(getState, dispatch) : Promise.resolve({})
      ))
      .then((redirects) => {
        // Return the first URL (if any) returned by a handle to indicate a redirect.
        return redirects.find((r: RedirectDestination) => typeof r === "string");
      });
  }
}

// true:  /hello -> /hello
// true:  /hello -> /hello/
// true:  /hello -> /hello/world
// true:  /hello -> /hello?world=foo
// false: /hello -> /hello_world
export function withRootPath(baseUrl: string): (url: string) => boolean {
  return (url) => {
    if (url.startsWith(baseUrl)) {
      if (url.length == baseUrl.length) {
        return true;
      }

      const firstNewChar = url.charAt(baseUrl.length);

      return firstNewChar == "?" || firstNewChar == "/";
    }

    return false;
  }
}