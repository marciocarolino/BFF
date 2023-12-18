import { TestingModule, Test } from '@nestjs/testing';
import { ConfigurationService } from '../configuration.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return "GET ALL"', async () => {
      const result = await service.getAll();
      expect(result).toBe('GET ALL');
    });
  });

  describe('getById', () => {
    it('should return a string with the provided id', async () => {
      const id = 123;
      const result = await service.getById(id);
      expect(result).toBe(`Testando o id.: ${id}, pelo parametro`);
    });
  });
});
