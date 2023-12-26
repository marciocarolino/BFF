import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationController } from '../configuration.controller';
import { ConfigurationService } from '../configuration.service';
import {
  UpdateConfigurationDTO,
  UpdateParamsDTO,
} from '../dto/UpdateConfigurationDTO';
import { FindByIdDTO } from '../dto/configuration.dto';
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
      const id: FindByIdDTO = { id: 'cd5fa417-b667-482d-b208-798d9da3213z' };
      const result = {
        /* mock configuration data */
      };
      jest.spyOn(service, 'getById').mockResolvedValue(result);

      expect(await controller.getById(id)).toBe(result);
    });

    it('should throw NotFoundException for non-existing ID', async () => {
      const id: FindByIdDTO = { id: 'non-existing-id' };
      jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new configuration', async () => {
      const newConfiguration: CreateConfigurationDTO = {
        country_iso: 0,
        operation_type: 0,
        brand: 0,
        name: '',
        description: '',
        enabled: false,
        version: '',
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
      const params: UpdateParamsDTO = {
        country: 'br',
        tenant: 'santander',
        id: '1',
      };
      const updateConfiguration: UpdateConfigurationDTO = {
        country_iso: 0,
        operation_type: 0,
        brand: 0,
        name: '',
        description: '',
        enabled: false,
        version: '',
      };
      const result = {
        /* mock updated configuration data */
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(params, updateConfiguration)).toBe(result);
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
