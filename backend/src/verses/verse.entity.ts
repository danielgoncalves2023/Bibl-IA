import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { VerseInteraction } from 'src/verse-interactions/verse-interaction.entity';
import { Chapter } from 'src/chapters/chapter.entity';

@Entity('verses')
export class Verse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  version: string;

  @Column()
  verse: number;

  @Column('text')
  text: string;

  @Column()
  chapter_id: number;

  @ManyToOne(() => Chapter, (chapter) => chapter.verses)
  @JoinColumn({ name: 'chapter_id' })
  chapter: Chapter;

  @OneToMany(() => VerseInteraction, (interaction) => interaction.verse)
  interactions: VerseInteraction[];
}
