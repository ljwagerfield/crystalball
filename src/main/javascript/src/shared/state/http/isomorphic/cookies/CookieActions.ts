import {Environment} from "shared/state/http/environment/EnvironmentState";
import {Dispatch} from "redux";
import {returnCookie} from "shared/state/http/server/response/HttpResponseActions";
import {setCookieInBrowser} from "shared/state/http/browser/BrowserActions";
import {ThunkAction} from "shared/state/Common";

export function setCookie(env: Environment, name: string, value: string, maxAge?: number): ThunkAction<void> {
  return (dispatch: Dispatch<any>) => {
    if (env.isBrowser) {
      dispatch(setCookieInBrowser(name, value, maxAge));
    }

    if (env.isServer) {
      dispatch(returnCookie(name, value, maxAge));
    }
  };
}
export function deleteCookie(env: Environment, name: string): ThunkAction<void> {
  return (dispatch: Dispatch<any>) => {
    dispatch(
      setCookie(env, name, null, 0)
    );
  };
}