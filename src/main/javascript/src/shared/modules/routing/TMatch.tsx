//
// The `TMatch` contains the last location causing the route to match, and also a flag indicating whether the browser's
// location still matches that location. False implies the route has been transitioned away from.
//
// Note: `tMatch` is used internally as `match` is taken by React Router. However, this is an internal detail of this
// component only... we still map the `tMatch` context onto a `match` property in the composed component.
//
import * as React from "react";
import {IsomorphicLocation} from "shared/state/http/isomorphic/location/LocationState";
import {ChildContextProvider, ComponentClass, Validator} from "react";

export interface TMatch {
  isMatch: boolean;
  lastMatchedLocation: IsomorphicLocation;
  previousLocation?: IsomorphicLocation;
}

interface TMatchProviderProps {
  match: TMatch;
  children?: any;
}

export class TMatchProvider extends React.Component<TMatchProviderProps, {}> implements ChildContextProvider<TMatchContext> {
  static childContextTypes: Record<keyof TMatchContext, Validator<any>> = {
    tMatch: React.PropTypes.object.isRequired
  };

  getChildContext(): TMatchContext {
    return { tMatch: this.props.match };
  }

  render() {
    return this.props.children;
  }
}

interface TMatchContext {
  tMatch: TMatch;
}

export interface TMatchProps {
  match: TMatch;
}

export function withMatch<TOwnProps>(Inner: ComponentClass<TOwnProps>): ComponentClass<TOwnProps> {
  // IMPORTANT: `match` prop must appear last so it overrides any existing `match` properties (e.g. such as those set by <Route ... />
  const cmp = ((props: any, _context: TMatchContext) => <Inner {...props as any} match={_context.tMatch} />) as any as ComponentClass<TOwnProps>;
  cmp.contextTypes = cmp.contextTypes || {};
  cmp.contextTypes.tMatch = React.PropTypes.object.isRequired;
  return cmp;
}