import {
  HttpException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { IPrisma } from 'src/domain/repositories/interfaces/prisma.interfaces';
import { User } from 'src/domain/types/user';

export class UserService {
  constructor(
    @Inject('user')
    private readonly user: IPrisma<'user'>,
  ) {}

  async findAll(filter: Partial<User>): Promise<Partial<User>[]> {
    try {
      return await this.user?.findAll(filter);
    } catch (error) {
      return [];
    }
  }

  async findOne(filter: Partial<User>): Promise<User> {
    try {
      return await this.user?.findOne(filter);
    } catch (error) {
      return null;
    }
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      return await this.user?.create(data);
    } catch (error) {
      throw new InternalServerErrorException('Failure to create user');
    }
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    try {
      await this.user?.update(id, data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.user?.deleteById(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
