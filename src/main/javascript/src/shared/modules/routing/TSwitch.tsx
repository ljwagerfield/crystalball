//
// The `TSwitch` is a switch for transitionable routes.
//
import * as React from "react";
import * as H from "history";
import withRouter from "shared/components/common/decorators/WithRouter";
import {TRoutePublicProps} from "shared/modules/routing/TRoute";

class TSwitchCmp extends React.Component<{children?: any, location?: H.Location, className?: string}, {}> {
  render(): JSX.Element {
    const route    = this.context.router.route;
    const children = this.props.children;
    const location = this.props.location || route.location;
    let hasMatched = false;

    const updatedChildren = React.Children.map(children, element => {
      if (!React.isValidElement(element)) return;

      if (hasMatched) {
        return React.cloneElement(element as any, { location, isMatch: false });
      }

      const { path, exact } = element.props as TRoutePublicProps;

      if (typeof path === 'string') {
        hasMatched = this.isMatch(path, exact, location)
      }
      else if (path instanceof Array) {
        const pathArray = path as Array<string>;
        hasMatched = pathArray.findIndex(path => this.isMatch(path, exact, location)) != -1;
      }
      else { // path: () => boolean
        hasMatched = path();
      }

      return React.cloneElement(element as any, { location, isMatch: hasMatched });
    });

    return this.props.className
      ? <div className={this.props.className}>{updatedChildren}</div>
      : <div>{updatedChildren}</div>;
  }

  isMatch(pathPattern: string, exact: boolean, location: H.Location): boolean {
    const pathRegex = pathPattern.replace(/\*/g, ".*");
    const regex     = new RegExp(`^${pathRegex}${exact ? "/?$" : ".*$"}`);
    return regex.test(location.pathname);
  }
}

export const TSwitch = withRouter(TSwitchCmp);