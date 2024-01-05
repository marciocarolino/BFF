import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  async getAll(idConfiguration: any): Promise<any> {
    try {
      const response = await axios.get(
        `${process.env.API}/tag/${idConfiguration}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      let result = null;
      if (response?.data.docs) {
        result = response.data.docs.map((resultTag) => {
          return {
            id: resultTag.id,
            id_configuration: resultTag.id_configuration,
            name: resultTag.name,
            description: resultTag.description,
            path_json_in: resultTag.path_json_in,
            rules_json: resultTag.rules_json,
            data_element_type: resultTag.data_element_type,
            data_element_length: resultTag.data_element_length,
            data_element_fill_pad: resultTag.data_element_fill_pad,
            data_element_fill_value: resultTag.data_element_fill_value,
            position_iso: resultTag.position_iso,
            enabled_bitmap: resultTag.enabled_bitmap,
            active: resultTag.active,
          };
        });
      }

      return result;
    } catch (error) {
      return [];
    }
  }

  async getById(id: any): Promise<any> {
    try {
      const response = await axios.get(`${process.env.API}/tag/id/${id}`, {
        headers: { country: 'br', tenant: 'santander' },
      });

      if (response?.data) {
        const result = response.data;
        return {
          id: result.id,
          id_configuration: result.id_configuration,
          name: result.name,
          description: result.description,
          path_json_in: result.path_json_in,
          rules_json: result.rules_json,
          data_element_type: result.data_element_type,
          data_element_length: result.data_element_length,
          data_element_fill_pad: result.data_element_fill_pad,
          data_element_fill_value: result.data_element_fill_value,
          position_iso: result.position_iso,
          enabled_bitmap: result.enabled_bitmap,
          active: result.active,
        };
      }

      return {};
    } catch (error) {
      return [];
    }
  }

  async create(newTag: CreateTagDto): Promise<any> {
    try {
      const response = await axios.post(`${process.env.API}/tag`, newTag, {
        headers: { country: 'br', tenant: 'santander' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTag: UpdateTagDto): Promise<any> {
    const response = await axios.put(
      `${process.env.API}/tag/${id}`,
      updateTag,
      { headers: { country: 'br', tenant: 'santander' } },
    );
    return response.data;
  }

  async delete(id: string): Promise<any> {
    const response = await axios.delete(`${process.env.API}/tag/${id}`, {
      headers: { country: 'br', tenant: 'santander' },
    });
    return response.data;
  }
}
