import { Body, Controller, Post } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationRequest } from './dto/simulation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('simulation')
@ApiTags('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Post()
  async simulate(@Body() request: SimulationRequest): Promise<any> {
    return await this.simulationService.simulate(request);
  }
}
