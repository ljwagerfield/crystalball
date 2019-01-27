import R, {KeyValuePair} from "ramda";

export const permanentCookieLifetime: number = 10 * 365 * 24 * 60 * 60; // Ten years (in seconds).

export function parseCookiesFromHeaderObj(httpHeaders: { [key: string]: string | string[] }): { [key: string]: string } {
  if (typeof httpHeaders.cookie === "string") {
    return parseCookiesFromHeader(httpHeaders.cookie as string);
  }
  else {
    return {};
  }
}

export function parseCookiesFromHeader(headerValue: string): { [key: string]: string } {
  const cookieToKVP = (cookie: string): KeyValuePair<string, string>[] => {
    const splits = cookie.trim().split("=");
    return splits.length === 2 ? [[
      decodeURIComponent(splits[0]), // Cookie name.
      decodeURIComponent(splits[1])  // Cookie value.
    ]] : [];
  };

  const kvpArrayToObject = R.fromPairs as (pairs: KeyValuePair<string, string>[]) => {[key: string]: string};

  const cookies = headerValue.split(";");

  return R.pipe(R.chain(cookieToKVP), kvpArrayToObject)(cookies);
}

export function cookieToString(name: string, value: string, isSSL: boolean, maxAge?: number): string {
  const encodedName = encodeURIComponent(name);
  let cookieStr = value != null
    ? `${encodedName}=${encodeURIComponent(value)}`
    : `${encodedName}=`;

  if (isSSL) {
    cookieStr += "; Secure";
  }
  if (maxAge != null) {
    cookieStr += "; Max-Age=" + Math.floor(maxAge);
  }

  // Browsers will default to using the current directory for the 'Path' attribute, which is unlikely to be what
  // we want. If we need to restrict cookies to paths, we can consciously set specific paths on a case-by-case basis.
  cookieStr += "; Path=/";

  return cookieStr;
}