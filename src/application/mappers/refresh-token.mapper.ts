export class RefreshTokenMapper {
  public accessToken: string;

  public refreshToken: string;

  public lastName: string;

  public firstName: string;

  constructor(props: RefreshTokenMapper) {
    Object.assign(this, {
      success: props,
    });
  }
}
