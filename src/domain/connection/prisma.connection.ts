import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaConnection extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      errorFormat: "pretty",
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
