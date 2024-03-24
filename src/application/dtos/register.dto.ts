import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsDate,
  MinLength,
  MaxLength,
  Matches,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { DocumentUtil } from "src/core/utils/document.util";
import { CustomException } from "src/domain/entities/error/custom-exception";
import { ERROR_NAME } from "src/infrastructure/enums/error-name.enum";

export class RegisterDTO {
  @ApiProperty({ example: "john_doe123", description: "Username of the user" })
  @IsNotEmpty({ message: "Username must not be empty" })
  @IsString({ message: "Username must be a string" })
  username: string;

  @ApiProperty({ example: "John", description: "First name of the user" })
  @IsNotEmpty({ message: "Name must not be empty" })
  @IsString({ message: "Name must be a string" })
  name: string;

  @ApiProperty({ example: "Doe", description: "Last name of the user" })
  @IsNotEmpty({ message: "Lastname must not be empty" })
  @IsString({ message: "Lastname must be a string" })
  lastname: string;

  @ApiProperty({
    example: "john@example.com",
    description: "Email address of the user",
  })
  @IsNotEmpty({ message: "Email must not be empty" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({
    example: "123.456.789-10",
    description: "CPF number of the user",
  })
  @IsNotEmpty({ message: "CPF must not be empty" })
  @Transform(({ value }) => {
    const document = value.replace(/\D/g, "");
    const util = new DocumentUtil();
    if (!util.isCPF(document)) {
      throw new CustomException(ERROR_NAME.INVALID_CPF);
    }
    return document;
  })
  cpf: string;

  @ApiProperty({
    example: "(12) 93456-7890",
    description: "Phone number of the user",
  })
  @IsNotEmpty({ message: "Phone must not be empty" })
  @Transform(({ value }) => {
    const document = value.replace(/\D/g, "");
    const util = new DocumentUtil();
    if (!util.isPhoneNumber(document)) {
      throw new CustomException(ERROR_NAME.INVALID_PHONE);
    }
    return document;
  })
  phone: string;

  @ApiProperty({
    example: "1990-01-01",
    description: "Date of birth of the user",
  })
  @IsNotEmpty({ message: "Birthdate must not be empty" })
  @Type(() => Date)
  @IsDate({ message: "Invalid date format" })
  birthdate: Date;

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

  @ApiProperty({
    example: true,
    description: "Whether the user has accepted the terms or not",
  })
  @IsNotEmpty({ message: "TermsAccepted must not be empty" })
  @IsBoolean({ message: "TermsAccepted must be a boolean" })
  termsAccepted: boolean;

  @ApiProperty({
    example: "gAl18VuzJevXs2XagLUJ",
    description: "Fingerprint identification for real user",
  })
  @IsString()
  @IsOptional()
  fingerprintId: string;

  @ApiProperty({
    example: "03AFcWeA5yHTTq-...",
    description: "Recaptchat robots verify",
  })
  @IsString()
  @IsOptional()
  recaptchaToken: string;
}
