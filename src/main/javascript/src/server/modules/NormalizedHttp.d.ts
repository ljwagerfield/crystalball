export interface NormalizedHttpRequest {
  // Canonical properties:
  isSSL: boolean;
  method: string;
  urlWithoutHost: string;
  body: null | string;
  headers: {
    [key: string]: string | string[] // Header names must be normalized to LOWER-CASE (ironic emphasis intended).
  }

  // Derived properties:
  path: string; // same as `urlWithoutHost` but excludes querystring.
  query: {
    [key: string]: string | string[]
  }
  cookies: {
    [key: string]: string
  }
}

export interface NormalizedHttpResponse {
  status: number;
  headers: {name: string, value: string}[];
  body?: string;
}