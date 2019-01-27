import * as React from "react";
import "./LoaderOverlay.scss";

//
// We use 'fieldset' to disable form elements (e.g. tabbing, focus, etc) and an outer 'div' to disable clicking
// on non-form elements (e.g. links).
//
export const LoaderOverlay = ({isLoading, children }: {isLoading: boolean, children?: any}) => (
  <div className={`fieldset-overlay fieldset-overlay-spinner ${isLoading ? "fieldset-overlay-active" : ""}`}>
    <fieldset disabled={isLoading}>
      {children}
    </fieldset>
  </div>
);