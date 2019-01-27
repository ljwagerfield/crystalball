//
// The `TRoute` is a transitionable route. It supports transition behavior defined by `location.state` objects -- i.e.
// transition settings are defined imperatively as part of the navigation event.
//
// See: RoutingUtils.transitionTo
//
import * as React from "react";
import * as H from "history";
import {TMatch, TMatchProvider} from "shared/modules/routing/TMatch";
import {RouteTransition} from "shared/modules/routing/RoutingUtils";
import {IsomorphicLocationState} from "shared/state/http/isomorphic/location/LocationState";
import {RootState} from "shared/state/RootState";
import {connect} from "react-redux"; // We specifically require the Redux 'connect' and not ours here.

export interface TRoutePublicProps {
  path: string | string[] | (() => boolean);
  exact?: boolean;
  children?: any;

  // Set by our custom Switch...
  location?: H.Location;
  isMatch?: boolean;
}

interface TRouteStateProps {
  // A page can have multiple URLs -- think of a modal that has its own URLURL: if that modal is overlaying
  // another page, there's two URLs currently in the document (the URL for the modal, and the URL for the page behind).
  // The 'rootLocation' represents the URL you see in the browser.
  rootLocation: IsomorphicLocationState;
}

interface TRouteProps extends TRoutePublicProps, TRouteStateProps {}

interface TRoutePrivateProps extends TRouteStateProps {
  location: H.Location;
  isMatch: boolean;
  children?: any;
}

interface State {
  match?: TMatch;
  isRetained: boolean;
  hasTransition: boolean;
  transitionRequired: boolean;
  removalTimeout: number;
  transitionName: string;
}

const stateForNoMatch: State = {
  isRetained: false,
  hasTransition: false,
  transitionRequired: false,
  removalTimeout: 0,
  transitionName: null
};

class TRouteInner extends React.Component<TRoutePrivateProps, State> {
  removeTimeoutHandle?: number;
  activeTimeoutHandle?: number;

  constructor(props: TRoutePrivateProps) {
    super(props);
    this.removeTimeoutHandle = null;
    this.activeTimeoutHandle = null;
    this.state               = stateForNoMatch;
  }

  componentWillMount() {
    const props = this.props;
    if (props.isMatch) {
      const location = props.rootLocation;
      this.setState(this.getStateForMatch(location, false, null));
    }
  }

  componentWillReceiveProps(nextProps: Readonly<TRoutePrivateProps>) {
    const oldState = this.state;
    const isMatch  = nextProps.isMatch;

    if (isMatch) {
      const location      = nextProps.rootLocation;
      const isRouteChange = !oldState.match || oldState.match.lastMatchedLocation != location.current;

      if (isRouteChange) {
        // Enter transition...
        const transition         = nextProps.location.state as RouteTransition;
        const hasEnterTransition = transition && transition.hasEnterTransition === true;
        this.setState(this.getStateForMatch(location, hasEnterTransition, transition && transition.transitionName));
      }

      return;
    }

    const oldProps    = this.props;
    const wasMatch    = oldProps.isMatch;
    const wasRetained = oldState.isRetained;

    if (!wasMatch && !wasRetained) {
      // Perform no further processing if the route doesn't match, didn't match before, and wasn't retained.
      // (i.e. it was unmounted, it's still unmounted, so don't change anything).
      return;
    }

    const transition    = nextProps.location.state as RouteTransition;
    const hasTransition = transition && typeof transition.hasEnterTransition == "boolean"; // Poor man's type checking.

    if (!wasMatch) {
      // if (wasRetained) { ... implied from above ...
      if (hasTransition) {
        // Component was retained, and we're 'continuing the animation' with another transition, so keep the component
        // retained and as-is (i.e. do not apply new transition classes to it).
        return;
      }
      else {
        // Component was retained, but we're now navigating with a "hard navigation" (i.e. standard navigation w/o any
        // transition) so dismount the previously retained component.
        this.setState(stateForNoMatch);
        return;
      }
    }
    else if (!hasTransition) {
      // Component was a match, but isn't anymore, and there's no transition, so dismount it.
      this.setState(stateForNoMatch);
      return;
    }
    else {
      const removeOldRouteImmediately = transition.removeOldRouteAfterMs == 0;

      if (removeOldRouteImmediately) {
        // Component was a match, but isn't anymore, and the transition says to dismount immediately.
        this.setState(stateForNoMatch);
        return;
      }

      // Component was a match, but isn't anymore, and the transition says to retain it.
      const hasExitTransition = transition.hasExitTransition;
      this.setState({
        isRetained: true,
        hasTransition: hasExitTransition,
        transitionRequired: hasExitTransition,
        removalTimeout: transition.removeOldRouteAfterMs,
        transitionName: hasExitTransition ? transition.transitionName : null,
        match: {
          ...oldState.match,
          isMatch: false
        }
      });
    }
  }

  getStateForMatch(location: IsomorphicLocationState, hasEnterTransition: boolean, transitionName: string|null): State {
    return {
      isRetained: false,
      hasTransition: hasEnterTransition,
      transitionRequired: hasEnterTransition,
      removalTimeout: 0,
      transitionName: hasEnterTransition ? transitionName : null,
      match: {
        isMatch: true,
        lastMatchedLocation: location.current,
        previousLocation: location.previous
      }
    };
  }

  render() {
    const props = this.props;
    const state = this.state;
    let className;

    if (!state.hasTransition) {
      className = "";
    }
    else {
      className =
        state.transitionRequired
          ? `transition-${state.transitionName}-${props.isMatch ? "enter" : "leave"}`
          : `transition-${state.transitionName}-${props.isMatch ? "enter" : "leave"} transition-active`;

      if (state.transitionRequired) {
        this.queueTransitionStartEvent();
      }

      if (state.removalTimeout > 0) {
        this.queueRemoval();
      }
    }

    return (!props.isMatch && !state.isRetained)
      ? null
      : <div className={className}>
        <TMatchProvider match={state.match}>
          {props.children}
        </TMatchProvider>
      </div>;
  }

  queueTransitionStartEvent() {
    this.activeTimeoutHandle = setTimeout(() =>
      this.setState({
        ...this.state,
        transitionRequired: false
      })
    );
  }

  queueRemoval() {
    this.removeTimeoutHandle = setTimeout(() =>
        this.setState({
          ...this.state,
          isRetained: false
        }),
      this.state.removalTimeout
    ) as any as number;
  }
}

const mapStateToProps = (state: RootState): TRouteStateProps => ({
  rootLocation: state.http.isomorphic.location
});

const TRouteCmp = ({children, rootLocation, location, isMatch}: TRouteProps) => (
  <TRouteInner rootLocation={rootLocation} location={location} isMatch={isMatch}>
    {children}
  </TRouteInner>
);

export const TRoute = connect<TRouteStateProps, {}, TRoutePublicProps>(mapStateToProps)(TRouteCmp);
