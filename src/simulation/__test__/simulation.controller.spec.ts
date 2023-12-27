import { Test, TestingModule } from '@nestjs/testing';
import { SimulationController } from '../simulation.controller';
import { SimulationService } from '../simulation.service';
import { SimulationRequest } from '../dto/simulation.dto';

describe('SimulationController', () => {
  let controller: SimulationController;
  let service: SimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationController],
      providers: [SimulationService],
    }).compile();

    controller = module.get<SimulationController>(SimulationController);
    service = module.get<SimulationService>(SimulationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('simulate', () => {
    it('should call simulationService.simulate with the correct request', async () => {
      const mockRequest: SimulationRequest = {
        json: '{"property1":"value1","property2":123}',
        country_iso: 'BR',
        operation_type: 'buy',
        brand: 'brand',
      };

      const mockServiceResult = {};
      jest.spyOn(service, 'simulate').mockResolvedValueOnce(mockServiceResult);

      const result = await controller.simulate(mockRequest);

      expect(service.simulate).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockServiceResult);
    });
  });
});
