import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsString()
  identifier: string;
  @ApiProperty()
  @IsString()
  recaptchaToken: string;
}
