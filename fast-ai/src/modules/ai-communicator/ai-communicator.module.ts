import { Module } from '@nestjs/common';
import { AiCoreService } from './ai-communicator.service';
import { AiCoreController } from './ai-communicator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../messages/entities/message.entity';
import { ApiKey } from '../api-keys/entities/api-key.entity';
import { Chat } from '../chat/entities/chat.entity';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, ApiKey, Chat])],
  controllers: [AiCoreController],
  providers: [AiCoreService, ChatService],
})
export class AiCoreModule {}
