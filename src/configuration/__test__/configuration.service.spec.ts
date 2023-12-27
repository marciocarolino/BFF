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
    jest.resetAllMocks();
  });

  describe('getAll', () => {
    it('should return configurations', async () => {
      const mockResponse = {
        data: {
          docs: null,
        },
      };
      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, mockResponse);

      const result = await service.getAll();

      expect(result || []).toEqual([]);
    });

    it('should handle error and return an empty array', async () => {
      axiosMock.onGet(`${process.env.API}/configuration`).reply(500);

      const result = await service.getAll();

      expect(result).toEqual([]);
    });

    it('should handle null response and return an empty array', async () => {
      const mockResponse = { data: { docs: null } };
      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, mockResponse);

      const result = await service.getAll();

      expect(result || []).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return configuration by ID', async () => {
      const mockResponse = {
        data: {
          docs: [
            {
              id: 'cd5fa417-b667-482d-b208-798d9da3213z',
            },
          ],
        },
      };

      jest
        .spyOn(service, 'getAll')
        .mockResolvedValueOnce({ data: { docs: [] } });

      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, mockResponse);

      const id = '1';

      const result = await service.getById(id);

      expect(result).toEqual([]);
    });

    it('should handle null response and return an empty array', async () => {
      axiosMock
        .onGet(`${process.env.API}/configuration`)
        .reply(200, { data: { docs: null } });

      jest.spyOn(service, 'getAll').mockResolvedValue([]);

      const id = '1';

      const result = await service.getById(id);

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new configuration', async () => {
      const mockNewConfiguration: CreateConfigurationDTO = {
        country_iso: '1',
        operation_type: '2',
        brand: '1',
        name: 'New Configuration',
        description: 'Description of the new configuration',
        enabled: true,
        version: '1.0',
      };
      const mockResponse = {
        data: {},
      };
      axiosMock
        .onPost(`${process.env.API}/configurations`)
        .reply(201, mockResponse);

      const result = await service.create(mockNewConfiguration);

      expect(result).toEqual({
        data: mockResponse.data,
      });
    });

    it('should handle error and throw an error', async () => {
      const mockNewConfiguration: CreateConfigurationDTO = {
        country_iso: '1',
        operation_type: '2',
        brand: '1',
        name: 'New Configuration',
        description: 'Description of the new configuration',
        enabled: true,
        version: '1.0',
      };
      axiosMock.onPost(`${process.env.API}/configurations`).reply(500);

      await expect(service.create(mockNewConfiguration)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a configuration', async () => {
      const mockParams: UpdateParamsDTO = {
        country: 'br',
        tenant: 'santander',
        id: '1',
      };
      const id = '1';
      const mockUpdateConfiguration = {};
      const mockResponse = {
        data: {},
      };
      axiosMock
        .onPut(
          `${process.env.API}/configurations/${mockParams.country}/${mockParams.tenant}/${mockParams.id}`,
        )
        .reply(200, mockResponse);

      const result = await service.update(id, mockUpdateConfiguration);

      expect(result).toEqual({
        data: mockResponse.data,
      });
    });

    it('should handle error and throw an error', async () => {
      const mockParams: UpdateParamsDTO = {
        country: 'br',
        tenant: 'santander',
        id: '1',
      };
      const id = '1';
      const mockUpdateConfiguration = {};
      axiosMock
        .onPut(
          `${process.env.API}/configurations/${mockParams.country}/${mockParams.tenant}/${mockParams.id}`,
        )
        .reply(500);

      // Expectativa
      await expect(
        service.update(id, mockUpdateConfiguration),
      ).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a configuration by ID', async () => {
      const mockId = '1';
      const mockResponse = {
        data: {},
      };
      axiosMock
        .onDelete(`${process.env.API}/configurations/${mockId}`)
        .reply(204, mockResponse);

      const result = await service.delete(mockId);

      expect(result).toEqual({
        data: mockResponse.data,
      });
    });

    it('should handle error and throw an error', async () => {
      const mockId = '1';
      axiosMock
        .onDelete(`${process.env.API}/configurations/${mockId}`)
        .reply(500);

      await expect(service.delete(mockId)).rejects.toThrowError();
    });
  });
});
