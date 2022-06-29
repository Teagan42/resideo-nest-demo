import { Test, TestingModule } from '@nestjs/testing';
import { TestLibService } from './test-lib.service';

describe('TestLibService', () => {
  let service: TestLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestLibService],
    }).compile();

    service = module.get<TestLibService>(TestLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
