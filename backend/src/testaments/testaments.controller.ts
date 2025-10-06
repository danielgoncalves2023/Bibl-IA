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
import { TestamentsService } from './testaments.service';
import { CreateTestamentDto } from './dto/create-testament.dto';
import { UpdateTestamentDto } from './dto/update-testament.dto';

@Controller('testaments')
export class TestamentsController {
  constructor(private readonly testamentsService: TestamentsService) {}

  @Post()
  create(@Body() createTestamentDto: CreateTestamentDto) {
    return this.testamentsService.create(createTestamentDto);
  }

  @Get()
  findAll() {
    return this.testamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testamentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestamentDto: UpdateTestamentDto,
  ) {
    return this.testamentsService.update(id, updateTestamentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testamentsService.remove(id);
  }
}
