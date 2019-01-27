import Promise from "bluebird";
import {
  ApiClientError, ApiServerError, InfrastructureError, BadLocalStateError,
  NotFoundError, TokenExpiredError, BadGlobalStateError
} from "shared/modules/Errors";

import {baseApiUrl} from "shared/modules/Constants";

export type HttpMethod = "GET" | "DELETE" | "POST" | "PUT";

function assertSuccessful(response: Response): Promise<Response> {
  const status = response.status;

  if (status >= 200 && status < 300) {
    return Promise.resolve(response);
  }
  else if (status >= 400 && status < 500) {
    if (status == 404) {
      return Promise.reject(new NotFoundError(response.statusText, response));
    }
    else if (status == 410) { // We only use "GONE" when a JWT has expired... bit of a misuse... but hey.
      return Promise.reject(new TokenExpiredError(response));
    }
    else if (status == 409) {
      return assimilatePromise(response.json())
        .then((errors: string[]) => {
          // Just pick the first error to display (typically there's only ever one).
          throw new BadGlobalStateError(errors[0], response)
        });
    }
    else if (status == 422) {
      return assimilatePromise(response.json())
        .then((errors: string[]) => {
          // Just pick the first error to display (typically there's only ever one).
          throw new BadLocalStateError(errors[0], response)
        });
    }
    else {
      return Promise.reject(new ApiClientError(response.statusText, response));
    }
  }
  else {
    return Promise.reject(new ApiServerError(response.statusText, response));
  }
}

// Fetch API _may_ be native (e.g. in newer browsers) so may return a native promise, despite our best attempts
// to force-polyfill using Bluebird. Therefore, we need to assimilate the untrusted promise.
function assimilatePromise<T>(nativePromise: Promise.Thenable<T>): Promise<T> {
  return Promise.resolve(nativePromise);
}

export function request(method: HttpMethod, path: string, jwt?: string, params?: RequestInit): Promise<Response> {
  const allParams = {
    ...params,
    method: method
  };

  if (jwt) {
    allParams.headers = {
      ...allParams.headers,
      "Authorization": `Bearer ${jwt}`
    }
  }

  const base = path.startsWith("https://") ? "" : baseApiUrl; // We should only ever be using HTTPS URLs.

  const result = fetch(base + path, allParams);

  return assimilatePromise(result)
    .catch(e => { throw new InfrastructureError("Connection error when communicating with API.", e) }) // Network-level error.
    .then(assertSuccessful); // HTTP-level error.
}

function sendJson(method: "POST" | "PUT", path: string, requestBody: any, jwt?: string): Promise<Response> {
  return request(method, path, jwt, {
    headers: { "Content-type": "application/json" },
    body:    JSON.stringify(requestBody)
  });
}

export function putJson(path: string, requestBody: any, jwt?: string): Promise<Response> {
  return sendJson("PUT", path, requestBody, jwt);
}

export function postJson(path: string, requestBody: any, jwt?: string): Promise<Response> {
  return sendJson("POST", path, requestBody, jwt);
}