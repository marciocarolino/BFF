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

      // Ajuste para passar uma instância de OptionalParamsDto conforme esperado pela controladora
      const mockPass = new OptionalParamsDto();
      mockPass.configurationMock = 'specificValue'; // Ajuste conforme necessário

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
        // Criar objetos mock para os parâmetros e o valor de retorno
        const mockParams: UpdateParamsDTO = {
          country: 'Brazil',
          tenant: 'exampleTenant',
          id: '1',
        };

        const mockUpdateConfiguration: UpdateConfigurationDTO = {
          country_iso: 1, // Substitua pelos valores reais que você precisa para o teste
          operation_type: 1,
          brand: 1,
          name: 'Novo Nome',
          description: 'Nova Descrição',
          enabled: true,
          version: 'Versão 2.0',
        };

        const mockResult = {};

        // Mock do método update do serviço
        jest.spyOn(service, 'update').mockResolvedValue(mockResult);

        // Chamada do método do controlador
        const result = await controller.update(
          mockParams,
          mockUpdateConfiguration,
        );

        // Verificação se o resultado retornado é igual ao valor esperado
        expect(result).toEqual(mockResult);

        // Verificação se o método update do serviço foi chamado com os parâmetros esperados
        expect(service.update).toHaveBeenCalledWith(
          mockParams,
          mockUpdateConfiguration,
        );
      });
    });
  });
});
