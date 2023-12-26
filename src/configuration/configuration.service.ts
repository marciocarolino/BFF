import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { FindByIdDTO } from './dto/configuration.dto';
import { UpdateParamsDTO } from './dto/UpdateConfigurationDTO';

import { CreateConfigurationDTO } from './dto/createConfiguration.dto';

@Injectable()
export class ConfigurationService {
  async getAll(): Promise<any> {
    try {
      const response = await axios.get(`${process.env.API}/configuration`, {
        headers: { country: 'br', tenant: 'santander' },
      });

      let result = null;
      if (response?.data.docs) {
        result = response.data.docs.map((resultConfiguration) => {
          return {
            id: resultConfiguration.id,
            country_id: resultConfiguration.country_iso,
            operation_type: resultConfiguration.operation_type,
            brand: resultConfiguration.brand,
            name: resultConfiguration.name,
            description: resultConfiguration.description,
            version: resultConfiguration.version,
            enabled: resultConfiguration.enabled,
          };
        });
      }

      return result;
    } catch (error) {
      return [];
    }
  }

  async getById(id: FindByIdDTO): Promise<any> {
    const response = await this.getAll();

    const configurations = Array.isArray(response.data)
      ? response.data.flat()
      : [];

    const configuration = configurations.filter(
      (config) => config.id === id.id,
    );
    return configuration;
  }

  async create(newConfiguration: CreateConfigurationDTO): Promise<any> {
    try {
      const response = await axios.post(
        `${process.env.API}/configurations`,
        newConfiguration,
        { headers: { country: 'br', tenant: 'santander' } },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(
    params: UpdateParamsDTO,
    updateConfiguration: any,
  ): Promise<any> {
    const response = await axios.put(
      `${process.env.API}/configurations/${params.country}/${params.tenant}/${params.id}`,
      updateConfiguration,
      { headers: { country: 'br', tenant: 'santander' } },
    );

    return response.data;
  }

  async delete(id: string): Promise<any> {
    const response = await axios.delete(
      `${process.env.API}/configurations/${id}`,
      { headers: { country: 'br', tenant: 'santander' } },
    );
    return response.data;
  }
}
