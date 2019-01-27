import {combineReducers} from "redux";
import environment from "shared/state/http/environment/EnvironmentReducer";
import {Environment} from "shared/state/http/environment/EnvironmentState";
import {server, ServerState} from "shared/state/http/server/ServerState";
import {isomorphic, IsomorphicState} from "shared/state/http/isomorphic/IsomorphicState";
import {BrowserState} from "shared/state/http/browser/BrowserState";
import browser from "shared/state/http/browser/BrowserReducer";

export interface HttpState {
  environment: Environment;
  browser: BrowserState;
  server: ServerState;
  isomorphic: IsomorphicState;
}

export const http = combineReducers<HttpState>({
  environment,
  browser,
  server,
  isomorphic
});