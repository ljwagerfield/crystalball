import response from "shared/state/http/server/response/HttpResponseReducer";
import request from "shared/state/http/server/request/HttpRequestReducer";
import {combineReducers} from "redux";
import {IncompleteHttpResponse} from "shared/state/http/server/response/HttpResponseState";
import {NormalizedHttpRequest} from "server/modules/NormalizedHttp";

export interface ServerState {
  request?: NormalizedHttpRequest;
  response: IncompleteHttpResponse;
}

export const server = combineReducers<ServerState>({
  request,
  response
});