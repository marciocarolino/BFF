import {
  Param,
  Controller,
  Get,
  Put,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateConfigurationDTO } from './dto/UpdateConfigurationDTO';
import { CreateConfigurationDTO } from './dto/createConfiguration.dto';

@Controller('configuration')
@ApiTags('Configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.configurationService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return await this.configurationService.getById(id);
  }

  @Post()
  async create(@Body() newConfiguration: CreateConfigurationDTO): Promise<any> {
    return await this.configurationService.create(newConfiguration);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConfiguration: UpdateConfigurationDTO,
  ): Promise<any> {
    return await this.configurationService.update(id, updateConfiguration);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.configurationService.delete(id);
  }
}
