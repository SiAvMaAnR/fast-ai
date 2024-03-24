import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiCoreService } from './ai-communicator.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCompletionDto } from './dto/create-completion.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('ai-communicator')
export class AiCoreController {
  constructor(private readonly aiCoreService: AiCoreService) {}

  @Post('create-completion')
  async createMessage(@Body() createCompletionDto: CreateCompletionDto) {
    return this.aiCoreService.createCompletion(createCompletionDto);
  }
}
