import { Module } from '@nestjs/common';
import { AiCommunicatorService } from './ai-communicator.service';
import { AiCommunicatorController } from './ai-communicator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../messages/entities/message.entity';
import { ApiKey } from '../api-keys/entities/api-key.entity';
import { Chat } from '../chat/entities/chat.entity';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, ApiKey, Chat])],
  controllers: [AiCommunicatorController],
  providers: [AiCommunicatorService, ChatService],
})
export class AiCommunicatorModule {}
