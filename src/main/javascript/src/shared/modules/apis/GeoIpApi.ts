import Promise from "bluebird";
import {request} from "shared/modules/apis/Utils";

export interface GeoIpDto {
  ip: string;
  country_code: string; // e.g. GB
  country_name: string; // e.g. United Kingdom
  region_code: string; // e.g. SCT
  region_name: string; // e.g. Scotland
  city: string;
  zip_code: string; // e.g. HP27
  time_zone: string; // e.g. Europe/London,
  latitude: number;
  longitude: number;
  metro_code: number;
}

class GeoIpApi {
  getIpGeoInfo(): Promise<GeoIpDto> {
    return request("GET", "https://freegeoip.net/json/")
      .then(r => r.json())
  }
  getCountryCode(): Promise<string> {
    return this.getIpGeoInfo().then(r => r.country_code);
  }
}

export const geoIpApi = new GeoIpApi();