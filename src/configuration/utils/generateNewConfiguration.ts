import { CreateConfigurationDTO } from '../dto/createConfiguration.dto';

export function generateNewConfiguration(
  newConfiguration: CreateConfigurationDTO,
): any {
  const newId = Math.random().toString(36).substring(7);
  return {
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
}
