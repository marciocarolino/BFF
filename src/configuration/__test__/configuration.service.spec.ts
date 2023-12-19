import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configuration.service';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return configuration when file is read successfully', async () => {
      const mockFileContent = '{"key": "value"}';
      (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

      const result = await service.getAll();

      expect(result).toEqual({ key: 'value' });
    });

    it('should throw an error when file read fails', async () => {
      const mockError = new Error('File read error');
      (fs.readFile as jest.Mock).mockRejectedValue(mockError);

      await expect(service.getAll()).rejects.toThrow(
        'Não foi possível ler as configurações',
      );
    });
  });

  describe('getById', () => {
    it('should return configuration by id if it exists', async () => {
      const mockConfigurations = {
        configuration: [
          { id: '1', name: 'Config1' },
          { id: '2', name: 'Config2' },
        ],
      };

      jest.spyOn(service, 'getAll').mockResolvedValue(mockConfigurations);

      const result = await service.getById({ id: '2' });

      expect(result).toEqual({ id: '2', name: 'Config2' });
    });

    it('should return null if configuration with the given id does not exist', async () => {
      const mockConfigurations = {
        configuration: [
          { id: '1', name: 'Config1' },
          { id: '2', name: 'Config2' },
        ],
      };

      jest.spyOn(service, 'getAll').mockResolvedValue(mockConfigurations);

      const result = await service.getById({ id: '3' });

      expect(result).toBeNull();
    });
  });
});
