import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add-job')
  async addJob(
    @Body()
    body: {
      queueName: string;
      data: Record<string, any>;
      delayMs?: number;
    },
  ) {
    const { queueName, data, delayMs = 0 } = body;
    const job = await this.queueService.addJob(data, delayMs);
    return {
      message: 'Job added',
      jobId: job.id,
      queueName,
      delayMs,
      scheduledFor: new Date(Date.now() + delayMs).toISOString(),
    };
  }
}
