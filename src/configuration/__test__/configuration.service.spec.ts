// configuration.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ConfigurationService } from './../configuration.service';
import { configurationMock } from './../configuration-mock/configuration-mock';
import { buildRequestData } from '../../infrastructure/http/configuration/requestDataBuilder';

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
        country: '',
        tenant: '',
      },
      updateConfiguration,
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'some-id',
        country: '',
        tenant: '',
      }),
      updateConfiguration,
    );

    expect(updateResult).toEqual({ data: 'Updated successfully' });

    mockUpdate.mockRestore();
  });
});
