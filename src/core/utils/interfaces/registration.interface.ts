export interface RegistrationInterface {
  code(cpf: string, birthdate: string): string;
  validate(rm: string, cpf: string, birthdate: string): boolean;
  isRegistration(value: string): boolean;
}
