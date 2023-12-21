import { Injectable } from '@nestjs/common';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { FindByIdDTO } from './dto/configuration.dto';
import { OptionalParamsDto } from './dto/optional-params.dto';
import { configurationMock } from './configuration-mock/configuration-mock';
import { buildRequestData } from '../infrastructure/http/configuration/requestDataBuilder';
import { UpdateParamsDTO } from './dto/UpdateConfigurationDTO';

import { setupMock } from './mockService';

@Injectable()
export class ConfigurationService {
  private readonly mock: MockAdapter;
  private isMockSetup = false;

  constructor() {
    this.mock = new MockAdapter(axios);
  }

  private setupMock() {
    setupMock();
  }

  private getConfigurationById(id: string): any | null {
    return configurationMock.find((config) => config.id === id) || null;
  }

  async getAll(filters?: OptionalParamsDto): Promise<any> {
    if (!this.isMockSetup) {
      this.setupMock();
      this.isMockSetup = true;
    }
    const requestData = buildRequestData(filters);
    const response = await axios({
      method: 'get',
      url: '/configurations',
      data: requestData,
    });

    return response.config.data !== '{}' ? response.data : [];
  }

  async getById(id: FindByIdDTO): Promise<any> {
    if (!this.isMockSetup) {
      this.setupMock();
      this.isMockSetup = true;
    }
    const response = await this.getAll();

    const configurations = Array.isArray(response.data)
      ? response.data.flat()
      : [];

    const configuration = configurations.filter(
      (config) => config.id === id.id,
    );
    return configuration || [];
  }

  async update(
    params: UpdateParamsDTO,
    updateConfiguration: any,
  ): Promise<any> {
    if (!this.isMockSetup) {
      this.setupMock();
      this.isMockSetup = true;
    }
    const response = await axios.put(
      `/configurations/${params.country}/${params.tenant}/${params.id}`,
      updateConfiguration,
    );

    return response.data;
  }
}
