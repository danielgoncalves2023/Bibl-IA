// User types
export interface User {
  id: string;
  auth0Id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreatePayload {
  auth0Id: string;
  name: string;
  email: string;
}

// Testament types
export interface Testament {
  id: number;
  name: string;
  shortName: string;
  createdAt: Date;
  updatedAt: Date;
}

// Book types
export interface Book {
  id: number;
  testamentId: number;
  name: string;
  shortName: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  testament?: Testament;
}

// Chapter types
export interface Chapter {
  id: number;
  bookId: number;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  book?: Book;
}

// Verse types
export interface Verse {
  id: number;
  chapterId: number;
  number: number;
  text: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  chapter?: Chapter;
}

// Verse Interaction types
export interface VerseInteraction {
  id: number;
  userId: string;
  verseId: number;
  interactionType: 'read' | 'favorite' | 'comment' | 'observation';
  comment?: string;
  observation?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  verse?: Verse;
}

export type InteractionType = 'read' | 'favorite' | 'comment' | 'observation';

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter types
export interface ReadingFilters {
  testamentId?: number;
  bookId?: number;
  chapterId?: number;
  version: string;
  search?: string;
}

// Progress types
export interface ReadingProgress {
  totalVerses: number;
  readVerses: number;
  favoriteVerses: number;
  annotationsCount: number;
  percentage: number;
}

// User statistics
export interface UserStatistics {
  versesRead: number;
  favorites: number;
  annotations: number;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VerseCardProps extends BaseComponentProps {
  verse: Verse;
  interaction?: VerseInteraction | VerseInteraction[];
  onToggleFavorite: (verseId: number) => void;
  onMarkAsRead: (verseId: number) => void;
  onAddComment: (verseId: number, comment: string) => void;
  onAddObservation: (verseId: number, observation: string) => void;
}

export interface FilterProps {
  filters: ReadingFilters;
  onFiltersChange: (filters: ReadingFilters) => void;
  testaments: Testament[];
  books: Book[];
}

// Form types
export interface CommentFormData {
  comment: string;
  observation?: string;
}

export interface SearchFormData {
  query: string;
  testament?: number;
  book?: number;
  chapter?: number;
}