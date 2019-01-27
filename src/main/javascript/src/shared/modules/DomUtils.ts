import {RouterContext} from "react-router-dom";
import {changeRoute} from "shared/modules/routing/RoutingUtils";
import * as H from 'history';

export function backgroundLink(context: {router: RouterContext}, location: H.LocationDescriptor): () => void {
  return () => {
    if (isAnchorUnderMouse()) {
      return;
    }

    changeRoute(context)(location, true);
  };
}

function isAnchorUnderMouse(): boolean {
  const elements     = document.querySelectorAll(':hover');
  const elementCount = elements.length;
  for (let i = 0; i < elementCount; i++) {
    if (elements[i].tagName.toUpperCase() == "A") {
      return true;
    }
  }

  return false;
}