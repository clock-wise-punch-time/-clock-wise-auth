import { DocumentInterface } from './interfaces/document.util';

export class DocumentUtil implements DocumentInterface {
  isCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, '');

    if (cleanedCPF.length !== 11) {
      return false;
    }

    const repeatedDigits = new RegExp('(\\d)\\1{10}');
    if (repeatedDigits.test(cleanedCPF)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    const firstDigit = digit >= 10 ? 0 : digit;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    const secondDigit = digit >= 10 ? 0 : digit;

    if (
      parseInt(cleanedCPF.charAt(9)) !== firstDigit ||
      parseInt(cleanedCPF.charAt(10)) !== secondDigit
    ) {
      return false;
    }
    return true;
  }

  isPhoneNumber(value: string): boolean {
    const regex =
      /^\(?(?:(?:\+|00)?(55)\s?)?[^\d]?(?:\(?0?[1-9][0-9]\)?)[^\d]?[-\s\.]?(?:9[1-9]\d{3}[-\s\.]?\d{4})$/;
    return regex.test(value);
  }
}
