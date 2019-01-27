import * as _ from "react-router-dom"; // Required for module augmentation.
import * as H from "history";

declare module "react-router-dom" {
  export interface RouterContext {
    // Incomplete! Please see: https://reacttraining.com/react-router/web/api/Route/Route-props
    history: RouterHistory;
  }
  export interface RouterHistory {
    // Incomplete! Please see: https://reacttraining.com/react-router/web/api/history
    replace: (location: H.LocationDescriptor) => void;
    push: (location: H.LocationDescriptor) => void;
    length: number;
    goBack();
  }
}