export const repository = () => {
  return `import {
    Injectable,
    InternalServerErrorException,
    Logger,
  } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IPrismaRepository } from './interfaces/prisma.interfaces';
  
  @Injectable()
  export class PrismaRepository implements IPrismaRepository {
    protected logger = new Logger(PrismaRepository.name)
    private readonly model: any
  
    constructor(
      private readonly prisma: PrismaClient | any,
      private readonly modelName: string,
    ) {
      if (!(this.modelName in this.prisma)) {
        throw new InternalServerErrorException(
          \`Invalid model name:  \${this.modelName} \`,
        )
      }
      this.model = this.prisma[String(this.modelName).toLowerCase()]
      this.logger.verbose( \`[ \${this.modelName.toLocaleUpperCase()} INITIALIZE] \`)
    }
  
    async createMany(data: unknown[]) {
      try {
        const createdRecord = await this.model?.createMany({
          data,
        })
        return createdRecord as any[]
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} CREATE MANY]\`,
          error,
        )
        throw new InternalServerErrorException(
          \`Failed to create record: \${error.message}\`,
        )
      }
    }
  
    async create(data: any): Promise<any> {
      try {
        const createdRecord = await this.model?.create({
          data,
        })
        return createdRecord
      } catch (error) {
        this.logger.error(\`[\${this.modelName.toLocaleUpperCase()} CREATE]\`, error)
        throw new InternalServerErrorException(
          \`Failed to create record: \${error.message}\`,
        )
      }
    }
  
    async findOne(filter: any): Promise<any> {
      try {
        const foundRecord = await this.model?.findFirst({
          where: filter,
        })
        return foundRecord
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} FIND ONE]\`,
          error,
        )
        return null
      }
    }
  
    async findById(id: string): Promise<any> {
      try {
        const foundRecord = await this.model?.findUnique({
          where: { id },
        })
        return foundRecord
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} FIND BY ID]\`,
          error,
        )
        return null
      }
    }
  
    async findAll(
      filter?: {
        skip?: number
        orderBy?: Record<string, string>[]
        take?: number
        startDate?: string
        endDate?: string
      } & Partial<unknown>,
    ): Promise<unknown[]> {
      if (filter?.skip) {
        filter.skip =
          (filter?.skip - 1) * Number(filter?.take ?? process.env.PAGE_LIMIT ?? 0)
      }
  
      try {
        if (filter?.startDate) {
          filter.startDate = new Date(filter?.startDate).toISOString()
          filter.startDate = new Date(filter?.startDate).toISOString()
        }
  
        if (filter?.endDate) {
          filter.endDate = new Date(filter?.endDate).toISOString()
          filter.endDate = new Date(filter?.endDate).toISOString()
        }
  
        const { skip, take, startDate, endDate, orderBy, ...where } = filter ?? {
          skip: undefined,
          take: undefined,
        }
  
        let whereDate = {}
        if (startDate && endDate) {
          whereDate = {
            AND: [
              {
                OR: [
                  { created_at: { gte: startDate } },
                  { updated_at: { gte: startDate } },
                ],
              },
              {
                OR: [
                  { created_at: { lte: endDate } },
                  { updated_at: { lte: endDate } },
                ],
              },
            ],
          }
        }
  
        if (startDate) {
          whereDate = {
            OR: [
              { created_at: { gte: startDate } },
              { updated_at: { gte: startDate } },
            ],
          }
        }
  
        if (endDate) {
          whereDate = {
            OR: [
              { created_at: { lte: endDate } },
              { updated_at: { lte: endDate } },
            ],
          }
        }
  
        if (skip !== undefined && take !== undefined) {
          const allRecords = await this.model?.findMany({
            orderBy,
            where: { ...where, ...whereDate },
            skip: skip,
            take: take,
          })
          return allRecords
        }
  
        const allRecords = await this.model?.findMany({
          orderBy,
          where,
        })
        return allRecords
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} FIND ALL]\`,
          error,
        )
        return []
      }
    }
  
    async update(id: string, data: Partial<unknown>): Promise<unknown> {
      try {
        const updatedRecord = await this.model?.update({
          where: { id },
          data,
        })
        return updatedRecord
      } catch (error) {
        this.logger.error(\`[\${this.modelName.toLocaleUpperCase()} UPDATE]\`, error)
        return []
      }
    }
  
    async updateMany(
      filter: Partial<unknown>,
      data: Partial<unknown>,
    ): Promise<unknown> {
      try {
        const updatedRecord = await this.model?.updateMany({
          where: filter,
          data,
        })
        return updatedRecord
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} UPDATE MANY]\`,
          error,
        )
        return []
      }
    }
  
    async deleteById(id: string): Promise<void> {
      try {
        await this.model?.delete({
          where: { id },
        })
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} DELETE BY ID]\`,
          error,
        )
        throw new InternalServerErrorException(
          \`Failed to delete record by ID: \${error.message}\`,
        )
      }
    }
  
    async deleteMany(filter: Partial<unknown>): Promise<void> {
      try {
        await this.model?.deleteMany({
          where: filter,
        })
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} DELETE MANY]\`,
          error,
        )
        throw new InternalServerErrorException(
          \`Failed to delete multiple records: \${error.message}\`,
        )
      }
    }
  
    async findByIdWithRelations(id: string, relations: any[]): Promise<unknown> {
      try {
        const foundRecord = await this.model?.findUnique({
          where: { id },
          include: this.mapRelations(relations),
        })
        return foundRecord
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} FIND BY ID WITH RELATIONS]\`,
          error,
        )
        return null
      }
    }
  
    async findAllWithRelations(
      relations: any[],
      filter?: {
        skip?: number
        take?: number
        orderBy?: Record<string, string>[]
        startDate?: string
        endDate?: string
        include?: Record<string, any>
      } & Partial<any>,
    ): Promise<any> {
      try {
        if (filter?.skip) {
          filter.skip =
            (filter?.skip - 1) *
            Number(filter?.take ?? process.env.PAGE_LIMIT ?? 0)
        }
  
        if (filter?.startDate) {
          filter.startDate = new Date(filter?.startDate).toISOString()
          filter.startDate = new Date(filter?.startDate).toISOString()
        }
  
        if (filter?.endDate) {
          filter.endDate = new Date(filter?.endDate).toISOString()
          filter.endDate = new Date(filter?.endDate).toISOString()
        }
  
        const { skip, take, startDate, endDate, orderBy, include, ...where } = filter || {}
        const includeRelations = this.mapRelations(relations)
  
        let whereDate = {}
        if (startDate && endDate) {
          whereDate = {
            AND: [
              {
                OR: [
                  { created_at: { gte: startDate } },
                  { updated_at: { gte: startDate } },
                ],
              },
              {
                OR: [
                  { created_at: { lte: endDate } },
                  { updated_at: { lte: endDate } },
                ],
              },
            ],
          }
        }
  
        if (startDate) {
          whereDate = {
            OR: [
              { created_at: { gte: startDate } },
              { updated_at: { gte: startDate } },
            ],
          }
        }
  
        if (endDate) {
          whereDate = {
            OR: [
              { created_at: { lte: endDate } },
              { updated_at: { lte: endDate } },
            ],
          }
        }
  
        if (skip !== undefined && take !== undefined) {
          const allRecords = await this.model?.findMany({
            orderBy,
            where: { ...where, ...whereDate },
            include: {
              ...includeRelations,
              ...include,
            },
            skip: skip,
            take: take,
          })
          return allRecords
        } else {
          const allRecords = await this.model?.findMany({
            orderBy,
            where,
            include: {
              ...includeRelations,
              ...include,
            },
          })
          return allRecords
        }
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} FIND ALL WITH RELATIONS]\`,
          error,
        )
        return []
      }
    }
  
    async findOneWithRelations(
      relations: any[],
      filter?: {
        skip?: number
        take?: number
        include?: Record<string, any>
      } & Partial<any>,
    ): Promise<any> {
      try {
        const { skip, take, include, ...where } = filter || {}
        const includeRelations = this.mapRelations(relations)
  
        if (skip !== undefined && take !== undefined) {
          const allRecords = await this.model?.findFirst({
            where,
            include: {
              ...includeRelations,
              ...include,
            },
          })
          return allRecords
        } else {
          const allRecords = await this.model?.findFirst({
            where,
            include: {
              ...includeRelations,
              ...include,
            },
          })
          return allRecords
        }
      } catch (error) {
        return []
      }
    }
  
    async count(filter: any): Promise<any> {
      try {
        const foundRecord = await this.model?.count({
          where: filter,
        })
        return foundRecord
      } catch (error) {
        this.logger.error(\`[\${this.modelName.toLocaleUpperCase()} COUNT]\`, error)
        return null
      }
    }
  
    async countWithRelations(relations: any[], filter?: {
      skip?: number;
      take?: number;
      startDate?: string;
      endDate?: string;
      include?: Record<string, any>;
    } & Partial<any>,): Promise<any> {
      try {
        if (filter?.skip) {
          filter.skip =
            (filter?.skip - 1) *
            Number(filter?.take ?? process.env.PAGE_LIMIT ?? 0);
        }
  
        if (filter?.startDate) {
          filter.startDate = new Date(filter?.startDate).toISOString();
          filter.startDate = new Date(filter?.startDate).toISOString();
        }
  
        if (filter?.endDate) {
          filter.endDate = new Date(filter?.endDate).toISOString();
          filter.endDate = new Date(filter?.endDate).toISOString();
        }
  
        const { skip, take, startDate, endDate, include, ...where } =
          filter || {};
        const includeRelations = this.mapRelations(relations);
  
        let whereDate = {};
        if (startDate && endDate) {
          whereDate = {
            AND: [
              {
                OR: [
                  { created_at: { gte: startDate } },
                  { updated_at: { gte: startDate } },
                ],
              },
              {
                OR: [
                  { created_at: { lte: endDate } },
                  { updated_at: { lte: endDate } },
                ],
              },
            ],
          };
        }
  
        if (startDate) {
          whereDate = {
            OR: [
              { created_at: { gte: startDate } },
              { updated_at: { gte: startDate } },
            ],
          };
        }
  
        if (endDate) {
          whereDate = {
            OR: [
              { created_at: { lte: endDate } },
              { updated_at: { lte: endDate } },
            ],
          };
        }
  
        if (skip !== undefined && take !== undefined) {
          const allRecords = await this.model?.count({
            where: { ...where, ...whereDate },
            include: {
              ...includeRelations,
              ...include,
            },
            skip: skip,
            take: take,
          });
          return allRecords;
        } else {
          const allRecords = await this.model?.count({
            where,
            include: {
              ...includeRelations,
              ...include,
            },
          });
          return allRecords;
        }
      } catch (error) {
        this.logger.error(
          \`[\${this.modelName.toLocaleUpperCase()} COUNT WITH RELATIONS]\`,
          error,
        );
        return null;
      }
    }
  
    private mapRelations(relations: string[]): Record<string, any> {
      const result: Record<string, any> = {}
  
      for (const relation of relations) {
        const nestedRelations = relation.split(".")
        let currentAcc = result
  
        for (let i = 0; i < nestedRelations.length; i++) {
          const nestedRelation = nestedRelations[i]
  
          if (nestedRelation !== "") {
            if (!currentAcc[nestedRelation]) {
              currentAcc[nestedRelation] =
                i === nestedRelations.length - 1 ? true : { include: {} }
            } else if (
              i === nestedRelations.length - 1 &&
              currentAcc[nestedRelation] !== true
            ) {
              const include = currentAcc[nestedRelation].include || {}
              currentAcc[nestedRelation].include = {
                ...include,
                [nestedRelation]: true,
              }
            }
  
            currentAcc = currentAcc[nestedRelation].include || {}
          }
        }
      }
      return result
    }
  }  
`;
}