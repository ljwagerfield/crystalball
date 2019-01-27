import * as React from "react";

export const ErrorBox = ({children}: {children?: any}) =>
  <div className="alert alert-danger" role="alert">
    <span className="icon-cross icon_left" aria-hidden="true"/>
    {children}
  </div>;