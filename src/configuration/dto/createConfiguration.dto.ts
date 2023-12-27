import { ApiProperty } from '@nestjs/swagger';

export class CreateConfigurationDTO {
  @ApiProperty({ description: 'Country ISO', example: 1 })
  country_iso: string;

  @ApiProperty({ description: 'Operation Type', example: 2 })
  operation_type: string;

  @ApiProperty({ description: 'Brand', example: 1 })
  brand: string;

  @ApiProperty({ description: 'Name', example: 'New Configuration' })
  name: string;

  @ApiProperty({
    description: 'Description',
    example: 'Description of the new configuration',
  })
  description: string;

  @ApiProperty({ description: 'Enabled', example: true })
  enabled: boolean;

  @ApiProperty({ description: 'Version', example: '1.0' })
  version: string;
}
