import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    description: 'Arbitrary key-value data for the article',
    type: 'object',
    additionalProperties: { type: 'object' }, // or specify `string`/`number` if more specific
    example: { title: 'Hello', tags: ['nestjs', 'bullmq'] },
  })
  data: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Optional delayMs',
    type: 'number',
    example: 1000,
  })
  delayMs: number = 0;
}
