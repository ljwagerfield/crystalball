export type HttpResponseAction = {
  type: 'RETURN_HTTP_STATUS_CODE';
  statusCode: number;
} | {
  type: 'RETURN_HTTP_HEADER';
  headerName: string;
  headerValue: string;
} | {
  type: 'RETURN_COOKIE';
  cookieName: string;
  cookieValue: string;
  cookieMaxAge?: number;
}

export function returnHttpStatusCode(statusCode: number): HttpResponseAction {
  return {
    type: 'RETURN_HTTP_STATUS_CODE',
    statusCode: statusCode
  };
}

export function returnHttpHeader(name: string, value: string): HttpResponseAction {
  return {
    type: 'RETURN_HTTP_HEADER',
    headerName: name,
    headerValue: value
  };
}

export function returnCookie(name: string, value: string, maxAge?: number): HttpResponseAction {
  return {
    type: 'RETURN_COOKIE',
    cookieName: name,
    cookieValue: value,
    cookieMaxAge: maxAge
  };
}