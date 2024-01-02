import { Test, TestingModule } from '@nestjs/testing';
import { SimulationService } from '../simulation.service';
import axios from 'axios';

jest.mock('axios');

describe('SimulationService', () => {
  let simulationService: SimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulationService],
    }).compile();

    simulationService = module.get<SimulationService>(SimulationService);
  });

  it('should simulate and return data', async () => {
    const mockRequest = {
      json: '{"key": "value"}',
      country_iso: 'BR',
      operation_type: 'SIMULATION',
      brand: 'SANTANDER',
    };

    const mockResponse = {
      data: {},
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await simulationService.simulate(mockRequest);

    expect(result).toEqual(mockResponse.data);

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.API}/simulation`,
      mockRequest,
      {
        headers: { country: 'br', tenant: 'santander' },
      },
    );
  });

  it('should throw an error if simulation fails', async () => {
    const mockRequest = {
      json: '{"key": "value"}',
      country_iso: 'BR',
      operation_type: 'SIMULATION',
      brand: 'SANTANDER',
    };

    const mockError = new Error('Mocked error');

    (axios.post as jest.Mock).mockRejectedValue(mockError);

    expect.assertions(1);

    try {
      await simulationService.simulate(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
