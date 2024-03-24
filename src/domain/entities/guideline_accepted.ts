export class GuidelineAccepted {
  public id: string;
  public guideline_id: string;
  public device_id: string;
  public user_id: string;
  public status: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor(
    props: Partial<GuidelineAccepted>,
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
