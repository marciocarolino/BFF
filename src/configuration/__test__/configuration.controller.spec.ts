import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationController } from '../configuration.controller';
import { ConfigurationService } from '../configuration.service';
import { UpdateConfigurationDTO } from '../dto/UpdateConfigurationDTO';
import { NotFoundException } from '@nestjs/common';
import { CreateConfigurationDTO } from '../dto/createConfiguration.dto';

describe('ConfigurationController', () => {
  let controller: ConfigurationController;
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationController],
      providers: [ConfigurationService],
    }).compile();

    controller = module.get<ConfigurationController>(ConfigurationController);
    service = module.get<ConfigurationService>(ConfigurationService);
  });

  describe('getAll', () => {
    it('should return all configurations', async () => {
      const result = [
        {
          /* mock configuration data */
        },
      ];
      jest.spyOn(service, 'getAll').mockResolvedValue(result);

      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('getById', () => {
    it('should return a configuration by ID', async () => {
      const result = {
        id: 'cd5fa417-b667-482d-b208-798d9da3213z',
        country_id: 'string',
        operation_type: 'string',
        brand: 'string',
        name: 'string',
        description: 'string',
        version: 'string',
        enabled: true,
      };
      jest.spyOn(service, 'getById').mockResolvedValue(result);

      const id = '1';

      expect(await controller.getById(id)).toBe(result);
    });

    it('should throw NotFoundException for non-existing ID', async () => {
      const id = 'non-existing-id';
      jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getById(id)).rejects.toThrow(NotFoundException);
    });

    it('should handle the case when there is no data in the response', async () => {
      const id = '2';
      jest.spyOn(service, 'getById').mockResolvedValue({});

      const result = await controller.getById(id);

      expect(result).toEqual({});
    });
  });

  describe('create', () => {
    it('should create a new configuration', async () => {
      const newConfiguration: CreateConfigurationDTO = {
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
      const result = {
        /* mock created configuration data */
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(newConfiguration)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a configuration', async () => {
      const updateConfiguration: UpdateConfigurationDTO = {
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
      const result = {
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
      jest.spyOn(service, 'update').mockResolvedValue(result);

      const id = '1';

      expect(await controller.update(id, updateConfiguration)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a configuration by ID', async () => {
      const id = '1';
      const result = {
        /* mock deleted configuration data */
      };
      jest.spyOn(service, 'delete').mockResolvedValue(result);

      expect(await controller.delete(id)).toBe(result);
    });
  });
});
