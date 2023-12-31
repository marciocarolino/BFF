import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from '../tag.service';
import axios from 'axios';
import {
  mockGetResponse,
  mockNewTag,
  mockResponse,
  mockUpdateTag,
} from './mock/mockData';

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
    (axios.get as jest.Mock).mockResolvedValue(mockGetResponse);

    const result = await tagService.getAll('someId');

    expect(result).toEqual([
      {
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
      },
      {
        id: '2',
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
      },
    ]);
  });

  it('should return an array of tags', async () => {
    const mockError = new Error('Mocked error');
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    const result = await tagService.getAll('someId');

    expect(result).toEqual([]);
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
      id_configuration: undefined,
      name: undefined,
      description: undefined,
      path_json_in: undefined,
      rules_json: undefined,
      data_element_type: undefined,
      data_element_length: undefined,
      data_element_fill_pad: undefined,
      data_element_fill_value: undefined,
      position_iso: undefined,
      enabled_bitmap: undefined,
      active: undefined,
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
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await tagService.create(mockNewTag);

    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors during tag creation', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('Mocked error'));

    await expect(tagService.create(mockNewTag)).rejects.toThrowError(
      'Mocked error',
    );
  });

  it('should update a tag by id', async () => {
    (axios.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await tagService.update('someId', mockUpdateTag);

    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors during tag update', async () => {
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
