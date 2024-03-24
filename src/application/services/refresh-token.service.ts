import { Inject } from '@nestjs/common';
import { CacheInterface } from 'src/domain/repositories/interfaces/cache.interface';

export class RefreshTokenService {
  constructor(
    @Inject('Cache')
    private cache: CacheInterface,
  ) {}

  async store(userId: string, refreshToken: string, ttl?: number) {
    return await this.cache.set(userId, refreshToken, ttl);
  }

  async get(userId: string) {
    return await this.cache.get(userId);
  }

  async delete(userId: string) {
    return await this.cache.delete(userId);
  }
}
