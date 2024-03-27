import { AIIntegrationEnum } from './ai-manager.types';
import { GptModelEnum } from './chat-gpt/chat-gpt.types';
import { SonicModelEnum } from './chat-sonic/chat-sonic.types';

export const modelMapper = {
  [GptModelEnum.Gpt3T]: AIIntegrationEnum.ChatGPT,
  [GptModelEnum.Gpt4]: AIIntegrationEnum.ChatGPT,
  [SonicModelEnum.A]: AIIntegrationEnum.ChatSonic,
};
