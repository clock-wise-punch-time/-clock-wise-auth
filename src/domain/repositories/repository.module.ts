import { Global, Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaConnection } from "src/domain/connection/prisma.connection";
import { PrismaRepository } from "./prisma.repository";
import { CacheRepository } from "./cache.repository";

const entities = ["user", "guideline", "guideline_accepted", "device", "code"];

@Global()
@Module({
  imports: [],
  providers: [
    PrismaClient,
    PrismaConnection,
    ...entities.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new PrismaRepository(prisma, entity);
      },
      inject: [PrismaClient],
    })),
    {
      provide: "Cache",
      useClass: CacheRepository,
    },
  ],
  exports: [
    PrismaClient,
    PrismaConnection,
    ...entities.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new PrismaRepository(prisma, entity);
      },
      inject: [PrismaClient],
    })),
    {
      provide: "Cache",
      useClass: CacheRepository,
    },
  ],
})
export class RepositoryModule {}
