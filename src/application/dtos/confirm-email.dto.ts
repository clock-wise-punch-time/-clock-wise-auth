import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ConfirmEmailDTO {
  @ApiProperty({
    example: "email@mail.com",
  })
  @IsNotEmpty({ message: "E-mail must not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Token must not be empty" })
  @IsString()
  token: string;
}
