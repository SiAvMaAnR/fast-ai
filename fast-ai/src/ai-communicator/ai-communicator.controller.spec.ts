import { Test, TestingModule } from '@nestjs/testing';
import { AiCommunicatorController } from './ai-communicator.controller';
import { AiCommunicatorService } from './ai-communicator.service';

describe('AiCommunicatorController', () => {
  let controller: AiCommunicatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiCommunicatorController],
      providers: [AiCommunicatorService],
    }).compile();

    controller = module.get<AiCommunicatorController>(AiCommunicatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
