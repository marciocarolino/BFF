import { UpdateConfigurationDTO } from 'src/configuration/dto/UpdateConfigurationDTO';
import { CreateConfigurationDTO } from 'src/configuration/dto/createConfiguration.dto';

export const mockConfigurations = {
  configuration: [
    { id: '1', name: 'Config1' },
    { id: '2', name: 'Config2' },
  ],
};

export const mockNewConfiguration: CreateConfigurationDTO = {
  id: '1',
  country_iso: 'BR',
  operation_type: '1',
  brand: 'brand',
  name: 'ISO 8583 93 - Brazil AMEX Athorization',
  description: 'ISO 8583 93 - Brazil AMEX Athorization',
  version: 'Version 1.0',
  mti: 'mti',
  enabled: true,
};

export const mockUpdateConfiguration: UpdateConfigurationDTO = {
  id: 'string',
  country_iso: 'string',
  operation_type: 'string',
  brand: 'string',
  name: 'string',
  description: 'string',
  version: 'string',
  mti: 'string',
  enabled: true,
};

export const mockResponse = {
  data: {
    docs: [
      {
        id: 1,
        country_iso: 'BR',
        operation_type: 'OPERATION',
        brand: 'SANTANDER',
        name: 'Configuration 1',
        description: 'Description 1',
        version: '1.0',
        enabled: true,
      },
      {
        id: 2,
        country_iso: 'US',
        operation_type: 'OPERATION',
        brand: 'CHASE',
        name: 'Configuration 2',
        description: 'Description 2',
        version: '2.0',
        enabled: false,
      },
    ],
  },
};
