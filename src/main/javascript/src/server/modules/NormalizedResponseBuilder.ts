import {IncompleteHttpResponse} from "shared/state/http/server/response/HttpResponseState";
import {NormalizedHttpResponse} from "server/modules/NormalizedHttp";
import R from "ramda";
import {cookieToString} from "shared/modules/CookieUtils";

const headerNames = {
  setCookie: "Set-Cookie",
  location: "Location"
};

export default class NormalizedResponseBuilder {
  response: NormalizedHttpResponse;
  state: IncompleteHttpResponse;
  isSSL: boolean;

  constructor(state: IncompleteHttpResponse, isSSL: boolean) {
    this.state = state;
    this.isSSL = isSSL;
    this.init();
  }

  private init() {
    const toHeaderObj = (nvp: [string, string]) => ({ name: nvp[0], value: nvp[1] });
    const headers     = R.pipe(R.toPairs, R.map(toHeaderObj))(this.state.headers);

    this.response = {
      status: this.state.statusCode,
      headers: headers
    };

    this.addCookieHeaders();
  }

  private addCookieHeaders() {
    const cookieToStr = (cookie: [string, {value: string, maxAge?: number}]) =>
      cookieToString(cookie[0], cookie[1].value, this.isSSL, cookie[1].maxAge);
    const cookieToHeader = (cookieStr: string) => ({
      name: headerNames.setCookie,
      value: cookieStr
    });
    const addHeaderToResponse = (header: {name: string, value: string}) => {
      this.response.headers.push(header);
    };
    const addCookiesToHeaders = R.pipe(
      R.toPairs,
      R.map(cookieToStr),
      R.map(cookieToHeader),
      R.forEach(addHeaderToResponse)
    );
    addCookiesToHeaders(this.state.cookies);
  }

  withRedirect(destinationUrl: string) {
    const isLocationHeader  = (header: {name: string, value: string}) => header.name == headerNames.location;
    const newLocationHeader = { name: headerNames.location, value: destinationUrl };
    const addLocationHeader = R.pipe(R.reject(isLocationHeader), R.append(newLocationHeader));

    this.response.status    = 302; // Browsers will cache a 301, which isn't what you want for dynamic/cookie-based redirects.
    this.response.headers   = addLocationHeader(this.response.headers)
  }

  withBody(body: string) {
    this.response.body = body;
  }
}