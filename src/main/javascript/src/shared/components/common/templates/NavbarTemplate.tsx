import * as React from "react";
import {DefaultScrollPosition} from "shared/components/common/DefaultScrollPosition";
import {Helmet} from "react-helmet";
import {Navbar} from "shared/components/common/navbar/Navbar";
import {makePageTitle} from "shared/components/common/Utils";

export interface NavigationTemplateProps {
  largeFooter?: boolean; // Default: false
  showScreenTitle?: boolean; // Default: true
  pageTitleSuffix?: string;
  pageTitle?: string;
  children?: any;
}

export const NavigationTemplate = ({ pageTitleSuffix, pageTitle, showScreenTitle, largeFooter, children }: NavigationTemplateProps) => (
  <div>
    <Helmet>
      <title>{pageTitle || makePageTitle(pageTitleSuffix)}</title>
    </Helmet>

    <DefaultScrollPosition />

    <Navbar screenTitle={showScreenTitle === false ? null : pageTitleSuffix} largeFooter={largeFooter}>
      {children}
    </Navbar>

  </div>
);