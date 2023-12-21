import { Param, Controller, Get, Query } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ApiTags } from '@nestjs/swagger';
import { FindByIdDTO } from './dto/configuration.dto';
import { OptionalParamsDto } from './dto/optional-params.dto';

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
}
