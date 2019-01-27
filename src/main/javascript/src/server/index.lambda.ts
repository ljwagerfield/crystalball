import NormalizedEntryPoint from './modules/NormalizedEntryPoint'
import { NormalizedHttpRequest, NormalizedHttpResponse } from 'server/modules/NormalizedHttp';
import {parseCookiesFromHeaderObj} from "shared/modules/CookieUtils";
import {initializeModules} from "shared/modules/Initializer";

type AwsLambdaCallback = (error?: Error, result?: any) => void;

interface AwsLambdaRequest {
  path: string;
  httpMethod: string;
  headers: null | {
    [key: string]: string | string[]
  };
  queryStringParameters: null | {
    [key: string]: string | string[]
  };
  body: null | string;
  isBase64Encoded: boolean;
}

initialise();

const entryPoint = new NormalizedEntryPoint();

function initialise() {
  console.log('Loading function');
  console.log(`Runtime: ${process.env.NODE_ENV === "production" ? 'PROD' : 'DEV'}`);
  initializeModules();
}

function normaliseRequest(request: AwsLambdaRequest): NormalizedHttpRequest {
  const headers = {} as any;

  // Normalize header names to lower-case.
  if (request.headers) {
    const headerNames = Object.keys(request.headers);
    headerNames.forEach(headerName => {
      headers[headerName.toLowerCase()] = request.headers[headerName]
    });
  }

  return {
    isSSL: true, // The request will always be over SSL going via API Gateway.
    method: request.httpMethod,
    urlWithoutHost: buildUrlWithoutHost(request),
    body: request.body,
    headers: headers,
    path: request.path,
    query: request.queryStringParameters || {},
    cookies: parseCookiesFromHeaderObj(headers)
  };
}

function normaliseCallback(awsLambdaCallback: AwsLambdaCallback) {
  return function(response: NormalizedHttpResponse) {
    const headers = {} as any;
    response.headers.forEach(kvp => {
      headers[kvp.name] = kvp.value;
    });

    headers["content-type"] = "text/html; charset=utf-8"; // API Gateway uses 'application/json' by default.

    awsLambdaCallback(
      null, {
        isBase64Encoded: false,
        statusCode: response.status,
        headers: headers,
        body: response.body
      }
    );
  }
}

function buildUrlWithoutHost(request: AwsLambdaRequest): string {
  if (!request.queryStringParameters) {
    return request.path;
  }

  const queryKeys = Object.keys(request.queryStringParameters);

  if (queryKeys.length == 0) {
    return request.path;
  }

  const queryString = queryKeys
    .map(key => `${key}=${request.queryStringParameters[key]}`)
    .join("&");

  return `${request.path}?${queryString}`;
}

module.exports = function(request: AwsLambdaRequest, _context: any, responseCallback: AwsLambdaCallback) {
  const normalisedRequest = normaliseRequest(request);
  const normalisedCallback = normaliseCallback(responseCallback);
  entryPoint.sendResponse(normalisedRequest, normalisedCallback);
};
