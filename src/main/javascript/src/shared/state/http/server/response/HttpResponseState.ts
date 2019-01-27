export interface IncompleteHttpResponse {
  statusCode: number;
  headers: {
    [key: string]: string;
  }
  cookies: {
    [key: string]: {
      value: string;
      maxAge?: number;
    }
  }
}

export const initialHttpResponse: IncompleteHttpResponse = {
  statusCode: 200,
  headers: {},
  cookies: {}
};