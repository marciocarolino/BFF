import { ApiProperty } from '@nestjs/swagger';

export class CreateConfigurationDTO {
  @ApiProperty({ description: 'id', example: '1' })
  id: string;

  @ApiProperty({ description: 'country_iso', example: '1' })
  country_iso: string;

  @ApiProperty({ description: 'operation_type', example: '1' })
  operation_type: string;

  @ApiProperty({ description: 'brand', example: '1' })
  brand: string;

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
    description: 'version',
    example: 'Version 1.0',
  })
  version: string;

  @ApiProperty({
    description: 'mti',
    example: 'mti',
  })
  mti: string;

  @ApiProperty({
    description: 'enabled',
    example: true,
  })
  enabled: boolean;
}
