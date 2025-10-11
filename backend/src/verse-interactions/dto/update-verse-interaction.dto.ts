export class UpdateVerseInteractionDto {
  verse_id?: number;
  user_id?: string;
  interaction_type?: 'read' | 'favorite' | 'comment' | 'observation';
  content?: string;
  read_at?: Date;
}
