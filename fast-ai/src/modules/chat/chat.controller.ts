import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ReqUser } from '../auth/auth.decorators';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@ReqUser() user: User, @Body() createChatDto: CreateChatDto) {
    return this.chatService.create(user, createChatDto);
  }

  @Get()
  findAll(@ReqUser() user: User) {
    return this.chatService.findAll(user);
  }

  @Get(':id')
  findOne(@ReqUser() user: User, @Param('id') id: string) {
    return this.chatService.findOne(user, +id);
  }

  @Patch(':id')
  update(
    @ReqUser() user: User,
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
  ) {
    return this.chatService.update(user, +id, updateChatDto);
  }

  @Delete(':id')
  remove(@ReqUser() user: User, @Param('id') id: string) {
    return this.chatService.remove(user, +id);
  }
}
