import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from '../tag.controller';
import { TagService } from '../tag.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';

describe('TagController', () => {
  let controller: TagController;
  let tagService: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService], // Certifique-se de adicionar seus serviços aqui, se necessário
    }).compile();

    controller = module.get<TagController>(TagController);
    tagService = module.get<TagService>(TagService);
  });

  describe('getAll', () => {
    it('should return an array of tags', async () => {
      const mockTags = ['tag1', 'tag2'];

      jest.spyOn(tagService, 'getAll').mockResolvedValue(mockTags);

      const result = await controller.getAll('someId');

      expect(result).toEqual(mockTags);
    });
  });

  describe('getById', () => {
    it('should return a tag by id', async () => {
      const mockTag = { id: 'someId', name: 'tagName' };

      jest.spyOn(tagService, 'getById').mockResolvedValue(mockTag);

      const result = await controller.getById('someId');

      expect(result).toEqual(mockTag);
    });
  });

  describe('create', () => {
    it('should create a new tag', async () => {
      const mockNewTag: CreateTagDto = {
        id_configuration: '123',
        name: 'tagName',
        description: 'tagDescription',
        path_in: 'tagPathIn',
        path_out: 'tagPathOut',
        type_tag: 'tagType',
        variable_data: 'tagVariableData',
        position_iso: 123,
        size: 456,
        active: true,
      };

      const mockResponse = {
        id_configuration: '123',
        name: 'tagName',
        description: 'tagDescription',
        path_in: 'tagPathIn',
        path_out: 'tagPathOut',
        type_tag: 'tagType',
        variable_data: 'tagVariableData',
        position_iso: 123,
        size: 456,
        active: true,
      };

      jest.spyOn(tagService, 'create').mockResolvedValue(mockResponse);

      const result = await controller.create(mockNewTag);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update a tag by id', async () => {
      const mockUpdateTag: UpdateTagDto = {
        id_configuration: '123',
        name: 'updatedName',
        description: 'updatedDescription',
        path_in: 'updatedPathIn',
        path_out: 'updatedPathOut',
        type_tag: 'updatedTypeTag',
        variable_data: 'updatedVariableData',
        position_iso: 456,
        size: 456,
        active: false,
      };

      const mockResponse = {
        id_configuration: '123',
        name: 'updatedName',
        description: 'updatedDescription',
        path_in: 'updatedPathIn',
        path_out: 'updatedPathOut',
        type_tag: 'updatedTypeTag',
        variable_data: 'updatedVariableData',
        position_iso: 456,
        size: 456,
        active: false,
      };

      jest.spyOn(tagService, 'update').mockResolvedValue(mockResponse);

      const result = await controller.update('someId', mockUpdateTag);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete a tag by id', async () => {
      const mockResponse = {
        id_configuration: '123',
        name: 'updatedName',
        description: 'updatedDescription',
        path_in: 'updatedPathIn',
        path_out: 'updatedPathOut',
        type_tag: 'updatedTypeTag',
        variable_data: 'updatedVariableData',
        position_iso: 456,
        size: 456,
        active: false,
      };

      jest.spyOn(tagService, 'delete').mockResolvedValue(mockResponse);

      const result = await controller.delete('someId');

      expect(result).toEqual(mockResponse);
    });
  });
});
