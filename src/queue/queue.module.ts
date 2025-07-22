import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { QueueProcessor } from './queue.processor';

@Module({
  providers: [QueueService, QueueProcessor],
  controllers: [QueueController],
  exports: [QueueService],
})
export class QueueModule {}
