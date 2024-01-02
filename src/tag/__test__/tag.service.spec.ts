import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from '../tag.service';
import axios from 'axios';

jest.mock('axios');

describe('TagService', () => {
  let tagService: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService],
    }).compile();

    tagService = module.get<TagService>(TagService);
  });

  it('should return an array of tags', async () => {
    const mockResponse = {
      data: {
        docs: [
          {
            id: 1,
            process_type: 'example',
          },
          {
            id: 2,
            process_type: 'example2',
          },
        ],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await tagService.getAll('someId');

    expect(result).toEqual([
      {
        id: 1,
        process_type: 'example',
      },
      {
        id: 2,
        process_type: 'example2',
      },
    ]);
  });

  it('should return a tag by id', async () => {
    const mockResponse = {
      data: {
        id: 1,
        process_type: 'example',
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await tagService.getById('someId');

    expect(result).toEqual({
      id: 1,
      process_type: 'example',
    });
  });

  it('should handle empty response and return an empty object', async () => {
    (axios.get as jest.Mock).mockResolvedValue({});

    const result = await tagService.getById('someId');

    expect(result).toEqual({});
  });

  it('should handle errors and return an empty object', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Mocked error'));

    const result = await tagService.getById('someId');

    expect(result).toEqual([]);
  });

  it('should create a new tag', async () => {
    const mockNewTag = {
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

    const mockResponse = {
      data: {
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
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await tagService.create(mockNewTag);

    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors during tag creation', async () => {
    const mockNewTag = {
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

    (axios.post as jest.Mock).mockRejectedValue(new Error('Mocked error'));

    await expect(tagService.create(mockNewTag)).rejects.toThrowError(
      'Mocked error',
    );
  });

  it('should update a tag by id', async () => {
    const mockUpdateTag = {
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
      data: {
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
      },
    };

    (axios.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await tagService.update('someId', mockUpdateTag);

    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors during tag update', async () => {
    const mockUpdateTag = {
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

    (axios.put as jest.Mock).mockRejectedValue(new Error('Mocked error'));

    await expect(
      tagService.update('someId', mockUpdateTag),
    ).rejects.toThrowError('Mocked error');
  });

  it('should delete a tag by id', async () => {
    const mockResponse = {
      data: {},
    };

    (axios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await tagService.delete('someId');

    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors during tag deletion', async () => {
    (axios.delete as jest.Mock).mockRejectedValue(new Error('Mocked error'));

    await expect(tagService.delete('someId')).rejects.toThrowError(
      'Mocked error',
    );
  });
});
