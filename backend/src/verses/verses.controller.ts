import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VersesService } from './verses.service';
import { CreateVerseDto } from './dto/create-verse.dto';
import { UpdateVerseDto } from './dto/update-verse.dto';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) {}

  @Post()
  create(@Body() createVerseDto: CreateVerseDto) {
    return this.versesService.create(createVerseDto);
  }

  @Get()
  findAll() {
    return this.versesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.versesService.findOne(id);
  }

  @Get('chapter/:chapterId')
  findByChapter(@Param('chapterId', ParseIntPipe) chapterId: number) {
    return this.versesService.findByChapter(chapterId);
  }

  @Get('version/:version')
  findByVersion(@Param('version') version: string) {
    return this.versesService.findByVersion(version);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVerseDto: UpdateVerseDto,
  ) {
    return this.versesService.update(id, updateVerseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.versesService.remove(id);
  }
}
