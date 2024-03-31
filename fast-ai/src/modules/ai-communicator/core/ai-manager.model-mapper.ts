import { AIIntegrationEnum } from './ai-manager.types';
import { ChatGPTModelEnum } from './chat-gpt/chat-gpt.types';
import { GigaChatModelEnum } from './giga-chat/giga-chat.types';
import { YandexGPTModelEnum } from './yandex-gpt/yandex-gpt.types';

export const modelMapper = {
  [ChatGPTModelEnum.Gpt3T]: AIIntegrationEnum.ChatGPT,
  [ChatGPTModelEnum.Gpt4]: AIIntegrationEnum.ChatGPT,
  [YandexGPTModelEnum.YaLite]: AIIntegrationEnum.YandexGPT,
  [GigaChatModelEnum.GigaChat]: AIIntegrationEnum.GigaChat,
  [GigaChatModelEnum.GigaChatPlus]: AIIntegrationEnum.GigaChat,
  [GigaChatModelEnum.GigaChatPro]: AIIntegrationEnum.GigaChat,
};
