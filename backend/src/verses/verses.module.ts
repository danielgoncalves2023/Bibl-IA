import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersesService } from './verses.service';
import { VersesController } from './verses.controller';
import { Verse } from './verse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verse])],
  controllers: [VersesController],
  providers: [VersesService],
  exports: [VersesService],
})
export class VersesModule {}
