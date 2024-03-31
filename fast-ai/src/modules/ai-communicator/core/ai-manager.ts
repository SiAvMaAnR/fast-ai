import { Injectable } from '@nestjs/common';
import { CreateCompletionArgsT, MessageT } from './ai-manager.types';

export interface IAIModel {
  createCompletion(args: CreateCompletionArgsT): Promise<MessageT>;

  userRole: string;
}

@Injectable()
export class AIManager {
  public constructor(private readonly model: IAIModel) {}

  createCompletion(args: CreateCompletionArgsT) {
    return this.model.createCompletion(args);
  }
}
