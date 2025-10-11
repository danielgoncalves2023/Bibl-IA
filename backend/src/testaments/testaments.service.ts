import { Repository } from 'typeorm';
import { Testament } from './testament.entity';
import { CreateTestamentDto } from './dto/create-testament.dto';
import { UpdateTestamentDto } from './dto/update-testament.dto';
import { AppDataSource } from '../config/database.config';

export class TestamentsService {
  private testamentsRepository: Repository<Testament>;

  constructor() {
    this.testamentsRepository = AppDataSource.getRepository(Testament);
  }

  async create(createTestamentDto: CreateTestamentDto): Promise<Testament> {
    const testament = this.testamentsRepository.create(createTestamentDto);
    return this.testamentsRepository.save(testament);
  }

  async findAll(): Promise<Testament[]> {
    return this.testamentsRepository.find({
      relations: ['books'],
    });
  }

  async findOne(id: number): Promise<Testament | null> {
    return this.testamentsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  async update(
    id: number,
    updateTestamentDto: UpdateTestamentDto,
  ): Promise<Testament | null> {
    await this.testamentsRepository.update(id, updateTestamentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.testamentsRepository.delete(id);
  }
}
