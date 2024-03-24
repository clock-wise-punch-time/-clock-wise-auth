import { Fingerprint } from '../../domain/types/fingerprint';

export class FingerprintMapper {
  fingerprint_id: string;
  address: string;
  os: string;
  browser: string;
  browser_version: string;
  user_agent?: string;
  vpn?: boolean = false;
  bot?: boolean = false;
  root_apps?: boolean = false;
  emulator?: boolean = false;
  latitude?: number;
  longitude?: number;
  city?: string;
  state_code?: string;
  state_name?: string;
  country_code?: string;
  country_name?: string;
  continent_code?: string;
  continent_name?: string;

  constructor(props: Fingerprint) {
    this.fingerprint_id = props.products.identification.data.requestId;
    this.address = props.products.ipInfo.data.v4.address;
    this.os = props.products.identification.data.browserDetails.os;
    this.browser =
      props.products.identification.data.browserDetails.browserName;
    this.browser_version =
      props.products.identification.data.browserDetails.browserFullVersion;
    this.user_agent =
      props.products.identification.data.browserDetails.userAgent;
    this.vpn = props.products.vpn.data.result || false;
    this.bot =
      props.products.botd.data.bot.result === 'notDetected' ? false : true;
    this.root_apps = props.products.rootApps.data.result || false;
    this.emulator = props.products.emulator.data.result || false;
    this.latitude = props.products.ipInfo.data.v4.geolocation.latitude;
    this.longitude = props.products.ipInfo.data.v4.geolocation.longitude;
    this.city = props.products.ipInfo.data.v4.geolocation.city.name;
    this.state_code =
      props.products.ipInfo.data.v4.geolocation.subdivisions[0]?.isoCode;
    this.state_name =
      props.products.ipInfo.data.v4.geolocation.subdivisions[0]?.name;
    this.country_code = props.products.ipInfo.data.v4.geolocation.country.code;
    this.country_name = props.products.ipInfo.data.v4.geolocation.country.name;
    this.continent_code =
      props.products.ipInfo.data.v4.geolocation.continent.code;
    this.continent_name =
      props.products.ipInfo.data.v4.geolocation.continent.name;
    delete props.products;
    Object.assign(this, props);
  }
}
