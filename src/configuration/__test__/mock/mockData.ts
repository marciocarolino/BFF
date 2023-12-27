import { UpdateConfigurationDTO } from '../../dto/updateConfiguration.dto';

export const mockConfigurations = {
  configuration: [
    { id: '1', name: 'Config1' },
    { id: '2', name: 'Config2' },
  ],
};

export const mockNewConfiguration = {
  country_iso: 1,
  operation_type: 1,
  brand: 1,
  name: 'New Configuration',
  description: 'New Description',
  enabled: true,
  version: '1.0',
};

export const mockUpdateConfiguration: UpdateConfigurationDTO = {
  country_iso: 1,
  operation_type: 1,
  brand: 1,
  name: 'Novo Nome',
  description: 'Nova Descrição',
  enabled: true,
  version: 'Versão 2.0',
};
