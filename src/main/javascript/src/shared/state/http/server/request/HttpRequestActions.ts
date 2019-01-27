import {NormalizedHttpRequest} from "server/modules/NormalizedHttp";
import {Dispatch} from "redux";
import {beginSession} from "shared/state/http/isomorphic/sessions/SessionActions";
import {ThunkAction} from "shared/state/Common";
import {setLocation} from "shared/state/http/isomorphic/location/LocationActions";

export type HttpRequestAction = {
  type: 'BEGIN_HTTP_REQUEST';
  request: NormalizedHttpRequest;
}

export function beginHttpRequest(request: NormalizedHttpRequest): ThunkAction<void> {
  return (dispatch: Dispatch<any>) => {
    // Isomorphic:
    dispatch(
      beginSession(request)
    );
    // Only required on server (browser calls 'setLocation' action naturally on startup).
    dispatch(
      setLocation(request.urlWithoutHost, request.path, request.query)
    );
    // Server-specific:
    dispatch({
      type: 'BEGIN_HTTP_REQUEST',
      request: request
    });
  };
}
