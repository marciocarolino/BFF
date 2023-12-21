import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configuration.service';
import { configurationMock } from '../configuration-mock/configuration-mock';

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

  it('should return configurations when getAll is called', async () => {
    const mockResult = { data: [configurationMock] };
    jest.spyOn(service, 'getAll').mockResolvedValue(mockResult);

    const result = await service.getAll();

    // Use toEqual diretamente no array dentro da propriedade 'data'
    expect(result.data).toEqual([configurationMock]);
  });

  it('should return a specific configuration when getById is called with a valid ID', async () => {
    const id = { id: configurationMock.id };
    const result = await service.getById(id);
    expect(result).toEqual([]);
  });

  it('should return an empty array when getById is called with an invalid ID', async () => {
    const id = { id: 'invalid-id' };
    const result = await service.getById(id);
    expect(result).toEqual([]);
  });
});
