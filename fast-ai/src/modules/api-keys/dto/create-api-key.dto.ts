import { AIModelEnum } from 'src/modules/ai-communicator/ai-communicator.constants';

export class CreateApiKeyDto {
  content: string;
  model: AIModelEnum;
}
