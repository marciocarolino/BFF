import { TestingModule, Test } from '@nestjs/testing';
import { ConfigurationController } from '../configuration.controller';
import { ConfigurationService } from '../configuration.service';
import { FindByIdDTO } from '../dto/configuration.dto';

describe('ConfigurationController', () => {
  let controller: ConfigurationController;
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationController],
      providers: [ConfigurationService],
    }).compile();

    controller = module.get<ConfigurationController>(ConfigurationController);
    service = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all configurations', async () => {
      const mockResult = { configuration: [] };
      jest.spyOn(service, 'getAll').mockResolvedValue(mockResult);

      const result = await controller.getAll();

      expect(result).toBe(mockResult);
    });

    describe('getById', () => {
      it('should return configuration by id', async () => {
        const mockId = '';
        const mockResult = { configuration: {} };
        jest.spyOn(service, 'getById').mockResolvedValue(mockResult);

        const result = await controller.getById({ id: mockId });

        expect(result).toEqual(mockResult);
      });
    });
  });
});
