import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

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
            country_iso: resultConfiguration.country_iso,
            operation_type: resultConfiguration.operation_type,
            brand: resultConfiguration.brand,
            name: resultConfiguration.name,
            description: resultConfiguration.description,
            version: resultConfiguration.version,
            mti: resultConfiguration.mti,
            enabled: resultConfiguration.enabled,
          };
        });
      }

      return result;
    } catch (error) {
      return [];
    }
  }

  async getById(id: string): Promise<any> {
    const response = await axios.get(`${process.env.API}/configuration/${id}`, {
      headers: { country: 'br', tenant: 'santander' },
    });
    if (response?.data) {
      const resultConfiguration = response.data;
      return {
        id: resultConfiguration.id,
        country_iso: resultConfiguration.country_iso,
        operation_type: resultConfiguration.operation_type,
        brand: resultConfiguration.brand,
        name: resultConfiguration.name,
        description: resultConfiguration.description,
        version: resultConfiguration.version,
        mti: resultConfiguration.mti,
        enabled: resultConfiguration.enabled,
      };
    }
    return {};
  }

  async create(newConfiguration: CreateConfigurationDTO): Promise<any> {
    try {
      const response = await axios.post(
        `${process.env.API}/configuration`,
        newConfiguration,
        { headers: { country: 'br', tenant: 'santander' } },
      );
      return response.data;
    } catch ({ response }) {
      throw new HttpException(response.data?.message, response?.status);
    }
  }

  async update(id: string, updateConfiguration: any): Promise<any> {
    try {
      const response = await axios.put(
        `${process.env.API}/configuration/${id}`,
        updateConfiguration,
        { headers: { country: 'br', tenant: 'santander' } },
      );
      return response.data;
    } catch ({ response }) {
      throw new HttpException(response.data?.message, response?.status);
    }
  }

  async delete(id: string): Promise<any> {
    console.log({ id });
    try {
      const response = await axios.delete(
        `${process.env.API}/configuration/${id}`,
        { headers: { country: 'br', tenant: 'santander' } },
      );

      return response.data;
    } catch ({ response }) {
      throw new HttpException(response.data?.message, response?.status);
    }
  }
}
