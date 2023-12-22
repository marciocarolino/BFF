import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  configurationMock,
  setConfigurationMockValue,
} from './configuration-mock/configuration-mock';
import { NotFoundException } from '@nestjs/common';
import { CreateConfigurationDTO } from './dto/createConfiguration.dto';

export function setupMock(): MockAdapter {
  const mock = new MockAdapter(axios);

  mock.onGet('/configurations').reply(200, {
    data: [configurationMock],
  });

  mock.onPost('/configurations').reply((config) => {
    const newConfiguration: CreateConfigurationDTO = JSON.parse(config.data);

    // Adicione a lógica para gerar um novo ID
    const newId = Math.random().toString(36).substring(7);
    const createdConfiguration = {
      country_iso: newConfiguration.country_iso,
      operation_type: newConfiguration.operation_type,
      brand: newConfiguration.brand,
      name: newConfiguration.name,
      description: newConfiguration.description || '',
      enabled: newConfiguration.enabled || false,
      version: newConfiguration.version,
      id: newId,
      id_enviroment: '',
      descriptiom: '',
      environment: { id: '', name: '' },
      enum_brand: { id: '', name: '' },
      enum_operation_type: { id: '', name: '' },
      enum_country: { id: '', name: '' },
    };

    configurationMock.push(createdConfiguration);

    return [201, { data: createdConfiguration }];
  });

  mock.onPut(/\/configurations\/\w+/).reply((config) => {
    const id = config.url?.split('/').pop();
    const updateConfiguration = JSON.parse(config.data);

    const existingConfiguration = configurationMock.find(
      (config) => config.id === id,
    );

    if (!existingConfiguration) {
      throw new NotFoundException(`Configuration with ID ${id} not found`);
    }

    existingConfiguration.country_iso = updateConfiguration.country_iso;
    existingConfiguration.operation_type = updateConfiguration.operation_type;
    existingConfiguration.brand = updateConfiguration.brand;
    existingConfiguration.name = updateConfiguration.name;
    existingConfiguration.descriptiom = updateConfiguration.description;
    existingConfiguration.enabled = updateConfiguration.enabled;
    existingConfiguration.version = updateConfiguration.version;

    setConfigurationMockValue(existingConfiguration);

    return [200, { data: configurationMock }];
  });

  return mock;
}
