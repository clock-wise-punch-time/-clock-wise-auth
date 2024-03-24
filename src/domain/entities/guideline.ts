export class Guideline {
  public id: string;
  public title: string;
  public description: string;
  public type:
    | "PRIVACY_POLICY"
    | "TERMS_OF_USE"
    | "LABOR_COMPLIANCE"
    | "COOKIE_POLICY";
  public version: number;
  public status: boolean;
  public deleted: boolean;
  public created_at: Date;
  public updated_at: Date;
  public delete_at: Date;

  constructor(
    props: Partial<Guideline>,
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
