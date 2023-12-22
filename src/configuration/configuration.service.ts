import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { FindByIdDTO } from './dto/configuration.dto';
import { OptionalParamsDto } from './dto/optional-params.dto';
import { buildRequestData } from '../infrastructure/http/configuration/requestDataBuilder';
import { UpdateParamsDTO } from './dto/UpdateConfigurationDTO';

import { setupMock } from './mockService';
import { configureMockIfNotSetup } from './mockSetup';
import { CreateConfigurationDTO } from './dto/createConfiguration.dto';

@Injectable()
export class ConfigurationService {
  private isMockSetup = false;

  private setupMock() {
    setupMock();
    this.isMockSetup = configureMockIfNotSetup(this.isMockSetup);
  }

  async getAll(filters?: OptionalParamsDto): Promise<any> {
    this.setupMock();
    const requestData = buildRequestData(filters);
    const response = await axios({
      method: 'get',
      url: '/configurations',
      data: requestData,
    });

    return response.config.data !== '{}' ? response.data : [];
  }

  async getById(id: FindByIdDTO): Promise<any> {
    this.setupMock();
    const response = await this.getAll();

    const configurations = Array.isArray(response.data)
      ? response.data.flat()
      : [];

    const configuration = configurations.filter(
      (config) => config.id === id.id,
    );
    return configuration || [];
  }

  async create(newConfiguration: CreateConfigurationDTO): Promise<any> {
    this.setupMock();

    try {
      const response = await axios.post('/configurations', newConfiguration);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(
    params: UpdateParamsDTO,
    updateConfiguration: any,
  ): Promise<any> {
    this.setupMock();
    const response = await axios.put(
      `/configurations/${params.country}/${params.tenant}/${params.id}`,
      updateConfiguration,
    );

    return response.data;
  }

  async delete(id: string): Promise<any> {
    this.setupMock();

    const response = await axios.delete(`/configurations/${id}`);

    return response.data;
  }
}
