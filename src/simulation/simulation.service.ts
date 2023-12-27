import { Injectable } from '@nestjs/common';
import { SimulationRequest } from './dto/simulation.dto';
import axios from 'axios';

@Injectable()
export class SimulationService {
  async simulate(request: SimulationRequest): Promise<any> {
    try {
      const response = await axios.post(
        `${process.env.API}/simulation`,
        request,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
