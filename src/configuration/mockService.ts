import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  configurationMock,
  setConfigurationMockValue,
} from './configuration-mock/configuration-mock';
import { NotFoundException } from '@nestjs/common';
import { CreateConfigurationDTO } from './dto/createConfiguration.dto';
import { generateNewConfiguration } from './utils/generateNewConfiguration';

export function setupMock(): MockAdapter {
  const mock = new MockAdapter(axios);

  mock.onGet('/configurations').reply(200, {
    data: [configurationMock],
  });

  mock.onPost('/configurations').reply((config) => {
    const newConfiguration: CreateConfigurationDTO = JSON.parse(config.data);
    const createdConfiguration = generateNewConfiguration(newConfiguration);

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

  mock.onDelete(/\/configurations\/\w+/).reply((config) => {
    const id = config.url?.split('/').pop();

    const existingConfigurationIndex = configurationMock.findIndex(
      (config) => config.id === id,
    );

    if (existingConfigurationIndex === -1) {
      throw new NotFoundException(`Configuration with ID ${id} not found`);
    }

    // Remove a configuração do array
    const deletedConfiguration = configurationMock.splice(
      existingConfigurationIndex,
      1,
    );

    return [204, {}]; // 204 significa "No Content", indicando sucesso na exclusão
  });

  return mock;
}
