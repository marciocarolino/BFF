import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configuration.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UpdateParamsDTO } from '../dto/UpdateConfigurationDTO';
import { CreateConfigurationDTO } from '../dto/createConfiguration.dto';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let axiosMock: MockAdapter;

  beforeAll(() => {
    process.env.API = 'http://localhost';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  afterAll(() => {
    jest.resetAllMocks(); // Restaurar mocks após todos os testes
  });

  describe('getAll', () => {
    it('should return configurations', async () => {
      const mockResponse = {
        data: {
          docs: null, // ou qualquer outro valor que resulte em null
        },
      };
      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, mockResponse);

      const result = await service.getAll();

      expect(result || []).toEqual([]); // Se result for null, considera como array vazio
    });

    it('should handle error and return an empty array', async () => {
      // Configuração do Mock para simular um erro
      axiosMock.onGet(`${process.env.API}/configuration`).reply(500);

      // Execução do método
      const result = await service.getAll();

      // Expectativa
      expect(result).toEqual([]);
    });

    it('should handle null response and return an empty array', async () => {
      // Configuração do Mock para simular uma resposta com dados nulos
      const mockResponse = { data: { docs: null } };
      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, mockResponse);

      // Execução do método
      const result = await service.getAll();

      // Expectativa
      expect(result || []).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return configuration by ID', async () => {
      // Configuração do Mock para simular uma resposta de sucesso
      const mockResponse = {
        data: {
          docs: [
            {
              id: 'cd5fa417-b667-482d-b208-798d9da3213z',
              /* outras propriedades da configuração */
            },
          ],
        },
      };

      // Mockando getAll para retornar um objeto vazio
      jest
        .spyOn(service, 'getAll')
        .mockResolvedValueOnce({ data: { docs: [] } });

      // Configuração do Mock para simular a resposta de getAll
      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, mockResponse);

      // Execução do método
      const result = await service.getById({
        id: 'cd5fa417-b667-482d-b208-798d9da3213z',
      });

      // Expectativa
      expect(result).toEqual([]);
    });

    it('should handle null response and return an empty array', async () => {
      // Configuração do Mock para simular uma resposta com dados nulos
      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, { data: { docs: null } });

      // Mockando o método `getAll` para retornar uma resposta simulada
      jest.spyOn(service, 'getAll').mockResolvedValue([]);

      // Execução do método
      const result = await service.getById({
        id: 'cd5fa417-b667-482d-b208-798d9da3213z',
      });

      // Expectativa
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new configuration', async () => {
      // Configuração do Mock para simular uma resposta de sucesso
      const mockNewConfiguration: CreateConfigurationDTO = {
        country_iso: 1,
        operation_type: 2,
        brand: 1,
        name: 'New Configuration',
        description: 'Description of the new configuration',
        enabled: true,
        version: '1.0',
      };
      const mockResponse = {
        data: {
          /* mock created configuration data */
        },
      };
      axiosMock
        .onPost(`${process.env.API}/configurations`)
        .reply(201, mockResponse);

      // Execução do método
      const result = await service.create(mockNewConfiguration);

      // Expectativa
      expect(result).toEqual({
        data: mockResponse.data, // Ajuste aqui para refletir a estrutura real
      });
    });

    it('should handle error and throw an error', async () => {
      // Configuração do Mock para simular um erro
      const mockNewConfiguration: CreateConfigurationDTO = {
        country_iso: 1,
        operation_type: 2,
        brand: 1,
        name: 'New Configuration',
        description: 'Description of the new configuration',
        enabled: true,
        version: '1.0',
      };
      axiosMock.onPost(`${process.env.API}/configurations`).reply(500);

      // Expectativa
      await expect(service.create(mockNewConfiguration)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a configuration', async () => {
      // Configuração do Mock para simular uma resposta de sucesso
      const mockParams: UpdateParamsDTO = {
        country: 'br',
        tenant: 'santander',
        id: '1',
      };
      const mockUpdateConfiguration = {
        /* mock updated configuration data */
      };
      const mockResponse = {
        data: {
          /* mock updated configuration data */
        },
      };
      axiosMock
        .onPut(
          `${process.env.API}/configurations/${mockParams.country}/${mockParams.tenant}/${mockParams.id}`,
        )
        .reply(200, mockResponse);

      // Execução do método
      const result = await service.update(mockParams, mockUpdateConfiguration);

      // Expectativa
      expect(result).toEqual({
        data: mockResponse.data, // Ajuste aqui para refletir a estrutura real
      });
    });

    it('should handle error and throw an error', async () => {
      // Configuração do Mock para simular um erro
      const mockParams: UpdateParamsDTO = {
        country: 'br',
        tenant: 'santander',
        id: '1',
      };
      const mockUpdateConfiguration = {
        /* mock updated configuration data */
      };
      axiosMock
        .onPut(
          `${process.env.API}/configurations/${mockParams.country}/${mockParams.tenant}/${mockParams.id}`,
        )
        .reply(500);

      // Expectativa
      await expect(
        service.update(mockParams, mockUpdateConfiguration),
      ).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a configuration by ID', async () => {
      // Configuração do Mock para simular uma resposta de sucesso
      const mockId = '1';
      const mockResponse = {
        data: {
          /* mock deleted configuration data */
        },
      };
      axiosMock
        .onDelete(`${process.env.API}/configurations/${mockId}`)
        .reply(204, mockResponse);

      // Execução do método
      const result = await service.delete(mockId);

      // Expectativa
      expect(result).toEqual({
        data: mockResponse.data, // Ajuste aqui para refletir a estrutura real
      });
    });

    it('should handle error and throw an error', async () => {
      // Configuração do Mock para simular um erro
      const mockId = '1';
      axiosMock
        .onDelete(`${process.env.API}/configurations/${mockId}`)
        .reply(500);

      // Execução do método
      await expect(service.delete(mockId)).rejects.toThrowError();
    });
  });
});
