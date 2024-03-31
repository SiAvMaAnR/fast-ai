import { ChatGPTModel } from './chat-gpt/chat-gpt';
import { ChatGPTModelEnum } from './chat-gpt/chat-gpt.types';
import { GigaChatModel } from './giga-chat/giga-chat';
import { GigaChatModelEnum } from './giga-chat/giga-chat.types';
import { YandexGPTModel } from './yandex-gpt/yandex-gpt';
import { YandexGPTModelEnum } from './yandex-gpt/yandex-gpt.types';

export type MessageT = {
  content: string;
  role: string;
};

export type CreateCompletionArgsT = {
  messages: Array<MessageT>;
  temperature?: number;
};

export enum AIIntegrationEnum {
  ChatGPT = 'chat-gpt',
  ChatSonic = 'chat-sonic',
  YandexGPT = 'yandex-gpt',
  GigaChat = 'giga-chat',
}

export const AIModelInstanceMap = {
  [AIIntegrationEnum.ChatGPT]: ChatGPTModel,
  [AIIntegrationEnum.YandexGPT]: YandexGPTModel,
  [AIIntegrationEnum.GigaChat]: GigaChatModel,
};

export enum AIModelEnum {
  Gpt3T = ChatGPTModelEnum.Gpt3T,
  Gpt4 = ChatGPTModelEnum.Gpt4,
  YaLite = YandexGPTModelEnum.YaLite,
  GigaChat = GigaChatModelEnum.GigaChat,
  GigaChatPlus = GigaChatModelEnum.GigaChatPlus,
  GigaChatPro = GigaChatModelEnum.GigaChatPro,
}
