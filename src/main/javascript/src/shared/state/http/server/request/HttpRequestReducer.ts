import {HttpRequestAction} from "shared/state/http/server/request/HttpRequestActions";
import {NormalizedHttpRequest} from "server/modules/NormalizedHttp";

export default function request(oldState: NormalizedHttpRequest = null, action: HttpRequestAction): NormalizedHttpRequest {
  switch (action.type) {

    case 'BEGIN_HTTP_REQUEST':
      return action.request;

    default:
      return oldState;
  }
}