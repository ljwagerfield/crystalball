/**
 * "Active cookies" are those which are in effect now. For server-side processing, this
 * includes any cookies which are pending to be sent back to the browser in the HTTP response.
 */
export interface ActiveCookies {
  [key: string]: string
}