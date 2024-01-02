import { Test, TestingModule } from '@nestjs/testing';
import { SimulationController } from '../simulation.controller';
import { SimulationService } from '../simulation.service';

describe('SimulationController', () => {
  let controller: SimulationController;
  let simulationService: SimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationController],
      providers: [SimulationService],
    }).compile();

    controller = module.get<SimulationController>(SimulationController);
    simulationService = module.get<SimulationService>(SimulationService);
  });

  it('should simulate and return data', async () => {
    const mockRequest = {
      json: '{"key": "value"}',
      country_iso: 'BR',
      operation_type: 'SIMULATION',
      brand: 'SANTANDER',
    };

    const mockResponse = {};

    jest.spyOn(simulationService, 'simulate').mockResolvedValue(mockResponse);

    const result = await controller.simulate(mockRequest);

    expect(result).toEqual(mockResponse);
    expect(simulationService.simulate).toHaveBeenCalledWith(mockRequest);
  });
});
