export class CreateVerseInteractionDto {
  verse_id: number;
  user_id: string;
  interaction_type: 'read' | 'favorite' | 'comment' | 'observation';
  comment?: string;
  observation?: string;
  read_at?: Date;
}
