import { Root } from "prisma/@types";


export const repositoryModule = (data: Root) => {
  return `import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaConnection } from 'src/domain/connection/prisma.connection';
import { PrismaRepository } from './prisma.repository';
import { CacheRepository } from './cache.repository';
  
const entities = [
${data.models
      .flatMap(({ name }) => {
        return ` "${name}"`;
      })
      .join(",\n")}
]

@Global()
@Module({
  imports: [],
  providers: [
    PrismaClient,
    PrismaConnection,
    ...entities.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new PrismaRepository(prisma, entity)
      },
      inject: [PrismaClient],
    })),
    {
      provide: 'Cache',
      useClass: CacheRepository,
    },
  ],
  exports: [
    PrismaClient,
    PrismaConnection,
    ...entities.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => {
        return new PrismaRepository(prisma, entity)
      },
      inject: [PrismaClient],
    })),
    {
      provide: 'Cache',
      useClass: CacheRepository,
    },
  ],
})
export class RepositoryModule {}
    `;
}