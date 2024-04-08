import axios from 'axios';
import { IAIModel } from '../ai-manager';
import { defaultTemperature } from '../ai-manager.constants';
import {
  AIModelEnum,
  CreateCompletionArgsT,
  MessageT,
} from '../ai-manager.types';
import { YandexGPTMessageRoleEnum } from './yandex-gpt.types';
import { RequestFailedError } from '../ai-manager.errors';
import { ApiKey } from 'src/api-keys/entities/api-key.entity';

class YandexGPTModel implements IAIModel {
  private model: AIModelEnum;
  private apiKey: string;
  private catalogId: string;
  public userRole = YandexGPTMessageRoleEnum.User;

  public constructor(apiKey: ApiKey) {
    this.model = apiKey.model;
    this.apiKey = apiKey.content;
    this.catalogId = apiKey.optionalContent;
  }

  public async createCompletion(
    args: CreateCompletionArgsT,
  ): Promise<MessageT> {
    const { messages, temperature } = args;

    const adaptedMessages = messages.map((message) => ({
      text: message.content,
      role: message.role as YandexGPTMessageRoleEnum,
    }));

    const modelUri = `gpt://${this.catalogId}/yandexgpt-lite`;
    const url =
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

    const response = await axios
      .post(
        url,
        {
          modelUri: modelUri,
          completionOptions: {
            stream: false,
            temperature: temperature || defaultTemperature,
            maxTokens: '2000',
          },
          messages: adaptedMessages,
        },
        {
          headers: {
            ['Content-Type']: 'application/json',
            ['Authorization']: `Api-Key ${this.apiKey}`,
            ['x-folder-id']: this.catalogId,
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new RequestFailedError(this.model, error.message);
      });

    const message = response?.result?.alternatives?.[0]?.message;

    return {
      content: message.text,
      role: message.role,
    };
  }
}

export { YandexGPTModel };
