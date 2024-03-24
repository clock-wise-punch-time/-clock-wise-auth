import { Inject } from "@nestjs/common";
import { CacheInterface } from "src/domain/repositories/interfaces/cache.interface";

export class IpBlocklistService {
  constructor(
    @Inject("Cache")
    private cache: CacheInterface,
  ) {}

  async store(ipAddress: string, fingerprintId: string, ttl?: number) {
    await this.cache.set(fingerprintId, ipAddress, ttl);
    return await this.cache.set(ipAddress, fingerprintId, ttl);
  }

  async getFingerprint(fingerprintId: string) {
    return await this.cache.get(fingerprintId);
  }

  async getIpAddress(ipAddress: string) {
    return await this.cache.get(ipAddress);
  }

  async delete(userId: string) {
    return await this.cache.delete(userId);
  }
}
