export class Code {
  public id: string;
  public user_id: string;
  public code: string;
  public type: "EMAIL_VERIFY" | "EMAIL_RESET" | "PASSWORD_RESET";
  public status: boolean;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date;

  constructor(
    props: Partial<Code>,
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
