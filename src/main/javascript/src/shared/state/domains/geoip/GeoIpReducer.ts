import {GeoIpApiAction} from "shared/state/domains/geoip/GeoIpActions";
import {GeoIpState} from "shared/state/domains/geoip/GeoIpState";

export default function geoIp(oldState: GeoIpState = null, action: GeoIpApiAction): GeoIpState {
  switch (action.type) {

    case "FETCH_IP_GEOGRAPHY_SUCCESS":
      return {
        ...oldState,
        geography: action.ipGeography
      };

    default:
      return oldState;
  }
}