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
        id: '1',
        id_configuration: '2',
        name: 'name',
        description: 'description',
        path_json_in: 'path_json_in',
        rules_json: 'rules_json',
        data_element_type: 'data_element_type',
        data_element_length: 'data_element_length',
        data_element_fill_pad: 'data_element_fill_pad',
        data_element_fill_value: 'data_element_fill_value',
        position_iso: 'position_iso',
        enabled_bitmap: 'enabled_bitmap',
        active: true,
      };

      const mockResponse = {
        id: '1',
        id_configuration: '2',
        name: 'name',
        description: 'description',
        path_json_in: 'path_json_in',
        rules_json: 'rules_json',
        data_element_type: 'data_element_type',
        data_element_length: 'data_element_length',
        data_element_fill_pad: 'data_element_fill_pad',
        data_element_fill_value: 'data_element_fill_value',
        position_iso: 'position_iso',
        enabled_bitmap: 'enabled_bitmap',
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
        id: '1',
        id_configuration: '2',
        name: 'name',
        description: 'description',
        path_json_in: 'path_json_in',
        rules_json: 'rules_json',
        data_element_type: 'data_element_type',
        data_element_length: 'data_element_length',
        data_element_fill_pad: 'data_element_fill_pad',
        data_element_fill_value: 'data_element_fill_value',
        position_iso: 'position_iso',
        enabled_bitmap: 'enabled_bitmap',
        active: true,
      };

      const mockResponse = {
        id: '1',
        id_configuration: '2',
        name: 'name',
        description: 'description',
        path_json_in: 'path_json_in',
        rules_json: 'rules_json',
        data_element_type: 'data_element_type',
        data_element_length: 'data_element_length',
        data_element_fill_pad: 'data_element_fill_pad',
        data_element_fill_value: 'data_element_fill_value',
        position_iso: 'position_iso',
        enabled_bitmap: 'enabled_bitmap',
        active: true,
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
