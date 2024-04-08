import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { User } from '../users/entities/user.entity';
import { ReqUser } from '../auth/auth.decorators';
import { AiCommunicatorService } from './ai-communicator.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('ai-communicator')
export class AiCommunicatorController {
  constructor(private readonly aiCommunicatorService: AiCommunicatorService) {}

  @Post('create-completion')
  async createMessage(
    @ReqUser() user: User,
    @Body() createCompletionDto: CreateCompletionDto,
  ) {
    return this.aiCommunicatorService.createCompletion(
      user,
      createCompletionDto,
    );
  }
}
