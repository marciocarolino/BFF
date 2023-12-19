import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from '../configuration.service';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.mock('axios');

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
    it('should return configuration data', async () => {
      const mockFilePath = 'mocked-file-path';
      const mockFileContent = '{"key": "value"}';
      const mockBase64 = Buffer.from(mockFileContent).toString('base64');

      jest.spyOn(fs, 'readFile').mockResolvedValue(mockFileContent);

      jest.spyOn(path, 'join').mockReturnValue(mockFilePath);

      jest.spyOn(axios, 'get').mockResolvedValue({
        data: Buffer.from(mockBase64, 'base64'),
      });

      const result = await service.getAll();

      expect(result).toEqual(JSON.parse(mockFileContent));
    });

    it('should throw an error if reading file fails', async () => {
      const mockError = new Error('File read error');

      jest.spyOn(fs, 'readFile').mockRejectedValue(mockError);

      await expect(service.getAll()).rejects.toThrowError(mockError);
    });

    it('should throw an error if axios.get fails', async () => {
      const mockFilePath = 'mocked-file-path';
      const mockFileContent = '{"key": "value"}';

      jest.spyOn(fs, 'readFile').mockResolvedValue(mockFileContent);

      jest.spyOn(path, 'join').mockReturnValue(mockFilePath);

      const mockAxiosError = new Error('Axios error');
      jest.spyOn(axios, 'get').mockRejectedValue(mockAxiosError);

      await expect(service.getAll()).rejects.toThrowError(mockAxiosError);
    });
  });

  describe('getById', () => {
    it('should return configuration by id', async () => {
      const mockFilePath = 'mocked-file-path';
      const mockFileContent =
        '{"configuration": [{"id": "1", "key": "value"}]}';
      const mockBase64 = Buffer.from(mockFileContent).toString('base64');

      jest.spyOn(fs, 'readFile').mockResolvedValue(mockFileContent);

      jest.spyOn(path, 'join').mockReturnValue(mockFilePath);

      jest.spyOn(axios, 'get').mockResolvedValue({
        data: Buffer.from(mockBase64, 'base64'),
      });

      const result = await service.getById({ id: '1' });

      expect(result).toEqual({ configuration: { id: '1', key: 'value' } });
    });

    it('should throw an error if reading file fails', async () => {
      const mockError = new Error('File read error');

      jest.spyOn(fs, 'readFile').mockRejectedValue(mockError);

      await expect(service.getById({ id: '1' })).rejects.toThrowError(
        mockError,
      );
    });

    it('should throw an error if axios.get fails', async () => {
      const mockFilePath = 'mocked-file-path';
      const mockFileContent =
        '{"configuration": [{"id": "1", "key": "value"}]}';

      jest.spyOn(fs, 'readFile').mockResolvedValue(mockFileContent);

      jest.spyOn(path, 'join').mockReturnValue(mockFilePath);

      const mockAxiosError = new Error('Axios error');
      jest.spyOn(axios, 'get').mockRejectedValue(mockAxiosError);

      await expect(service.getById({ id: '1' })).rejects.toThrowError(
        mockAxiosError,
      );
    });
  });
});
