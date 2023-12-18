import { Injectable } from '@nestjs/common';
import { CreateConfigurationDTO } from './dto/configuration.dto';

@Injectable()
export class ConfigurationService {
  async getAll(): Promise<any> {
    return 'GET ALL';
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
