import { Injectable } from '@nestjs/common';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { FindByIdDTO } from './dto/configuration.dto';
import { OptionalParamsDto } from './dto/optional-params.dto';
import { configurationMock } from './configuration-mock/configuration-mock';
import { buildRequestData } from 'src/infrastructure/http/requestDataBuilder';

@Injectable()
export class ConfigurationService {
  private readonly mock: MockAdapter;

  constructor() {
    this.mock = new MockAdapter(axios);
    this.setupMock();
  }

  private setupMock() {
    this.mock.onGet('/configurations').reply(200, {
      data: [configurationMock],
    });
  }

  async getAll(filters?: OptionalParamsDto): Promise<any> {
    const requestData = buildRequestData(filters);
    const response = await axios({
      method: 'get',
      url: '/configurations',
      data: requestData,
    });

    return response.config.data !== '{}' ? response.data : [];
  }

  async getById(id: FindByIdDTO): Promise<any> {
    const configurations = await this.getAll();

    const configuration = configurations.data?.find(
      (config) => config.id === id.id,
    );

    return configuration || [];
  }
}
