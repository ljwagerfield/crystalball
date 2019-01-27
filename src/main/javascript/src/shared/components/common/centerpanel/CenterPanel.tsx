import * as React from "react";
import {ReactNode} from "react";

import "./CenterPanel.scss";
import {LogoSquare} from "shared/components/common/emblems/Emblems";
import {homepageUrl} from "shared/components/homepage/HomepageRoute";
import {Link} from "react-router-dom";

export const CenterPanel = ({children}: {children?: ReactNode}) =>
  <div className="center_panel">
    <Link to={homepageUrl} className="logo-link logo-center-panel">
      <LogoSquare />
    </Link>
    {children}
  </div>;