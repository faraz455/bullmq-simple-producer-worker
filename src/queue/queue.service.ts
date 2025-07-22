import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { createRedisConnection } from './redis.factory';

@Injectable()
export class QueueService implements OnModuleDestroy {
  private readonly queue: Queue;
  private readonly connection: IORedis;

  constructor() {
    this.connection = createRedisConnection();
    this.queue = new Queue('demo-queue', { connection: this.connection });
  }

  async addJob(data: Record<string, any>, delayMs: number = 0) {
    return this.queue.add('simple-job', data, { delay: delayMs });
  }

  async onModuleDestroy() {
    await this.queue.close();
    await this.connection.quit();
  }
}
