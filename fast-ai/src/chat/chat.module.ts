import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ApiKey } from '../api-keys/entities/api-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ApiKey])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
