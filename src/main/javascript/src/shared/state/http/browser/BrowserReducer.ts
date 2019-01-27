import {BrowserAction} from "shared/state/http/browser/BrowserActions";
import {BrowserState, initialBrowserState} from "shared/state/http/browser/BrowserState";

export default function browser(oldState: BrowserState = initialBrowserState, action: BrowserAction): BrowserState {
  switch (action.type) {

    case "FETCH_ROUTE_STATE_STARTED":
      return {
        ...oldState,
        canGoBack: action.previousUrl != null,
        scrolling: {
          previousScrollPosition: action.previousScrollPosition
          // restoredScrollPosition -- Intentionally clear this on route change.
        },
        currentRoute: {
          isLoading: true
        }
      };

    case "FETCH_ROUTE_STATE_SUCCESS":
      return {
        ...oldState,
        currentRoute: {
          isLoading: false
        }
      };

    case "FETCH_ROUTE_STATE_FAILED":
      return {
        ...oldState,
        currentRoute: {
          isLoading: false,
          displayableLoadError: action.displayableError
        }
      };

    case "SCROLL_POSITION_RESTORED":
      return {
        ...oldState,
        scrolling: {
          ...oldState.scrolling,
          restoredScrollPosition: action.restoredScrollPosition
        }
      };

    default:
      return oldState;
  }
}