import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetEmailDTO {
  @ApiProperty({
    example: "email@mail.com",
  })
  @IsNotEmpty({ message: "E-mail must not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  oldEmail: string;

  @ApiProperty({
    example: "email@mail.com",
  })
  @IsNotEmpty({ message: "E-mail must not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  newEmail: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Token must not be empty" })
  @IsString()
  token: string;
}
