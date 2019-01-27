import * as React from "react";
import {NavigationTemplate, NavigationTemplateProps} from "shared/components/common/templates/NavbarTemplate";

interface CenterTemplateProps extends NavigationTemplateProps {
  hasDesktopTitle?: boolean;
}

export const CenterTemplate = ({ pageTitleSuffix, pageTitle, hasDesktopTitle, children }: CenterTemplateProps) => (
  <NavigationTemplate pageTitleSuffix={pageTitleSuffix} pageTitle={pageTitle}>
    <div className="container">
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div className="well well-lg text-center">
            {hasDesktopTitle !== false && <h3>{pageTitleSuffix}</h3>}
            {children}
          </div>
        </div>
      </div>
    </div>
  </NavigationTemplate>
);