import * as React from "react";
import {Helmet} from "react-helmet";

import {homepageUrl} from "shared/components/homepage/HomepageRoute";
import {makePageTitle} from "shared/components/common/Utils";

export const ServerError = () => (
  <div>
    <Helmet>
      <title>{makePageTitle("Oops!")}</title>
      <body className="page-modal" />
    </Helmet>

    <div className="container">
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div className="well well-lg">
            <h2>Something went wrong!</h2>
            <p>
              We're sorry, but something went wrong.
            </p>
            <p>
              Why not try refreshing your page? Or you can contact us if the problem persists.
            </p>
            {/* IMPORTANT: Do not use `Link` or anything from React Router, etc. This component is rendered without these! */}
            <a href={homepageUrl}>Go to homepage &raquo;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);