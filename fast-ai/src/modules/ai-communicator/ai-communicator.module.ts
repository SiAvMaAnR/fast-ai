import { Module } from '@nestjs/common';
import { AiCoreService } from './ai-communicator.service';
import { AiCoreController } from './ai-communicator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../messages/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [AiCoreController],
  providers: [AiCoreService],
})
export class AiCoreModule {}
