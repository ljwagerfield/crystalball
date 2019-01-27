import {ActiveCookies} from "shared/state/http/isomorphic/cookies/CookieState";
import {HttpResponseAction} from "shared/state/http/server/response/HttpResponseActions";
import {BrowserAction} from "shared/state/http/browser/BrowserActions";
import {IsomorphicSessionAction} from "shared/state/http/isomorphic/sessions/SessionActions";

export default function cookies(oldState: ActiveCookies = null, action: any): ActiveCookies {

  // --- ISOMORPHIC (On Session Start) ---
  const sessionAction = action as IsomorphicSessionAction;
  if (sessionAction.type == "BEGIN_SESSION") {
    return sessionAction.request.cookies;
  }

  // --- BROWSER SIDE (Set Cookie) ---
  const browserAction = action as BrowserAction;
  if (browserAction.type == "SET_COOKIE_IN_BROWSER") {
    const cookies = { ...oldState }; // Should be initialised by this point (by the above action).
    cookies[browserAction.cookieName] = browserAction.cookieValue;
    return cookies;
  }

  // --- SERVER SIDE (Return Cookie) ---
  const serverResponse  = action as HttpResponseAction;
  if (serverResponse.type == "RETURN_COOKIE") {
    const cookies = { ...oldState }; // Should be initialised by this point (by the above action).
    cookies[serverResponse.cookieName] = serverResponse.cookieValue;
    return cookies;
  }

  return oldState;
}