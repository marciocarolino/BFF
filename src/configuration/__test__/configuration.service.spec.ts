import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configuration.service';
import axios from 'axios';
import { mockNewConfiguration, mockResponse } from './mock/mockData';

jest.mock('axios');

describe('ConfigurationService', () => {
  let configurationService: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService],
    }).compile();

    configurationService =
      module.get<ConfigurationService>(ConfigurationService);
  });

  it('should get all configurations', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await configurationService.getAll();

    expect(result).toEqual([
      {
        id: 1,
        country_iso: 'BR',
        operation_type: 'OPERATION',
        brand: 'SANTANDER',
        name: 'Configuration 1',
        description: 'Description 1',
        version: '1.0',
        enabled: true,
      },
      {
        id: 2,
        country_iso: 'US',
        operation_type: 'OPERATION',
        brand: 'CHASE',
        name: 'Configuration 2',
        description: 'Description 2',
        version: '2.0',
        enabled: false,
      },
    ]);

    expect(axios.get).toHaveBeenCalledWith(`${process.env.API}/configuration`, {
      headers: { country: 'br', tenant: 'santander' },
    });
  });

  it('should return an empty array if getting configurations fails', async () => {
    const mockError = new Error('Mocked error');

    (axios.get as jest.Mock).mockRejectedValue(mockError);

    const result = await configurationService.getAll();

    expect(result).toEqual([]);

    expect(axios.get).toHaveBeenCalledWith(`${process.env.API}/configuration`, {
      headers: { country: 'br', tenant: 'santander' },
    });
  });

  it('should get configuration by id', async () => {
    const mockId = '1';

    (axios.get as jest.Mock).mockResolvedValue({ data: mockNewConfiguration });

    const result = await configurationService.getById(mockId);

    expect(result).toEqual({
      brand: 'brand',
      country_iso: 'BR',
      description: 'ISO 8583 93 - Brazil AMEX Athorization',
      enabled: true,
      id: '1',
      name: 'ISO 8583 93 - Brazil AMEX Athorization',
      operation_type: '1',
      version: 'Version 1.0',
      mti: 'mti',
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.API}/configuration/${mockId}`,
      {
        headers: { country: 'br', tenant: 'santander' },
      },
    );
  });

  it('should return an empty object when data is not available', async () => {
    // Configurar o mock do axios para retornar uma resposta sem dados
    const mockId = '2';
    const mockResponse = {};
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await configurationService.getById(mockId);

    expect(result).toEqual({});

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.API}/configuration/${mockId}`,
      {
        headers: { country: 'br', tenant: 'santander' },
      },
    );
  });

  it('should create a new configuration', async () => {
    const mockResponse = {
      data: {},
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await configurationService.create(mockNewConfiguration);

    expect(result).toEqual(mockResponse.data);

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API}/configuration`,
      mockNewConfiguration,
      { headers: { country: 'br', tenant: 'santander' } },
    );
  });

  it('should throw an error if the configuration creation fails', async () => {
    const mockError = {
      response: { data: { message: 'Error message' }, status: 500 },
    };
    (axios.post as jest.Mock).mockRejectedValue(mockError);

    await expect(
      configurationService.create(mockNewConfiguration),
    ).rejects.toThrowError('Error message');

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API}/configuration`,
      mockNewConfiguration,
      { headers: { country: 'br', tenant: 'santander' } },
    );
  });

  it('should update an existing configuration', async () => {
    const mockId = '123';
    const mockUpdateConfiguration = {};

    const mockResponse = {
      data: {},
    };
    (axios.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await configurationService.update(
      mockId,
      mockUpdateConfiguration,
    );

    expect(result).toEqual(mockResponse.data);

    expect(axios.put).toHaveBeenCalledWith(
      `${process.env.API}/configuration/${mockId}`,
      mockUpdateConfiguration,
      { headers: { country: 'br', tenant: 'santander' } },
    );
  });

  it('should throw an error if the configuration update fails', async () => {
    const mockId = '123';
    const mockUpdateConfiguration = {};

    const mockError = {
      response: { data: { message: 'Error message' }, status: 500 },
    };
    (axios.put as jest.Mock).mockRejectedValue(mockError);

    await expect(
      configurationService.update(mockId, mockUpdateConfiguration),
    ).rejects.toThrowError('Error message');

    expect(axios.put).toHaveBeenCalledWith(
      `${process.env.API}/configuration/${mockId}`,
      mockUpdateConfiguration,
      { headers: { country: 'br', tenant: 'santander' } },
    );
  });

  it('should delete an existing configuration', async () => {
    const mockId = '123';

    const mockResponse = {
      data: {},
    };
    (axios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await configurationService.delete(mockId);

    expect(result).toEqual(mockResponse.data);

    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.API}/configuration/${mockId}`,
      { headers: { country: 'br', tenant: 'santander' } },
    );
  });

  it('should throw an error if the configuration deletion fails', async () => {
    const mockId = '123';

    const mockError = {
      response: { data: { message: 'Error message' }, status: 500 },
    };
    (axios.delete as jest.Mock).mockRejectedValue(mockError);

    await expect(configurationService.delete(mockId)).rejects.toThrowError(
      'Error message',
    );

    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.API}/configuration/${mockId}`,
      { headers: { country: 'br', tenant: 'santander' } },
    );
  });
});
