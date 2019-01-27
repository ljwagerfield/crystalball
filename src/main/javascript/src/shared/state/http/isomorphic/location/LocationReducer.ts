import {initialIsomorphicLocation, IsomorphicLocationState} from "shared/state/http/isomorphic/location/LocationState";
import {IsomorphicLocationAction} from "shared/state/http/isomorphic/location/LocationActions";

export default function location(oldState: IsomorphicLocationState = initialIsomorphicLocation, action: IsomorphicLocationAction): IsomorphicLocationState {
  switch (action.type) {

    case 'SET_LOCATION':
      return {
        current: {
          urlWithoutHost: action.urlWithoutHost,
          path: action.path,
          query: action.query,
        },
        previous: oldState.current
      };

    default:
      return oldState;
  }
}