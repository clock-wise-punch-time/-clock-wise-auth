import { HttpException, Inject } from '@nestjs/common';
import { IPrisma } from 'src/domain/repositories/interfaces/prisma.interfaces';
import { GuidelineAccepted } from 'src/domain/types/guideline_accepted';

export class GuidelineAccepetedService {
  constructor(
    @Inject('guideline_accepted')
    private readonly guideline_accepted: IPrisma<'guideline_accepted'>,
  ) {}

  async findAll(
    filter: Partial<GuidelineAccepted>,
  ): Promise<Partial<GuidelineAccepted>[]> {
    try {
      return await this.guideline_accepted?.findAll(filter);
    } catch (error) {
      return [];
    }
  }

  async findOne(
    filter: Partial<GuidelineAccepted>,
  ): Promise<Partial<GuidelineAccepted>> {
    try {
      return await this.guideline_accepted?.findOne(filter);
    } catch (error) {
      return null;
    }
  }

  async create(
    data: Partial<GuidelineAccepted>,
  ): Promise<Partial<GuidelineAccepted>> {
    try {
      return await this.guideline_accepted?.create(data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async createMany(
    data: Partial<GuidelineAccepted>[],
  ): Promise<Partial<GuidelineAccepted[]>> {
    try {
      return await this.guideline_accepted?.createMany(data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: string, data: Partial<GuidelineAccepted>): Promise<void> {
    try {
      await this.guideline_accepted?.update(id, data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.guideline_accepted?.deleteById(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
