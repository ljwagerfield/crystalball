import {NormalizedHttpRequest} from "server/modules/NormalizedHttp";
import {cookieToString} from "shared/modules/CookieUtils";
import {ThunkAction} from "shared/state/Common";
import {beginSession} from "shared/state/http/isomorphic/sessions/SessionActions";

export type BrowserAction = {
  type: "SET_COOKIE_IN_BROWSER";
  cookieName: string;
  cookieValue: string;
  cookieMaxAge?: number;
} | {
  type: "BEGIN_BROWSER_SESSION";
  initialRequest: NormalizedHttpRequest;
} | {
  type: "FETCH_ROUTE_STATE_STARTED";
  previousUrl: string|null;
  previousScrollPosition: number;
} | {
  type: "FETCH_ROUTE_STATE_SUCCESS";
} | {
  type: "FETCH_ROUTE_STATE_FAILED";
  displayableError: string;
} | {
  type: "SCROLL_POSITION_RESTORED";
  restoredScrollPosition: number;
}

export function beginBrowserSession(initialRequest: NormalizedHttpRequest): ThunkAction<void> {
  return (dispatch) => {
    // Isomorphic:
    dispatch(
      beginSession(initialRequest)
    );
    // Browser-specific:
    dispatch({
      type: "BEGIN_BROWSER_SESSION",
      initialRequest: initialRequest
    });
  };
}

export function setCookieInBrowser(name: string, value: string, maxAge?: number): ThunkAction<void> {
  return (dispatch) => {
    const isSSL  = document.location.protocol === "https:";
    const cookie = cookieToString(name, value, isSSL, maxAge);

    // Odd signature, but this actually behaves like a dictionary, keyed on the cookie name.
    document.cookie = cookie;

    dispatch({
      type: "SET_COOKIE_IN_BROWSER",
      cookieName: name,
      cookieValue: value,
      cookieMaxAge: maxAge
    } as BrowserAction);
  };
}

export function fetchRouteStateStarted(previousUrl: string|null, previousScrollPosition: number): BrowserAction {
  return {
    type: "FETCH_ROUTE_STATE_STARTED",
    previousUrl,
    previousScrollPosition
  };
}

export function fetchRouteStateSuccess(): BrowserAction {
  return {
    type: "FETCH_ROUTE_STATE_SUCCESS"
  };
}

export function fetchRouteStateFailed(displayableError: string): BrowserAction {
  return {
    type: "FETCH_ROUTE_STATE_FAILED",
    displayableError
  };
}

export function restoreScrollPosition(scrollPosition: number): BrowserAction {
  return {
    type: "SCROLL_POSITION_RESTORED",
    restoredScrollPosition: scrollPosition
  };
}