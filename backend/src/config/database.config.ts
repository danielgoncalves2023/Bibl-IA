import { DataSource } from 'typeorm';
import { Testament } from '../testaments/testament.entity';
import { Book } from '../books/book.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Verse } from '../verses/verse.entity';
import { User } from '../users/entity/user.entity';
import { VerseInteraction } from '../verse-interactions/verse-interaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'projeto_biblia',
  entities: [Testament, Book, Chapter, Verse, User, VerseInteraction],
  synchronize: false, // Manter false para produção e migrações manuais
  logging: process.env.NODE_ENV === 'development',
});
