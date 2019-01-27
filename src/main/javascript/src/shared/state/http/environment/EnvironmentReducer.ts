import {Environment} from "shared/state/http/environment/EnvironmentState";
import {HttpRequestAction} from "shared/state/http/server/request/HttpRequestActions";
import {BrowserAction} from "shared/state/http/browser/BrowserActions";

export default function environment(oldState: Environment = null, action: any): Environment {

  const browserSession = action as BrowserAction;
  if (browserSession.type == "BEGIN_BROWSER_SESSION") {
    return { isServer: false, isBrowser: true };
  }

  const serverRequest  = action as HttpRequestAction;
  if (serverRequest.type == "BEGIN_HTTP_REQUEST") {
    return { isServer: true, isBrowser: false };
  }

  return oldState;
}