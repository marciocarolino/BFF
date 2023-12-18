import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class ConfigurationService {
  async getAll(): Promise<any> {
    const filePath = path.join(__dirname, '../../', 'configuration.json');

    try {
      //Lê o conteúdo do arquivo de froma assíncrona
      const fileContent = await fs.readFile(filePath, 'utf-8');

      //faz a solicitação HTTP usando Axios para simular uma requisição
      const response = await axios.get(
        `data:application/json;base64,${Buffer.from(fileContent).toString(
          'base64',
        )}`,
      );

      return JSON.parse(response.data.toString());
    } catch (error) {
      console.log(`Error reading JSON file: ${error.message}`);
      throw error;
    }
  }

  async getById(id: number): Promise<any> {
    return `Testando o id.: ${id}, pelo parametro`;
  }

  //   async createConfiguration(
  //     createConfiguration: CreateConfigurationDTO,
  //   ): Promise<any> {

  //     const create = await

  //   }
}
