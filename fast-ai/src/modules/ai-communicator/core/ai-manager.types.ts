import { GptModelEnum } from './chat-gpt/chat-gpt.types';
import { SonicModelEnum } from './chat-sonic/chat-sonic.types';

export type MessageT = {
  content: string;
  role: string;
};

export enum AIIntegrationEnum {
  ChatGPT = 'chat-gpt',
  ChatSonic = 'chat-sonic',
}

export enum AIModelEnum {
  Gpt3T = GptModelEnum.Gpt3T,
  Gpt4 = GptModelEnum.Gpt4,
  A = SonicModelEnum.A,
}
