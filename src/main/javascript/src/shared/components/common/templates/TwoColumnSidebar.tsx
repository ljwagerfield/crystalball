import * as React from "react";

import "./TwoColumnSidebar.scss";

// BROKEN! Does not work isomophically -- will cause a re-render, as the server cannot store the
// user's state in a global like this (as the global applies to all user connections).
// We might need to use Redux or something.

let globalSidebarProps: SidebarProps = null;

export function getGlobalSidebarProps(): SidebarProps {
  return globalSidebarProps;
}

export interface SidebarProps {
  header: string;
  children?: any;
}

export const TwoColumnSidebar = (props: SidebarProps) => {
  if (typeof window !== 'undefined') {
    globalSidebarProps = props;
  }

  return (
    <div className="well well-lg two_column_sidebar">
      <h3>{props.header}</h3>
      <ul>
        {props.children}
      </ul>
    </div>
  );
};