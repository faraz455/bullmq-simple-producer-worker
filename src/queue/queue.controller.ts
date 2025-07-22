import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateJobDto } from './dto/add-job.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add-job')
  async addJob(@Body() body: CreateJobDto) {
    const { data, delayMs } = body;
    const job = await this.queueService.addJob(data, delayMs);
    return {
      message: 'Job added',
      jobId: job.id,
      delayMs,
      scheduledFor: new Date(Date.now() + delayMs).toISOString(),
    };
  }
}
