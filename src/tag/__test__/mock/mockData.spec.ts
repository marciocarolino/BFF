// mockData.test.ts
import {
  mockNewTag,
  mockUpdateTag,
  mockResponse,
  mockGetResponse,
} from './mockData';

describe('mockData', () => {
  it('should export mockNewTag correctly', () => {
    expect(mockNewTag).toEqual({
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
    });
  });

  it('should export mockUpdateTag correctly', () => {
    expect(mockUpdateTag).toEqual({
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
    });
  });

  it('should export mockResponse correctly', () => {
    expect(mockResponse).toEqual({
      data: {
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
    });
  });

  it('should export mockGetResponse correctly', () => {
    expect(mockGetResponse).toEqual({
      data: {
        docs: [
          { id: 1, process_type: 'example' },
          { id: 2, process_type: 'example2' },
        ],
      },
    });
  });
});
