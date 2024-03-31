import { IsEnum } from 'class-validator';
import { AIModelEnum } from 'src/modules/ai-communicator/core/ai-manager.types';

export class CreateApiKeyDto {
  content: string;

  optionalContent?: string;

  @IsEnum(AIModelEnum)
  model: AIModelEnum;
}
