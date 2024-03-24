import { Test, TestingModule } from '@nestjs/testing';
import { AiCoreController } from './ai-communicator.controller';
import { AiCoreService } from './ai-communicator.service';

describe('AiCoreController', () => {
  let controller: AiCoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiCoreController],
      providers: [AiCoreService],
    }).compile();

    controller = module.get<AiCoreController>(AiCoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
