import { ApiProperty } from '@nestjs/swagger';

export class UpdateConfigurationDTO {
  @ApiProperty({ description: 'country_iso', example: 1 })
  country_iso: number;

  @ApiProperty({ description: 'operation_type', example: 1 })
  operation_type: number;

  @ApiProperty({ description: 'brand', example: 1 })
  brand: number;

  @ApiProperty({
    description: 'name',
    example: 'ISO 8583 93 - Brazil AMEX Athorization',
  })
  name: string;

  @ApiProperty({
    description: 'description',
    example: 'ISO 8583 93 - Brazil AMEX Athorization',
  })
  description: string;

  @ApiProperty({
    description: 'enabled',
    example: true,
  })
  enabled: boolean;

  @ApiProperty({
    description: 'version',
    example: 'Version 1.0',
  })
  version: string;
}

export class UpdateParamsDTO {
  @ApiProperty({ description: 'Country' })
  country: string;

  @ApiProperty({ description: 'Tenant' })
  tenant: string;

  @ApiProperty({ description: 'Configuration ID' })
  id: string;
}
