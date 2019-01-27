//
// The container executed on the SERVER.
//
import * as React from "react";
import { StaticRouter, Route } from 'react-router-dom'
import { NormalizedHttpRequest } from 'server/modules/NormalizedHttp';
import {RouteRenderer} from "shared/modules/routing/Routes";

export default ({ request, routerContext}: {request: NormalizedHttpRequest, routerContext: object}) =>
  <StaticRouter location={request.urlWithoutHost} context={routerContext}>
    <div>

      {/* We use these two elements in the browser's container (for client-side functionality), so we need
          the same elements here in the server's container to make the DOM trees align (otherwise React
          will re-render the page). */}
      <div id="focus-reset" tabIndex={-1} />
      <Route path="/" children={() => null} />

      <RouteRenderer />

    </div>
  </StaticRouter>
