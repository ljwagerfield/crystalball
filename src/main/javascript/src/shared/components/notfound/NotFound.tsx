import * as React from "react";
import { connect } from "react-redux";
import {Helmet} from "react-helmet";

import {Dispatch} from "redux";
import {returnHttpStatusCode} from "shared/state/http/server/response/HttpResponseActions";
import {Link} from "react-router-dom";
import {homepageUrl} from "shared/components/homepage/HomepageRoute";
import {makePageTitle} from "shared/components/common/Utils";

interface NotFoundProps {
  onLoad: () => void;
}

class NotFoundCmp extends React.Component<NotFoundProps, {}> {
  componentWillMount() {
    this.props.onLoad()
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{makePageTitle("Page Not Found")}</title>
          <body className="page-modal" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <div className="well well-lg">
                <h2>Page not found!</h2>
                <p>The link you followed may be broken, or the page may have been removed. In either case, we're sorry it didn't work out :(</p>
                <Link to={homepageUrl}>Go to homepage &raquo;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLoad: () => {
    dispatch(returnHttpStatusCode(404));
  }
});

export const NotFound = connect(null, mapDispatchToProps)(NotFoundCmp);