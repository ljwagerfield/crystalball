import Promise from "bluebird";
import {AsyncThunkAction} from "shared/state/Common";
import {RootState} from "shared/state/RootState";
import {geoIpApi, GeoIpDto} from "shared/modules/apis/GeoIpApi";
import {isBrowser} from "shared/modules/Constants";

export type GeoIpApiAction = {
  type: "FETCH_IP_GEOGRAPHY_SUCCESS",
  ipGeography: GeoIpDto
}

//
// We specify 'fetch country' as a specific action since requesting different levels of granularity / information
// may cost different amounts from the service provider, so the consuming components need to be able to specify the
// limited scope of which GeoIP details they actually require.
//
export function fetchCountryByIpIfNeeded(): AsyncThunkAction<void> {
  return (dispatch, getState) => {
    const state = getState();

    if (shouldFetchCountryByIp(state)) {
      return dispatch(
        fetchIpGeography()
      );
    }

    return Promise.resolve();
  };
}

function shouldFetchCountryByIp(state: RootState): boolean {
  return isBrowser && ( // IMPORTANT: Do not fetch IP address geography when running on server!
    !state.domains.geoIp ||
    !state.domains.geoIp.geography
  );
}

function fetchIpGeography(): AsyncThunkAction<void> {
  return (dispatch) => {
    return geoIpApi
      .getIpGeoInfo()
      .then((latestUsageStats: GeoIpDto) => dispatch(
        fetchIpGeographSuccess(latestUsageStats)
      ))
      .return();
  };
}

function fetchIpGeographSuccess(ipGeography: GeoIpDto): GeoIpApiAction {
  return {
    type: "FETCH_IP_GEOGRAPHY_SUCCESS",
    ipGeography
  };
}
