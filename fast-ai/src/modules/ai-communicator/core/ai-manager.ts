import { Injectable } from '@nestjs/common';
import { MessageT } from './ai-manager.types';

export interface IAIModel {
  createCompletion(message: Array<MessageT>): Promise<MessageT>;
}

@Injectable()
export class AIManager {
  public constructor(private readonly model: IAIModel) {}

  createCompletion(messages: Array<MessageT>) {
    return this.model.createCompletion(messages);
  }
}
