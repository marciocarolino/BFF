import { Test, TestingModule } from '@nestjs/testing';
import { SimulationService } from '../simulation.service';
import { SimulationRequest } from '../dto/simulation.dto';
import axios from 'axios';

jest.mock('axios');

describe('SimulationService', () => {
  let service: SimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulationService],
    }).compile();

    service = module.get<SimulationService>(SimulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should simulate correctly', async () => {
    const mockRequest: SimulationRequest = {
      json: '{"property1":"value1","property2":123}',
      country_iso: 'BR',
      operation_type: 'buy',
      brand: 'brand',
    };

    const mockResponseData = {};
    const mockAxiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const result = await service.simulate(mockRequest);

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `${process.env.API}/simulation`,
      mockRequest,
      {
        headers: { country: 'br', tenant: 'santander' },
      },
    );

    expect(result).toEqual(mockResponseData);
  });

  it('should handle errors during simulation', async () => {
    const mockRequest: SimulationRequest = {
      json: '{"property1":"value1","property2":123}',
      country_iso: 'BR',
      operation_type: 'buy',
      brand: 'brand',
    };

    const mockError = new Error('Mock error');
    const mockAxiosPost = jest
      .spyOn(axios, 'post')
      .mockRejectedValueOnce(mockError);

    await expect(service.simulate(mockRequest)).rejects.toThrowError(mockError);

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `${process.env.API}/simulation`,
      mockRequest,
      {
        headers: { country: 'br', tenant: 'santander' },
      },
    );
  });
});
