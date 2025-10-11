import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { AppDataSource } from '../config/database.config';

export class ChaptersService {
  private chaptersRepository: Repository<Chapter>;

  constructor() {
    this.chaptersRepository = AppDataSource.getRepository(Chapter);
  }

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const chapter = this.chaptersRepository.create(createChapterDto);
    return this.chaptersRepository.save(chapter);
  }

  async findAll(): Promise<Chapter[]> {
    return this.chaptersRepository.find({
      relations: ['book', 'verses'],
    });
  }

  async findOne(id: number): Promise<Chapter | null> {
    return this.chaptersRepository.findOne({
      where: { id },
      relations: ['book', 'verses'],
    });
  }

  async findByBook(bookId: number): Promise<Chapter[]> {
    return this.chaptersRepository.find({
      where: { book_id: bookId },
      relations: ['book', 'verses'],
      order: { number: 'ASC' },
    });
  }

  async update(
    id: number,
    updateChapterDto: UpdateChapterDto,
  ): Promise<Chapter | null> {
    await this.chaptersRepository.update(id, updateChapterDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.chaptersRepository.delete(id);
  }
}
