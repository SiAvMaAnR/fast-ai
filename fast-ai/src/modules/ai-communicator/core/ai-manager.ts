import { Injectable } from '@nestjs/common';

export interface IAIModel {
  createCompletion(message: string): Promise<string>;
}

@Injectable()
export class AIManager {
  public constructor(private readonly model: IAIModel) {}

  createCompletion(message: string) {
    return this.model.createCompletion(message);
  }
}
