import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configuration.service';
import axios from 'axios';

jest.mock('axios');

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
    it('should fetch configurations successfully', async () => {
      const mockResponseData = {
        docs: [
          {
            id: '1',
            country_iso: 'BR',
            operation_type: 'buy',
            brand: 'brand',
            name: 'Configuration 1',
            description: 'Description 1',
            version: '1.0',
            enabled: true,
          },
        ],
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.getAll();

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/configuration`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      expect(result).toEqual(
        mockResponseData.docs.map((resultConfiguration) => ({
          id: resultConfiguration.id,
          country_iso: resultConfiguration.country_iso,
          operation_type: resultConfiguration.operation_type,
          brand: resultConfiguration.brand,
          name: resultConfiguration.name,
          description: resultConfiguration.description,
          version: resultConfiguration.version,
          enabled: resultConfiguration.enabled,
        })),
      );
    });

    it('should handle errors and return an empty array', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Mock Error'));

      const result = await service.getAll();

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/configuration`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should fetch configuration by id successfully', async () => {
      const mockId = '1';
      const mockResponseData = {
        id: '1',
        country_iso: 'BR',
        operation_type: 'buy',
        brand: 'brand',
        name: 'Configuration 1',
        description: 'Description 1',
        version: '1.0',
        enabled: true,
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.getById(mockId);

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/configuration/${mockId}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      expect(result).toEqual({
        id: mockResponseData.id,
        country_iso: mockResponseData.country_iso,
        operation_type: mockResponseData.operation_type,
        brand: mockResponseData.brand,
        name: mockResponseData.name,
        description: mockResponseData.description,
        version: mockResponseData.version,
        enabled: mockResponseData.enabled,
      });
    });

    it('should handle missing data and return an empty object', async () => {
      const mockId = '2';

      jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: null,
      });

      const result = await service.getById(mockId);

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/configuration/${mockId}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      expect(result).toEqual({});
    });
  });

  describe('create', () => {
    it('should create a new configuration successfully', async () => {
      const mockNewConfiguration = {
        country_iso: 'BR',
        operation_type: 'buy',
        brand: 'brand',
        name: 'New Configuration',
        description: 'Description of the new configuration',
        enabled: true,
        version: '1.0',
      };

      const mockResponseData = {
        id: '1',
        ...mockNewConfiguration,
      };

      jest.spyOn(axios, 'post').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.create(mockNewConfiguration);

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API}/configuration`,
        mockNewConfiguration,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors and throw an error', async () => {
      const mockNewConfiguration = {
        country_iso: 'BR',
        operation_type: 'buy',
        brand: 'brand',
        name: 'New Configuration',
        description: 'Description of the new configuration',
        enabled: true,
        version: '1.0',
      };

      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Mock Error'));

      await expect(service.create(mockNewConfiguration)).rejects.toThrowError(
        'Mock Error',
      );
    });
  });

  describe('update', () => {
    it('should update a configuration successfully', async () => {
      const mockId = '1';
      const mockUpdateConfiguration = {
        name: 'Updated Configuration',
        description: 'Updated description',
      };

      const mockResponseData = {
        id: mockId,
        country_iso: 'BR',
        operation_type: 'buy',
        brand: 'brand',
        name: mockUpdateConfiguration.name,
        description: mockUpdateConfiguration.description,
        version: '1.0',
        enabled: true,
      };

      jest.spyOn(axios, 'put').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.update(mockId, mockUpdateConfiguration);

      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API}/configuration/${mockId}`,
        mockUpdateConfiguration,
        { headers: { country: 'br', tenant: 'santander' } },
      );

      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors and throw an error', async () => {
      const mockId = '2';
      const mockUpdateConfiguration = {
        name: 'Updated Configuration',
        description: 'Updated description',
      };

      jest.spyOn(axios, 'put').mockRejectedValueOnce(new Error('Mock Error'));

      await expect(
        service.update(mockId, mockUpdateConfiguration),
      ).rejects.toThrowError('Mock Error');
    });
  });
  describe('delete', () => {
    it('should delete a configuration successfully', async () => {
      const mockId = '1';

      jest.spyOn(axios, 'delete').mockResolvedValueOnce({
        data: { id: mockId },
      });

      const result = await service.delete(mockId);

      expect(axios.delete).toHaveBeenCalledWith(
        `${process.env.API}/configuration/${mockId}`,
        { headers: { country: 'br', tenant: 'santander' } },
      );

      expect(result).toEqual({ id: mockId });
    });

    it('should handle errors and throw an error', async () => {
      const mockId = '2';

      jest
        .spyOn(axios, 'delete')
        .mockRejectedValueOnce(new Error('Mock Error'));

      await expect(service.delete(mockId)).rejects.toThrowError('Mock Error');
    });
  });
});
