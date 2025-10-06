import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Verse } from '../verses/verse.entity';
import { User } from '../users/entity/user.entity';

@Entity('verse_interactions')
export class VerseInteraction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  verse_id: number;

  @Column({ default: false })
  is_favorite: boolean;

  @Column({ default: false })
  is_read: boolean;

  @Column('text', { nullable: true })
  comment: string;

  @Column('text', { nullable: true })
  observation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  read_at: Date;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => Verse, (verse) => verse.interactions)
  @JoinColumn({ name: 'verse_id' })
  verse: Verse;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
