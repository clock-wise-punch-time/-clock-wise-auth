export class User {
  public id: string;
  public username: string;
  public registration: string;
  public cpf: string;
  public name: string;
  public lastname: string;
  public bio: string;
  public avatar: string;
  public profession: string;
  public bussiness: string;
  public email: string;
  public phone: string;
  public verify_email: boolean;
  public verify_phone: boolean;
  public birthdate: Date;
  public password: string;
  public role: "SUPER_ADMIN" | "ADMIN" | "MODERATOR" | "USER";
  public status: boolean;
  public deleted: boolean;
  public created_at: Date;
  public updated_at: Date;
  public delete_at: Date;

  constructor(
    props: Partial<User>,
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
