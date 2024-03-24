import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty({
    example: 'john_doe123',
    description: 'Username, registration or CPF',
  })
  @IsNotEmpty({ message: 'Username/Registration/CPF must not be empty' })
  @IsString({ message: 'Username/Registration/CPF must be a string' })
  identifier: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}
