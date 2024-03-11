import { Module } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import { AiCoreController } from './ai-core.controller';

@Module({
  controllers: [AiCoreController],
  providers: [AiCoreService],
})
export class AiCoreModule {}
