import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { guidelines } from "./base/guidelines";
import { HasherUtil } from "../src/core/utils/hasher.util";
import { RegistrationUtil } from "../src/core/utils/registration.util";

const prisma = new PrismaClient();
const logger = new Logger("SEED")
const hasher = new HasherUtil()
const registration = new RegistrationUtil()

async function main() {
  try {
    await prisma.guideline.createMany({
      data: guidelines
    })

    const birthdate = '1990-01-01'
    const cpf = "03336493030"
    const userData = {
      username: 'john_doe',
      registration: registration.code(cpf, birthdate),
      cpf,
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      phone: '71988366171',
      verify_email: true,
      birthdate: new Date(birthdate),
      password: hasher.encrypt('texT@1234'),
      role: 'SUPER_ADMIN',
      status: true,
  } as any;

   await prisma.user.create({
    data: userData
   })

  } catch (error) {
    logger.error(error)
  } finally {
    await prisma.$disconnect();
    process.exit(1);
  }
}

main()