import {combineReducers} from "redux";
import {GeoIpState} from "shared/state/domains/geoip/GeoIpState";
import geoIp from "shared/state/domains/geoip/GeoIpReducer";

export interface DomainState {
  geoIp?: GeoIpState;
}

export const domains = combineReducers<DomainState>({
  geoIp
});