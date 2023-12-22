import { TestingModule, Test } from '@nestjs/testing';
import { ConfigurationController } from '../configuration.controller';
import { ConfigurationService } from '../configuration.service';
import { OptionalParamsDto } from '../dto/optional-params.dto';
import {
  UpdateConfigurationDTO,
  UpdateParamsDTO,
} from '../dto/UpdateConfigurationDTO';

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
          country: 'Brazil',
          tenant: 'exampleTenant',
          id: '1',
        };

        const mockUpdateConfiguration: UpdateConfigurationDTO = {
          country_iso: 1,
          operation_type: 1,
          brand: 1,
          name: 'Novo Nome',
          description: 'Nova Descrição',
          enabled: true,
          version: 'Versão 2.0',
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
  });
});
