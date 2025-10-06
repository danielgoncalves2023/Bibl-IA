export class UpdateVerseInteractionDto {
  verse_id?: number;
  is_favorite?: boolean;
  is_read?: boolean;
  comment?: string;
  observation?: string;
  read_at?: Date;
  user_id?: string;
}
