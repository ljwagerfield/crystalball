import * as React from "react";
import {NavigationTemplate, NavigationTemplateProps} from "shared/components/common/templates/NavbarTemplate";

export interface TwoColumnTemplateProps extends NavigationTemplateProps {
  className?: string;
  hasDesktopTitle?: boolean;
}

export const TwoColumnTemplate = ({ pageTitleSuffix, pageTitle, hasDesktopTitle, className, children }: TwoColumnTemplateProps) => (
  <NavigationTemplate pageTitleSuffix={pageTitleSuffix} pageTitle={pageTitle}>
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className={`well well-lg ${className || ""}`}>
            {hasDesktopTitle !== false && <h2>{pageTitleSuffix}</h2>}
            {children[0]}
          </div>
        </div>
        <div className="col-md-4">
          {children[1]}
        </div>
      </div>
    </div>
  </NavigationTemplate>
);