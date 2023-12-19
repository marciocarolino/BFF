import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { FindByIdDTO } from './dto/configuration.dto';

@Injectable()
export class ConfigurationService {
  private readonly configFilePath = process.env.CONFIGURATION_FILE_PATH;

  async getAll(): Promise<any> {
    try {
      const fileContent = await fs.readFile(this.configFilePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.log('Erro ao ler o arquivo JSON', error.message);
      throw new Error('Não foi possível ler as configurações');
    }
  }

  async getById(id: FindByIdDTO): Promise<any> {
    const configurations = await this.getAll();
    const configuration = configurations.configuration.find(
      (config) => config.id === id.id,
    );

    return configuration || null;
  }
}
