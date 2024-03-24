import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CacheInterface } from './interfaces/cache.interface';

@Injectable()
export class CacheRepository implements CacheInterface {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number) {
    try {
      return await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(key: string) {
    try {
      return await this.cacheManager.del(key);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
