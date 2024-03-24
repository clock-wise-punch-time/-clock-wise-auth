import { HttpException, Inject } from '@nestjs/common';
import { IPrisma } from 'src/domain/repositories/interfaces/prisma.interfaces';
import { Guideline } from 'src/domain/types/guideline';

export class GuidelineService {
  constructor(
    @Inject('guideline')
    private readonly guideline: IPrisma<'guideline'>,
  ) {}

  async findAll(filter: Partial<Guideline>): Promise<Partial<Guideline>[]> {
    try {
      return await this.guideline?.findAll(filter);
    } catch (error) {
      return [];
    }
  }

  async findAllLatestVersion() {
    try {
      const allGuidelines = await this?.guideline.findAll({
        orderBy: [{ type: 'asc' }, { version: 'desc' }],
      });

      const uniqueGuidelines = {};
      allGuidelines.forEach((guideline) => {
        if (!uniqueGuidelines[guideline.type]) {
          uniqueGuidelines[guideline.type] = guideline;
        }
      });

      return Object.values(uniqueGuidelines) as Guideline[];
    } catch (error) {
      return [];
    }
  }

  async findOne(filter: Partial<Guideline>): Promise<Partial<Guideline>> {
    try {
      return await this.guideline?.findOne(filter);
    } catch (error) {
      return null;
    }
  }

  async create(data: Partial<Guideline>): Promise<Partial<Guideline>> {
    try {
      return await this.guideline?.create(data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: string, data: Partial<Guideline>): Promise<void> {
    try {
      await this.guideline?.update(id, data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.guideline?.deleteById(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
