import {IncompleteHttpResponse, initialHttpResponse} from "shared/state/http/server/response/HttpResponseState";
import {HttpResponseAction} from "shared/state/http/server/response/HttpResponseActions";

export default function response(oldState: IncompleteHttpResponse = initialHttpResponse, action: HttpResponseAction): IncompleteHttpResponse {
  let newState: IncompleteHttpResponse;

  switch (action.type) {

    case 'RETURN_HTTP_STATUS_CODE':
      return {
        ...oldState,
        statusCode: action.statusCode
      };

    case 'RETURN_HTTP_HEADER':
      // Deep copy the parts we're mutating...
      newState = {
        ...oldState,
        headers: {
          ...oldState.headers
        }
      };

      newState.headers[action.headerName] = action.headerValue;

      return newState;

    case 'RETURN_COOKIE':
      // Deep copy the parts we're mutating...
      newState = {
        ...oldState,
        cookies: {
          ...oldState.cookies
        }
      };

      newState.cookies[action.cookieName] = {
        value: action.cookieValue,
        maxAge: action.cookieMaxAge
      };

      return newState;

    default:
      return oldState;
  }
}