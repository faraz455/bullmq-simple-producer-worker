import IORedis from 'ioredis';

export function createRedisConnection() {
  return new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,
  });
}
