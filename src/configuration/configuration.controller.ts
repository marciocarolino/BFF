import { Controller, Get, Param } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('configuration')
@ApiTags('Configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.configurationService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: ' Searching by ID ' })
  async getById(@Param('id') id: number): Promise<any> {
    return await this.configurationService.getById(id);
  }
}
