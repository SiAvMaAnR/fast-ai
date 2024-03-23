import { Module } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import { AiCoreController } from './ai-core.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [AiCoreController],
  providers: [AiCoreService],
})
export class AiCoreModule {}
