import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class ResetPasswordDTO {
  @ApiProperty({
    example: "email@mail.com",
  })
  @IsNotEmpty({ message: "E-mail must not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({
    example: "Password@123",
    description:
      "Password of the user. It must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character, and 1 number. Minimum length: 8 characters, Maximum length: 20 characters.",
  })
  @IsNotEmpty({ message: "Password must not be empty" })
  @IsString({ message: "Password must be a string" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20, { message: "Password must not exceed 20 characters" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    {
      message:
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character, and 1 number",
    },
  )
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Token must not be empty" })
  @IsString()
  token: string;
}
