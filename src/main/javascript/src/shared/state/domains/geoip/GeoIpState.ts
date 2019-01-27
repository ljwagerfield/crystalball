import {RootState} from "shared/state/RootState";
import {GeoIpDto} from "shared/modules/apis/GeoIpApi";

export interface GeoIpState {
  geography?: GeoIpDto;
}

// Selectors:

export function getCountryCodeByIp(state: RootState): string | null {
  const geoIp = state.domains.geoIp;
  return geoIp && geoIp.geography && geoIp.geography.country_code;
}