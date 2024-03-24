import openAI from 'openai';
import { IAIModel } from '../ai-manager';
import { GptMessageRoleEnum, GptModelEnum } from './chat-gpt.constants';
import { MessageT } from '../ai-manager.types';

class ChatGPTModel implements IAIModel {
  private client: openAI;
  private model: GptModelEnum;

  public constructor(apiKey: string, model: GptModelEnum) {
    this.client = new openAI({ apiKey });
    this.model = model;
  }

  async createCompletion(messages: Array<MessageT>): Promise<MessageT> {
    const adaptedMessages = messages.map((message) => ({
      ...message,
      role: message.role as GptMessageRoleEnum,
    }));

    const chatCompletion = await this.client.chat.completions.create({
      messages: adaptedMessages,
      model: this.model,
    });

    const [choice] = chatCompletion.choices;

    return choice.message;
  }
}

export { ChatGPTModel };
