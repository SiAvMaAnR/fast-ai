import { IAIModel } from '../ai-manager';
import { MessageT } from '../ai-manager.types';
import { SonicModelEnum } from './chat-sonic.constants';

class ChatSonicModel implements IAIModel {
  private model: SonicModelEnum;

  public constructor(apiKey: string, model: SonicModelEnum) {
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
