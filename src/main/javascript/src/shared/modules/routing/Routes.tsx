/**
 * What is this?
 * -------------
 * This is our routes file. It is split into two modules (handler and renderer) to ensure unidirectional state flow.
 * The handler is responsible for fetching state (i.e. populating redux) and performing any necessary side-effects
 * associated with loading the given route. The renderer is responsible for synchronously rendering the UI given a
 * populated redux store. This follows Dan Abramov's suggestions and ensures our React components remain as
 * "functions of state that synchronously return HTML and event handlers". This also allows us to prefetch
 * the next route's state and consume the loading progress in the current component (e.g. within a login form).
 *
 * See:
 * - https://github.com/facebook/react/issues/1739#issuecomment-134756276
 * - https://github.com/facebook/react/issues/1739#issuecomment-135498806
 * - https://github.com/facebook/react/issues/1739#issuecomment-181966306
 */
import * as React from "react";
import {composeRoutes} from "shared/modules/routing/RoutingUtils";
import {NotFound} from "shared/components/notfound/NotFound";
import {homepageRoute, homepageUrl} from "shared/components/homepage/HomepageRoute";
import {Homepage} from 'shared/components/homepage/Homepage';
import {TSwitch} from "shared/modules/routing/TSwitch";
import {TRoute} from "shared/modules/routing/TRoute";

/**
 * Route Handlers:
 * ---------------
 * Given a URL, asynchronously fetches the required state for the page and initiates any required side-effects.
 */
export const getRoute = composeRoutes([
  homepageRoute
]);

/**
 * Route Renderer:
 * ---------------
 * Given a URL, synchronously renders the page from a populated redux store.
 */
export const RouteRenderer = () =>
  <div>
    <TSwitch>
      <TRoute path={homepageUrl} exact={true}>
        <Homepage />
      </TRoute>

      <TRoute path="*">
        <NotFound />
      </TRoute>
    </TSwitch>
  </div>;