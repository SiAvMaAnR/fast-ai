import { IsEnum } from 'class-validator';
import { AIModelEnum } from 'src/modules/ai-communicator/ai-communicator.constants';

export class CreateApiKeyDto {
  content: string;

  @IsEnum(AIModelEnum)
  model: AIModelEnum;
}
