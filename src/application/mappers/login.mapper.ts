import { ApiProperty } from '@nestjs/swagger';

export class LogginMapper {
  @ApiProperty()
  public accessToken: string;

  @ApiProperty()
  public refreshToken: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  constructor(props: LogginMapper) {
    Object.assign(this, {
      success: props,
    });
  }
}
