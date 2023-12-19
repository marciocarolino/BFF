import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs/promises';
import { FindByIdDTO } from './dto/configuration.dto';

@Injectable()
export class ConfigurationService {
  async getAll(): Promise<any> {
    const filePath = path.join(
      __dirname,
      process.env.CONFIGURATION_FILE_PATH,
      'configuration.json',
    );

    try {
      //Lê o conteúdo do arquivo de forma assíncrona
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

  async getById(id: FindByIdDTO): Promise<any> {
    const filePath = path.join(
      __dirname,
      process.env.CONFIGURATION_FILE_PATH,
      'configuration.json',
    );

    try {
      //Lê o conteúdo do arquivo de forma assíncrona
      const fileContent = await fs.readFile(filePath, 'utf-8');

      //faz a solicitação HTTP usando Axios para simular uma requisição
      const response = await axios.get(
        `data:application/json;base64,${Buffer.from(fileContent).toString(
          'base64',
        )}`,
      );

      // Faz o parse do conteúdo do arquivo JSON
      const jsonData = JSON.parse(response.data.toString());

      // Encontra o objeto com base no id
      const result = jsonData.configuration.find(
        (config) => config.id === id.id,
      );

      return { configuration: result };
    } catch (error) {
      console.log(`Error reading JSON file: ${error.message}`);
      throw error;
    }
  }
}
