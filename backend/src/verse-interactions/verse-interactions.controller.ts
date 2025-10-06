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
import { VerseInteractionsService } from './verse-interactions.service';
import { CreateVerseInteractionDto } from './dto/create-verse-interaction.dto';
import { UpdateVerseInteractionDto } from './dto/update-verse-interaction.dto';

@Controller('verse-interactions')
export class VerseInteractionsController {
  constructor(
    private readonly verseInteractionsService: VerseInteractionsService,
  ) {}

  @Post()
  create(@Body() createVerseInteractionDto: CreateVerseInteractionDto) {
    return this.verseInteractionsService.create(createVerseInteractionDto);
  }

  @Get()
  findAll() {
    return this.verseInteractionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.verseInteractionsService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.verseInteractionsService.findByUser(userId);
  }

  @Get('verse/:verseId')
  findByVerse(@Param('verseId', ParseIntPipe) verseId: number) {
    return this.verseInteractionsService.findByVerse(verseId);
  }

  @Get('user/:userId/favorites')
  findUserFavorites(@Param('userId') userId: string) {
    return this.verseInteractionsService.findUserFavorites(userId);
  }

  @Get('user/:userId/read')
  findUserReadVerses(@Param('userId') userId: string) {
    return this.verseInteractionsService.findUserReadVerses(userId);
  }

  @Post('verse/:verseId/user/:userId/read')
  markAsRead(
    @Param('verseId', ParseIntPipe) verseId: number,
    @Param('userId') userId: string,
  ) {
    return this.verseInteractionsService.markAsRead(verseId, userId);
  }

  @Post('verse/:verseId/user/:userId/favorite')
  toggleFavorite(
    @Param('verseId', ParseIntPipe) verseId: number,
    @Param('userId') userId: string,
  ) {
    return this.verseInteractionsService.toggleFavorite(verseId, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVerseInteractionDto: UpdateVerseInteractionDto,
  ) {
    return this.verseInteractionsService.update(id, updateVerseInteractionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.verseInteractionsService.remove(id);
  }
}
