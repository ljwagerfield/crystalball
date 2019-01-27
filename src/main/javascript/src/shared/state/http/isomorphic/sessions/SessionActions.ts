import {NormalizedHttpRequest} from "server/modules/NormalizedHttp";
export type IsomorphicSessionAction = {
  type: 'BEGIN_SESSION';
  request: NormalizedHttpRequest;
}

export function beginSession(request: NormalizedHttpRequest): IsomorphicSessionAction {
  return {
    type: 'BEGIN_SESSION',
    request: request
  };
}