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
            path_in: resultTag.path_in,
            path_out: resultTag.path_out,
            type_tag: resultTag.type_tag,
            variable_data: resultTag.variable_data,
            position_iso: resultTag.position_iso,
            size: resultTag.size,
            active: resultTag.active,
          };
        });
      }

      return result;
    } catch (error) {
      console.error('Error fetching configurations', error);
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
          path_in: result.path_in,
          path_out: result.path_out,
          type_tag: result.type_tag,
          variable_data: result.variable_data,
          position_iso: result.position_iso,
          size: result.size,
          active: result.active,
        };
      }

      return {};
    } catch (error) {
      console.error('Error fetching Tag', error);
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
    console.error({ response });
    return response.data;
  }

  async delete(id: string): Promise<any> {
    const response = await axios.delete(`${process.env.API}/tag/${id}`, {
      headers: { country: 'br', tenant: 'santander' },
    });
    return response.data;
  }
}
