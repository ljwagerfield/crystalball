import Express from 'express';
import NormalizedEntryPoint from './modules/NormalizedEntryPoint'
import { NormalizedHttpRequest, NormalizedHttpResponse } from 'server/modules/NormalizedHttp';
import {parseCookiesFromHeaderObj} from "shared/modules/CookieUtils";
import {initializeModules} from "shared/modules/Initializer";

const env = getEnvironmentVariables();
const app = Express();
initializeModules();
addRoutes();
listenForRequests();

function getEnvironmentVariables() {
  const env = {
    isProduction: process.env.NODE_ENV === "production",
    port: getNumber(process.env.HTTP_PORT, 'port')
  };

  console.log(`Runtime: ${env.isProduction ? 'PROD' : 'DEV'}`);

  return env;
}

function getNumber(value: any, variableName: string): number {
  if (isNaN(value)) throw new Error(`The ${variableName} must be a number, but is actually ${value}.`);
  return value
}

function addRoutes() {
  const entryPoint = new NormalizedEntryPoint();
  app.get('*', (request, responseCallback) => {
    const normalisedRequest = normaliseRequest(request);
    const normalisedCallback = normaliseCallback(responseCallback);
    entryPoint.sendResponse(normalisedRequest, normalisedCallback);
  });
}

function normaliseRequest(expressRequest: Express.Request): NormalizedHttpRequest {
  return {
    // Canonical properties:
    isSSL: expressRequest.secure,
    method: expressRequest.method,
    urlWithoutHost: expressRequest.originalUrl,
    body: 'todo...', // See: http://stackoverflow.com/a/9920700
    headers: expressRequest.headers,

    // Derived properties:
    path: decodeURI(expressRequest.path),
    query: expressRequest.query,
    cookies: parseCookiesFromHeaderObj(expressRequest.headers)
  };
}

function normaliseCallback(expressResponse: Express.Response) {
  return function(response: NormalizedHttpResponse) {
    const setHeader = (header: { name: string, value: string}) => expressResponse.setHeader(header.name, header.value);
    response.headers.forEach(setHeader);
    expressResponse.status(response.status).send(response.body);
  }
}

function listenForRequests() {
  app.listen(env.port, (error: string) => {
    if (error)
      console.error(error);
    else {
      console.log(`API:  http://localhost:${env.port}/`);
      console.log(`Note: Point your browser to the content server, not the API!`);
    }
  });
}
