import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ name: 'id', example: '1' })
  id: string;

  @ApiProperty({ name: 'id_configuration', example: 'id_configuration' })
  id_configuration: string;

  @ApiProperty({ name: 'name', example: 'name' })
  name: string;

  @ApiProperty({ name: 'description', example: 'description' })
  description: string;

  @ApiProperty({ name: 'path_json_in', example: 'path_json_in' })
  path_json_in: string;

  @ApiProperty({ name: 'rules_json', example: 'rules_json' })
  rules_json: string;

  @ApiProperty({ name: 'data_element_type', example: 'data_element_type' })
  data_element_type: string;

  @ApiProperty({ name: 'data_element_length', example: 'data_element_length' })
  data_element_length: string;

  @ApiProperty({
    name: 'data_element_fill_pad',
    example: 'data_element_fill_pad',
  })
  data_element_fill_pad: string;

  @ApiProperty({
    name: 'data_element_fill_value',
    example: 'data_element_fill_value',
  })
  data_element_fill_value: string;

  @ApiProperty({ name: 'position_iso', example: 'position_iso' })
  position_iso: string;

  @ApiProperty({ name: 'enabled_bitmap', example: 'enabled_bitmap' })
  enabled_bitmap: string;

  @ApiProperty({ name: 'active', example: true })
  active: boolean;
}

export class UpdateTagDto {
  @ApiProperty({ name: 'id', example: '1' })
  id: string;

  @ApiProperty({ name: 'id_configuration', example: 'id_configuration' })
  id_configuration: string;

  @ApiProperty({ name: 'name', example: 'name' })
  name: string;

  @ApiProperty({ name: 'description', example: 'description' })
  description: string;

  @ApiProperty({ name: 'path_json_in', example: 'path_json_in' })
  path_json_in: string;

  @ApiProperty({ name: 'rules_json', example: 'rules_json' })
  rules_json: string;

  @ApiProperty({ name: 'data_element_type', example: 'data_element_type' })
  data_element_type: string;

  @ApiProperty({ name: 'data_element_length', example: 'data_element_length' })
  data_element_length: string;

  @ApiProperty({
    name: 'data_element_fill_pad',
    example: 'data_element_fill_pad',
  })
  data_element_fill_pad: string;

  @ApiProperty({
    name: 'data_element_fill_value',
    example: 'data_element_fill_value',
  })
  data_element_fill_value: string;

  @ApiProperty({ name: 'position_iso', example: 'position_iso' })
  position_iso: string;

  @ApiProperty({ name: 'enabled_bitmap', example: 'enabled_bitmap' })
  enabled_bitmap: string;

  @ApiProperty({ name: 'active', example: true })
  active: boolean;
}
