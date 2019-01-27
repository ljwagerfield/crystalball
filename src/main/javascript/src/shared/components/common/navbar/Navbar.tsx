import * as React from "react";

import {connect} from "shared/modules/Connect";
import {RootState} from "shared/state/RootState";

import "./Navbar.scss";

interface State {
  isMenuExpanded: boolean;
  hasAnimationStopped: boolean;
}

interface PublicProps {
  largeFooter?: boolean; // Default: false
  screenTitle?: string; // 'Screen' as it implies the name will be displayed on-screen (i.e. in the navbar on mobile).
}

interface PrivateProps {
  currentPage: string;
}

interface Props extends PublicProps, PrivateProps {}

class NavbarCmp extends React.Component<Props, State> {
  private timer: any;

  constructor(props: any) {
    super(props);
    this.timer = null;
    this.state = { isMenuExpanded: false, hasAnimationStopped: true };
  }

  toggleMenu() {
    const self            = this;
    const animationTimeMS = 800;

    this.setState({ isMenuExpanded: !this.state.isMenuExpanded, hasAnimationStopped: false });

    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(
      () => {
        self.setState({...self.state, hasAnimationStopped: true});
        self.timer = null;
      },
      animationTimeMS
    );
  }

  render() {
    return (
      <div className={`${this.state.isMenuExpanded ? "sidebar-expanded" : "sidebar-collapsed"} ${this.state.hasAnimationStopped ? "sidebar-animation-stopped" : "sidebar-animation-active"}`}>
        {/* Intentionally place a duplicate (hidden) banner add correct variable top-padding to body. */}

        <div className="document-body">

          <div className="document-body-overlay" onClick={_ => this.toggleMenu()} />

          {this.props.children}

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state: RootState): PrivateProps => ({
  currentPage: state.http.isomorphic.location.current.urlWithoutHost
});

export const Navbar = connect<PrivateProps, {}, PublicProps>(mapStateToProps)(NavbarCmp);