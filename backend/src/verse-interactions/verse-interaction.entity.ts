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

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    enum: ['read', 'favorite', 'comment', 'observation'],
  })
  interaction_type: 'read' | 'favorite' | 'comment' | 'observation';

  @Column('text', { nullable: true })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('timestamp', { nullable: true })
  read_at: Date;

  @ManyToOne(() => Verse, (verse) => verse.interactions)
  @JoinColumn({ name: 'verse_id' })
  verse: Verse;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
