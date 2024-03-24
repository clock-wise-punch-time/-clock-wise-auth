export class Device {
  public id: string;
  public user_id: string;
  public fingerprint_id: string;
  public address: string;
  public os: string;
  public browser: string;
  public browser_version: string;
  public user_agent: string;
  public vpn: boolean;
  public bot: boolean;
  public root_apps: boolean;
  public emulator: boolean;
  public latitude: number;
  public longitude: number;
  public city: string;
  public state_code: string;
  public state_name: string;
  public country_code: string;
  public country_name: string;
  public continent_code: string;
  public continent_name: string;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date;

  constructor(
    props: Partial<Device>,
    options?: {
      update?: boolean;
    },
  ) {
    Object.assign(this, props);

    if (!props.id && !options?.update) {
      this.id = crypto.randomUUID();
    }
  }
}
