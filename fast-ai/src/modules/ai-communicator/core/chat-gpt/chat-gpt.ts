import openAI from 'openai';
import { IAIModel } from '../ai-manager';
import { GptMessageRoleEnum, GptModelEnum } from './chat-gpt.constants';

class ChatGPTModel implements IAIModel {
  private client: openAI;
  private model: GptModelEnum;

  public constructor(apiKey: string, model: GptModelEnum) {
    this.client = new openAI({ apiKey });
    this.model = model;
  }

  async createCompletion(message: string) {
    const chatCompletion = await this.client.chat.completions.create({
      messages: [
        {
          role: GptMessageRoleEnum.User,
          content: message,
        },
      ],
      model: this.model,
    });

    // message: role, content
    const [choice] = chatCompletion.choices;

    const { content } = choice.message;

    return content.toString();
  }
}

export { ChatGPTModel };
