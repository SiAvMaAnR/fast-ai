import { Controller } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';

@Controller('ai-core')
export class AiCoreController {
  constructor(private readonly aiCoreService: AiCoreService) {}
}
