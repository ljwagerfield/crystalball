import * as React from "react";

export default function withRouter<T>(target: T): T {
  const targetAny = target as any;
  targetAny.contextTypes = targetAny.contextTypes || {};
  targetAny.contextTypes.router = React.PropTypes.object.isRequired;
  return target;
}