import { ApiProperty } from '@nestjs/swagger';

export class FindByIdDTO {
  @ApiProperty({
    description: 'ID',
    example: 'cd5fa417-b667-482d-b208-798d9da3213z',
  })
  id: string;
}

export class ResultConfiguration {
  id: string;
  country_id: string;
  operation_type: string;
  brand: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
}
