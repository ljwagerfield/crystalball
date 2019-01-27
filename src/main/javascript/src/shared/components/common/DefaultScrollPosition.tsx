//
// Sets the default scroll position for the page, taking into account arriving from a 'back' click, etc.
//
import * as React from "react";
import {RootState} from "shared/state/RootState";
import {connect} from "shared/modules/Connect";

interface Props {
  restoredScrollPosition?: number;
}

class DefaultScrollPositionCmp extends React.Component<Props, {}> {
  componentDidMount() {
    if (window) {
      window.scrollTo(0, this.props.restoredScrollPosition || 0);
    }
  }

  render(): null {
    return null;
  }
}

const mapStateToProps = (state: RootState): Props => ({
  restoredScrollPosition: state.http.browser.scrolling.restoredScrollPosition
});

export const DefaultScrollPosition = connect(mapStateToProps)(DefaultScrollPositionCmp);