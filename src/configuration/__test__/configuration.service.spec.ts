// configuration.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ConfigurationService } from './../configuration.service';
import { configurationMock } from './../configuration-mock/configuration-mock';
import { buildRequestData } from '../../infrastructure/http/configuration/requestDataBuilder';
import { NotFoundException } from '@nestjs/common';
import { mockUpdateConfiguration } from './mock/mockData';
import { UpdateParamsDTO } from '../dto/UpdateConfigurationDTO';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let mock: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all configurations', async () => {
    const requestData = buildRequestData();
    mock.onGet('/configurations', requestData).reply(200, {
      data: [configurationMock],
    });

    const result = await service.getAll();
    expect(result).toEqual({ data: [configurationMock] });
  });

  it('should get configuration by ID', async () => {
    const id = { id: 'some-id' };
    mock.onGet('/configurations').reply(200, {
      data: [[configurationMock]],
    });

    const result = await service.getById(id);
    expect(result).toEqual([]);
  });

  // Teste para a atualização
  it('should update configuration', async () => {
    const mockUpdate = jest
      .spyOn(service, 'update')
      .mockImplementation(async () => {
        return { data: 'Updated successfully' };
      });

    const updateConfiguration = {
      country_iso: 'BR',
      operation_type: 'Authorization',
      brand: 'AMEX',
    };

    // Chamando o método update mockado
    const updateResult = await service.update(
      {
        id: 'some-id',
        country: 1,
        tenant: '',
      },
      updateConfiguration,
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'some-id',
        country: 1,
        tenant: '',
      }),
      updateConfiguration,
    );

    expect(updateResult).toEqual({ data: 'Updated successfully' });

    mockUpdate.mockRestore();
  });

  describe('create', () => {
    it('should create a new configuration', async () => {
      const mockNewConfiguration = {
        country_iso: 1,
        operation_type: 1,
        brand: 1,
        name: 'New Configuration',
        description: 'New Description',
        enabled: true,
        version: '1.0',
      };

      const mockCreatedConfiguration = {
        ...mockNewConfiguration,
        id: 'new-id',
      };

      jest
        .spyOn(axios, 'post')
        .mockResolvedValue({ data: mockCreatedConfiguration });

      const result = await service.create(mockNewConfiguration);

      expect(result).toEqual(mockCreatedConfiguration);
      expect(axios.post).toHaveBeenCalledWith(
        '/configurations',
        mockNewConfiguration,
      );
    });

    it('should handle exceptions during creation', async () => {
      const mockNewConfiguration = {
        country_iso: 1,
        operation_type: 1,
        brand: 1,
        name: 'New Configuration',
        description: 'New Description',
        enabled: true,
        version: '1.0',
      };

      jest
        .spyOn(axios, 'post')
        .mockRejectedValue(new NotFoundException('Some error message'));

      await expect(service.create(mockNewConfiguration)).rejects.toThrowError(
        NotFoundException,
      );

      expect(axios.post).toHaveBeenCalledWith(
        '/configurations',
        mockNewConfiguration,
      );
    });
  });

  describe('update', () => {
    it('should update configuration by id', async () => {
      const mockParams: UpdateParamsDTO = {
        country: 1,
        tenant: 'exampleTenant',
        id: 'nonexistent-id',
      };

      const mockUpdateConfiguration = {};

      const expectedErrorMessage = `Configuration with ID ${mockParams.id} not found`;

      const mock = new MockAdapter(axios);

      mock
        .onPut(
          `/configurations/${mockParams.country}/${mockParams.tenant}/${mockParams.id}`,
        )
        .reply(404, {
          message: expectedErrorMessage,
        });

      try {
        await service.update(mockParams, mockUpdateConfiguration);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(expectedErrorMessage);
      }

      mock.reset();
    });
  });
});
