import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerseInteractionsService } from './verse-interactions.service';
import { VerseInteractionsController } from './verse-interactions.controller';
import { VerseInteraction } from './verse-interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerseInteraction])],
  controllers: [VerseInteractionsController],
  providers: [VerseInteractionsService],
  exports: [VerseInteractionsService],
})
export class VerseInteractionsModule {}
