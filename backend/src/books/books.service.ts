import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AppDataSource } from '../config/database.config';

export class BooksService {
  private booksRepository: Repository<Book>;

  constructor() {
    this.booksRepository = AppDataSource.getRepository(Book);
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: ['testament', 'chapters'],
    });
  }

  async findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOne({
      where: { id },
      relations: ['testament', 'chapters'],
    });
  }

  async findByTestament(testamentId: number): Promise<Book[]> {
    return this.booksRepository.find({
      where: { testament_id: testamentId },
      relations: ['testament', 'chapters'],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book | null> {
    await this.booksRepository.update(id, updateBookDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
