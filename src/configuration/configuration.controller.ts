import { Param, Controller, Get } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ApiTags } from '@nestjs/swagger';
import { FindByIdDTO } from './dto/configuration.dto';

@Controller('configuration')
@ApiTags('Configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.configurationService.getAll();
  }

  @Get(':id')
  async getById(@Param() id: FindByIdDTO): Promise<FindByIdDTO> {
    return await this.configurationService.getById(id);
  }
}
