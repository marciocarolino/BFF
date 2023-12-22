import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  configurationMock,
  setConfigurationMockValue,
} from './configuration-mock/configuration-mock';
import { NotFoundException } from '@nestjs/common';

export function setupMock(): MockAdapter {
  const mock = new MockAdapter(axios);

  mock.onGet('/configurations').reply(200, {
    data: [configurationMock],
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
