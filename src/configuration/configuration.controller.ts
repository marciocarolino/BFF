import { Param, Controller, Get, Query, Put, Body } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ApiTags } from '@nestjs/swagger';
import { FindByIdDTO } from './dto/configuration.dto';
import { OptionalParamsDto } from './dto/optional-params.dto';
import {
  UpdateConfigurationDTO,
  UpdateParamsDTO,
} from './dto/UpdateConfigurationDTO';

@Controller('configuration')
@ApiTags('Configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  async getAll(@Query() params?: OptionalParamsDto): Promise<any> {
    return await this.configurationService.getAll(params);
  }

  @Get(':id')
  async getById(@Param() id: FindByIdDTO): Promise<FindByIdDTO> {
    return await this.configurationService.getById(id);
  }

  @Put(':id')
  async update(
    @Param() params: UpdateParamsDTO,
    @Body() updateConfiguration: UpdateConfigurationDTO,
  ): Promise<any> {
    return await this.configurationService.update(params, updateConfiguration);
  }
}
