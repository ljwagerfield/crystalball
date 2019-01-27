import * as React from "react";

import {Link} from "react-router-dom";

import {homepageUrl} from "shared/components/homepage/HomepageRoute";
import "./Footer.scss";

const currentYear = new Date().getFullYear();

export const Footer = ({large}: {large?: boolean}) => (
  <div className={`footer${large ? "-lg": ""}`}>
    {large &&
      <div className="container">
        <p>&copy;{currentYear} All Rights Reserved. CrystalBall is a trading name of Project One Software LTD.</p>
      </div>
    }
    {!large &&
      <ul className="container">
        <li><Link to={homepageUrl}>&copy;{currentYear} CrystalBall</Link></li>
      </ul>
    }
  </div>
);