import { ApiProperty } from '@nestjs/swagger';

export class OptionalParamsDto {
  configurationMock?: string;

  @ApiProperty({ description: 'country_iso', required: false })
  country_iso?: number;

  @ApiProperty({
    description: 'operation_type',
    required: false,
  })
  operation_type?: number;

  @ApiProperty({ description: 'brand', required: false })
  brand?: number;
}
