import { ApiProperty } from '@nestjs/swagger';

export class OptionalParamsDto {
  configurationMock?: string;

  @ApiProperty({ description: 'country_is', required: false })
  country_is?: string;

  @ApiProperty({
    description: 'operation_type',
    required: false,
  })
  operation_type?: string;

  @ApiProperty({ description: 'brand', required: false })
  brand?: string;
}
