import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestamentsService } from './testaments.service';
import { TestamentsController } from './testaments.controller';
import { Testament } from './testament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testament])],
  controllers: [TestamentsController],
  providers: [TestamentsService],
  exports: [TestamentsService],
})
export class TestamentsModule {}
