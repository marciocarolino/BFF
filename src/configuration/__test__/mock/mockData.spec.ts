// mockData.spec.ts
import { mockConfigurations } from './mockData';

describe('mockConfigurations object', () => {
  it('should have a configuration property', () => {
    // Assert
    expect(mockConfigurations).toHaveProperty('configuration');
  });

  it('should have an array of configurations', () => {
    // Assert
    expect(Array.isArray(mockConfigurations.configuration)).toBe(true);
  });

  it('should have configurations with correct properties', () => {
    // Assert
    expect(mockConfigurations.configuration).toEqual([
      { id: '1', name: 'Config1' },
      { id: '2', name: 'Config2' },
    ]);
  });

  it('should have configurations with correct types', () => {
    // Assert
    expect(typeof mockConfigurations.configuration[0].id).toBe('string');
    expect(typeof mockConfigurations.configuration[0].name).toBe('string');
  });

  // Adicione mais testes conforme necessário para cobrir outros cenários
});
