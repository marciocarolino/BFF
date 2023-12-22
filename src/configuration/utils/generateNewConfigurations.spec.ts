import { generateNewConfiguration } from './generateNewConfiguration';

describe('generateNewConfiguration', () => {
  it('should generate a new configuration with a random ID', () => {
    // Arrange
    const newConfiguration = {
      country_iso: 1,
      operation_type: 2,
      brand: 3,
      name: 'Test Configuration',
      description: 'This is a test configuration',
      enabled: true,
      version: '1.0',
    };

    // Act
    const result = generateNewConfiguration(newConfiguration);

    // Assert
    expect(result.country_iso).toEqual(newConfiguration.country_iso);
    expect(result.operation_type).toEqual(newConfiguration.operation_type);
    expect(result.brand).toEqual(newConfiguration.brand);
    expect(result.name).toEqual(newConfiguration.name);
    expect(result.description).toEqual(newConfiguration.description);
    expect(result.enabled).toEqual(newConfiguration.enabled);
    expect(result.version).toEqual(newConfiguration.version);

    // Ensure that an ID is generated (not a strict check, as it's random)
    expect(result.id).toBeDefined();
  });
});
