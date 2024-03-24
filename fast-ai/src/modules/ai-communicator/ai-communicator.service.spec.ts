import { Test, TestingModule } from '@nestjs/testing';
import { AiCoreService } from './ai-communicator.service';

describe('AiCoreService', () => {
  let service: AiCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiCoreService],
    }).compile();

    service = module.get<AiCoreService>(AiCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
