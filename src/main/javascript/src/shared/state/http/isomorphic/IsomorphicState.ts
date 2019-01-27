import {combineReducers} from "redux";
import {ActiveCookies} from "shared/state/http/isomorphic/cookies/CookieState";
import cookies from "shared/state/http/isomorphic/cookies/CookieReducer";
import location from "shared/state/http/isomorphic/location/LocationReducer";
import {IsomorphicLocationState} from "shared/state/http/isomorphic/location/LocationState";

export interface IsomorphicState {
  cookies: ActiveCookies;
  location: IsomorphicLocationState;
}

export const isomorphic = combineReducers<IsomorphicState>({
  cookies,
  location
});