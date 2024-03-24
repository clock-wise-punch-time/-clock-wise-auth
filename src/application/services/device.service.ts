import { HttpException, Inject } from '@nestjs/common';
import { IPrisma } from 'src/domain/repositories/interfaces/prisma.interfaces';
import { Device } from 'src/domain/types/device';

export class DeviceService {
  constructor(
    @Inject('device')
    private readonly device: IPrisma<'device'>,
  ) {}

  async findAll(filter: Partial<Device>): Promise<Partial<Device>[]> {
    try {
      return await this.device?.findAll(filter);
    } catch (error) {
      return [];
    }
  }

  async findOne(filter: Partial<Device>): Promise<Partial<Device>> {
    try {
      return await this.device?.findOne(filter);
    } catch (error) {
      return null;
    }
  }

  async create(data: Partial<Device>): Promise<Partial<Device>> {
    try {
      return await this.device?.create(data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: string, data: Partial<Device>): Promise<void> {
    try {
      await this.device?.update(id, data);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.device?.deleteById(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
