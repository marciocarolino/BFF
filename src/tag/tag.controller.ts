import {
  Param,
  Controller,
  Get,
  Put,
  Body,
  Post,
  Delete,
} from '@nestjs/common';

import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get(':configurationId')
  async getAll(
    @Param('configurationId') configurationId: string,
  ): Promise<any> {
    return await this.tagService.getAll(configurationId);
  }

  @Get('/id/:id')
  async getById(@Param('id') id: string): Promise<any> {
    return await this.tagService.getById(id);
  }

  @Post()
  async create(@Body() newTag: CreateTagDto): Promise<any> {
    return await this.tagService.create(newTag);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConfiguration: UpdateTagDto,
  ): Promise<any> {
    return await this.tagService.update(id, updateConfiguration);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.tagService.delete(id);
  }
}
