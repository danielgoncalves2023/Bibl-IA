import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { TestamentsModule } from './testaments/testaments.module';
import { BooksModule } from './books/books.module';
import { ChaptersModule } from './chapters/chapters.module';
import { VersesModule } from './verses/verses.module';
import { VerseInteractionsModule } from './verse-interactions/verse-interactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    TestamentsModule,
    BooksModule,
    ChaptersModule,
    VersesModule,
    VerseInteractionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
