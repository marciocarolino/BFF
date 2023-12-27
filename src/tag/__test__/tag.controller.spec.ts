import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from '../tag.controller';
import { TagService } from '../tag.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call tagService.getAll with the correct parameters', async () => {
      const mockConfigurationId = 'mockConfigurationId';
      const mockServiceResult = {};

      // Mocking the service method
      jest.spyOn(service, 'getAll').mockResolvedValueOnce(mockServiceResult);

      const result = await controller.getAll(mockConfigurationId);

      expect(service.getAll).toHaveBeenCalledWith(mockConfigurationId);
      expect(result).toEqual(mockServiceResult);
    });
  });

  describe('getById', () => {
    it('should call tagService.getById with the correct parameters', async () => {
      const mockId = 'mockId';
      const mockServiceResult = {};

      // Mocking the service method
      jest.spyOn(service, 'getById').mockResolvedValueOnce(mockServiceResult);

      const result = await controller.getById(mockId);

      expect(service.getById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockServiceResult);
    });
  });

  describe('create', () => {
    it('should call tagService.create with the correct parameters', async () => {
      const mockCreateTagDto: CreateTagDto = {
        id_configuration: '123',
        name: 'name',
        description: 'description',
        path_in: 'path_in',
        path_out: 'path_out',
        type_tag: 'type_tag',
        variable_data: 'variable_data',
        position_iso: 123,
        size: 123,
        active: true,
      };
      const mockServiceResult = {};

      // Mocking the service method
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockServiceResult);

      const result = await controller.create(mockCreateTagDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateTagDto);
      expect(result).toEqual(mockServiceResult);
    });
  });

  describe('update', () => {
    it('should call tagService.update with the correct parameters', async () => {
      const mockId = 'mockId';
      const mockUpdateTagDto: UpdateTagDto = {
        id_configuration: '123',
        name: 'name',
        description: 'description',
        path_in: 'path_in',
        path_out: 'path_out',
        type_tag: 'type_tag',
        variable_data: 'variable_data',
        position_iso: 123,
        size: 123,
        active: true,
      };
      const mockServiceResult = {};

      // Mocking the service method
      jest.spyOn(service, 'update').mockResolvedValueOnce(mockServiceResult);

      const result = await controller.update(mockId, mockUpdateTagDto);

      expect(service.update).toHaveBeenCalledWith(mockId, mockUpdateTagDto);
      expect(result).toEqual(mockServiceResult);
    });
  });

  describe('delete', () => {
    it('should call tagService.delete with the correct parameters', async () => {
      const mockId = 'mockId';
      const mockServiceResult = {};

      // Mocking the service method
      jest.spyOn(service, 'delete').mockResolvedValueOnce(mockServiceResult);

      const result = await controller.delete(mockId);

      expect(service.delete).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockServiceResult);
    });
  });
});
