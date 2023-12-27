import { ApiProperty } from '@nestjs/swagger';

export class SimulationRequest {
  @ApiProperty({
    description: 'json',
    example: '{"property1":"value1","property2":123}',
  })
  json: string;

  @ApiProperty({ description: 'country_iso', example: 'BR' })
  country_iso: string;

  @ApiProperty({ description: 'country_iso', example: 'buy' })
  operation_type: string;

  @ApiProperty({ description: 'country_iso', example: 'brand' })
  brand: string;
}
