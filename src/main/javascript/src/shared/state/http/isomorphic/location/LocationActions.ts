import {QueryStringObj} from "browser/components/routechange/RouteChangeHandler";

export type IsomorphicLocationAction = {
  type: 'SET_LOCATION';
  urlWithoutHost: string;
  path: string;
  query: QueryStringObj;
}

export function setLocation(urlWithoutHost: string, path: string, query: QueryStringObj): IsomorphicLocationAction {
  return {
    type: 'SET_LOCATION',
    urlWithoutHost,
    path,
    query
  };
}