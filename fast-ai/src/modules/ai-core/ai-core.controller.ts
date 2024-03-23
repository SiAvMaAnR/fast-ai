import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ReqUser } from '../auth/auth.decorators';
import { User } from '../users/entities/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('ai-core')
export class AiCoreController {
  constructor(private readonly aiCoreService: AiCoreService) {}

  @Post('create-message')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.aiCoreService.createMessage(createMessageDto);
  }

  // @Get('get-messages')
  // async getMessages(@ReqUser() user: User) {
  //   return this.aiCoreService.getMessagesByUser(user);
  // }
}
