import { Test, TestingModule } from '@nestjs/testing';
import { AiCommunicatorService } from './ai-communicator.service';

describe('AiCommunicatorService', () => {
  let service: AiCommunicatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiCommunicatorService],
    }).compile();

    service = module.get<AiCommunicatorService>(AiCommunicatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
