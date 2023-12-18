import { TestingModule, Test } from '@nestjs/testing';
import { ConfigurationController } from '../configuration.controller';
import { ConfigurationService } from '../configuration.service';

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
    it('should return an array of configuration', async () => {
      const result = ['configuration1', 'configurarion2'];
      jest.spyOn(service, 'getAll').mockImplementation(async () => result);
      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('getById', () => {
    it('should return a configuration by ID', async () => {
      const id = 1;
      const result = 'configuration1';
      jest.spyOn(service, 'getById').mockImplementation(async () => result);

      expect(await controller.getById(id)).toBe(result);
    });
  });
});
