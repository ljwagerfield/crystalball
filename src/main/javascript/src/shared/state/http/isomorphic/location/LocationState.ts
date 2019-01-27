export interface IsomorphicLocation {
  urlWithoutHost: string;
  path: string; // same as `urlWithoutHost` but excludes querystring.
  query: {
    [key: string]: string | string[]
  };
}

export interface IsomorphicLocationState {
  current: IsomorphicLocation;
  previous?: IsomorphicLocation;
}

export const initialIsomorphicLocation: IsomorphicLocationState = {
  current: {
    urlWithoutHost: "/",
    path: "/",
    query: {}
  }
};