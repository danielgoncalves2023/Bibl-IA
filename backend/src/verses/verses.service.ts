import { Repository } from 'typeorm';
import { Verse } from './verse.entity';
import { CreateVerseDto } from './dto/create-verse.dto';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { AppDataSource } from '../config/database.config';

export class VersesService {
  private versesRepository: Repository<Verse>;

  constructor() {
    this.versesRepository = AppDataSource.getRepository(Verse);
  }

  async create(createVerseDto: CreateVerseDto): Promise<Verse> {
    const verse = this.versesRepository.create(createVerseDto);
    return this.versesRepository.save(verse);
  }

  async findAll(): Promise<Verse[]> {
    return this.versesRepository.find({
      relations: ['chapter', 'interactions'],
    });
  }

  async findOne(id: number): Promise<Verse | null> {
    return this.versesRepository.findOne({
      where: { id },
      relations: ['chapter', 'interactions'],
    });
  }

  async findByChapter(chapterId: number): Promise<Verse[]> {
    return this.versesRepository.find({
      where: { chapter_id: chapterId },
      relations: ['chapter', 'interactions'],
      order: { verse: 'ASC' },
    });
  }

  async findByVersion(version: string): Promise<Verse[]> {
    return this.versesRepository.find({
      where: { version },
      relations: ['chapter', 'interactions'],
    });
  }

  async update(
    id: number,
    updateVerseDto: UpdateVerseDto,
  ): Promise<Verse | null> {
    await this.versesRepository.update(id, updateVerseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.versesRepository.delete(id);
  }
}
