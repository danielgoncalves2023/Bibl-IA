import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Chapter } from '../chapters/chapter.entity';
import { Testament } from '../testaments/testament.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 4 })
  abbreviation: string;

  @Column()
  testament_id: number;

  @ManyToOne(() => Testament, (testament) => testament.books)
  @JoinColumn({ name: 'testament_id' })
  testament: Testament;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];
}
