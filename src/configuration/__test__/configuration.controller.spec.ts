import { TestingModule, Test } from '@nestjs/testing';
import { ConfigurationController } from '../configuration.controller';
import { ConfigurationService } from '../configuration.service';
import { OptionalParamsDto } from '../dto/optional-params.dto';
import { UpdateParamsDTO } from '../dto/UpdateConfigurationDTO';
import { NotFoundException } from '@nestjs/common';
import { mockNewConfiguration, mockUpdateConfiguration } from './mock/mockData';

describe('ConfigurationController', () => {
  let controller: ConfigurationController;
  let service: ConfigurationService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
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

      const mockPass = new OptionalParamsDto();
      mockPass.configurationMock = 'specificValue';

      jest.spyOn(service, 'getAll').mockResolvedValue(mockResult);

      const result = await controller.getAll(mockPass);

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

    describe('update', () => {
      it('should update configuration by id', async () => {
        const mockParams: UpdateParamsDTO = {
          country: 1,
          tenant: 'exampleTenant',
          id: '1',
        };

        const mockResult = {};

        jest.spyOn(service, 'update').mockResolvedValue(mockResult);

        const result = await controller.update(
          mockParams,
          mockUpdateConfiguration,
        );

        expect(result).toEqual(mockResult);

        expect(service.update).toHaveBeenCalledWith(
          mockParams,
          mockUpdateConfiguration,
        );
      });
    });

    describe('create', () => {
      it('should create a new configuration', async () => {
        const mockCreatedConfiguration = {
          ...mockNewConfiguration,
          id: 'new-id', // Adicione um ID fictício ou ajuste conforme necessário
        };

        jest
          .spyOn(service, 'create')
          .mockResolvedValue(mockCreatedConfiguration);

        const result = await controller.create(mockNewConfiguration);

        expect(result).toEqual(mockCreatedConfiguration);
        expect(service.create).toHaveBeenCalledWith(mockNewConfiguration);
      });

      it('should handle exceptions during creation', async () => {
        // Simula uma exceção durante a criação
        jest
          .spyOn(service, 'create')
          .mockRejectedValue(new NotFoundException('Some error message'));

        await expect(
          controller.create(mockNewConfiguration),
        ).rejects.toThrowError(NotFoundException);

        expect(service.create).toHaveBeenCalledWith(mockNewConfiguration);
      });
    });
  });
});
