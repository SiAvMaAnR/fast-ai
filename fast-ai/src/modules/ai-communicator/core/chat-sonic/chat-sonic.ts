import { IAIModel } from '../ai-manager';
import { AIModelEnum, MessageT } from '../ai-manager.types';

class ChatSonicModel implements IAIModel {
  private model: AIModelEnum;

  public constructor(apiKey: string, model: AIModelEnum) {
    this.model = model;
  }

  async createCompletion(messages: Array<MessageT>): Promise<MessageT> {
    console.log(messages);

    return {
      content: '',
      role: '',
    };
  }
}

export { ChatSonicModel };
