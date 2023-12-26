import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ description: 'id_configuration', example: '123' })
  id_configuration: string;

  @ApiProperty({ description: 'name', example: 'name' })
  name: string;

  @ApiProperty({ description: 'description', example: 'description' })
  description: string;

  @ApiProperty({ description: 'path_in', example: 'path_in' })
  path_in: string;

  @ApiProperty({ description: 'path_out', example: 'path_out' })
  path_out: string;

  @ApiProperty({ description: 'type_tag', example: 'type_tag' })
  type_tag: string;

  @ApiProperty({ description: 'variable_data', example: 'variable_data' })
  variable_data: string;

  @ApiProperty({ description: 'position_iso', example: 123 })
  position_iso: number;

  @ApiProperty({ description: 'size', example: 123 })
  size: number;

  @ApiProperty({ description: 'id_configuration', example: true })
  active: boolean;
}

export class UpdateTagDto {
  @ApiProperty({ description: 'id_configuration', example: '123' })
  id_configuration: string;

  @ApiProperty({ description: 'name', example: 'name' })
  name: string;

  @ApiProperty({ description: 'description', example: 'description' })
  description: string;

  @ApiProperty({ description: 'path_in', example: 'path_in' })
  path_in: string;

  @ApiProperty({ description: 'path_out', example: 'path_out' })
  path_out: string;

  @ApiProperty({ description: 'type_tag', example: 'type_tag' })
  type_tag: string;

  @ApiProperty({ description: 'variable_data', example: 'variable_data' })
  variable_data: string;

  @ApiProperty({ description: 'position_iso', example: 123 })
  position_iso: number;

  @ApiProperty({ description: 'size', example: 123 })
  size: number;

  @ApiProperty({ description: 'id_configuration', example: true })
  active: boolean;
}
