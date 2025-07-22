import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { createRedisConnection } from './redis.factory';

@Injectable()
export class QueueProcessor implements OnModuleInit, OnModuleDestroy {
  private worker: Worker | undefined;
  private connection: IORedis | undefined;

  async onModuleInit() {
    this.connection = createRedisConnection();
    this.worker = new Worker(
      'demo-queue',
      async (job) => {
        console.log('Processing job:', job.id, job.data);
        // Simulate work
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Job done:', job.id);
        return { result: 'success' };
      },
      { connection: this.connection },
    );

    this.worker.on('completed', (job) => {
      console.log(`Job with id ${job.id} has been completed!`);
    });

    this.worker.on('failed', (job, err) => {
      console.error(`Job with id ${job?.id} has failed with error:`, err);
    });
  }

  async onModuleDestroy() {
    if (this.worker) await this.worker.close();
    if (this.connection) await this.connection.quit();
  }
}
