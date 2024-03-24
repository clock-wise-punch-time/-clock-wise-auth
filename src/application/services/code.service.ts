import { HttpException, Inject } from '@nestjs/common';
import { Code } from 'src/domain/entities/code';
import { IPrisma } from 'src/domain/repositories/interfaces/prisma.interfaces';

export class CodeService {
  constructor(
    @Inject('code')
    private readonly code: IPrisma<'code'>,
  ) {}

  async findAll(filter: Partial<Code>): Promise<Partial<Code>[]> {
    try {
      return await this.code?.findAll(filter);
    } catch (error) {
      return [];
    }
  }

  async findOne(filter: Partial<Code>): Promise<Partial<Code>> {
    try {
      return await this.code?.findOne(filter);
    } catch (error) {
      return null;
    }
  }

  async create(data: Partial<Code>): Promise<Partial<Code>> {
    try {
      return await this.code?.create(data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: string, data: Partial<Code>): Promise<void> {
    const payload = new Code(data, { update: true });
    try {
      await this.code?.update(id, payload);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.code?.deleteById(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
