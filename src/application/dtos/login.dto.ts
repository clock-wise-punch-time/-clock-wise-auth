import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'john_doe123',
    description: 'Username or registration number',
  })
  @IsNotEmpty({ message: 'Username/Registration must not be empty' })
  @IsString({ message: 'Username/Registration must be a string' })
  identifier: string;

  @ApiProperty({ example: 'Password@123', description: 'Password of the user' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    example: '03AFcWeA5yHTTq-...',
    description: 'Recaptchat robots verify',
  })
  @IsString()
  @IsOptional()
  recaptchaToken: string;
}
