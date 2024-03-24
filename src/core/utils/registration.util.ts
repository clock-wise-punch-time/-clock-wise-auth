import { Injectable } from "@nestjs/common";
import { RegistrationInterface } from "./interfaces/registration.interface";

@Injectable()
export class RegistrationUtil implements RegistrationInterface {
  code(cpf: string, birthdate: string): string {
    const documentNumbers = Number(cpf.substring(4, 10));
    const birthdateInNumber = Number(birthdate.split("-").join(""));
    const rmNumber = Number(documentNumbers - birthdateInNumber - 9999999) * -1;
    return `RM${rmNumber}`;
  }

  validate(rm: string, cpf: string, birthdate: string): boolean {
    const rmNumber = parseInt(rm.substring(2));
    const documentNumbers = parseInt(cpf.substring(4, 10));
    const birthdateInNumber = parseInt(birthdate.split("-").join(""));
    const expectedRM = documentNumbers - birthdateInNumber - 9999999;
    const calculatedRM = Math.abs(rmNumber);
    return expectedRM === calculatedRM;
  }

  isRegistration(value: string): boolean {
    if (!value.startsWith("RM")) return false;

    const rmNumber = parseInt(value.substring(2));

    if (isNaN(rmNumber)) return false;

    return true;
  }
}
