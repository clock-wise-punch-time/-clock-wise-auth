export interface CacheInterface {
  get(key: string): Promise<unknown>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
}
