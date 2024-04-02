import { AIIntegrationEnum } from './ai-manager.types';
import { ChatGPTModel } from './chat-gpt/chat-gpt';
import { ChatGPTModelEnum } from './chat-gpt/chat-gpt.types';
import { GigaChatModel } from './giga-chat/giga-chat';
import { GigaChatModelEnum } from './giga-chat/giga-chat.types';
import { YandexGPTModel } from './yandex-gpt/yandex-gpt';
import { YandexGPTModelEnum } from './yandex-gpt/yandex-gpt.types';

export const modelMapper = {
  [ChatGPTModelEnum.Gpt3T]: AIIntegrationEnum.ChatGPT,
  [ChatGPTModelEnum.Gpt4]: AIIntegrationEnum.ChatGPT,
  [YandexGPTModelEnum.YaLite]: AIIntegrationEnum.YandexGPT,
  [GigaChatModelEnum.GigaChat]: AIIntegrationEnum.GigaChat,
  [GigaChatModelEnum.GigaChatPlus]: AIIntegrationEnum.GigaChat,
  [GigaChatModelEnum.GigaChatPro]: AIIntegrationEnum.GigaChat,
};

export const AIModelInstanceMap = {
  [AIIntegrationEnum.ChatGPT]: ChatGPTModel,
  [AIIntegrationEnum.YandexGPT]: YandexGPTModel,
  [AIIntegrationEnum.GigaChat]: GigaChatModel,
};
