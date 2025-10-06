import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerseInteraction } from './verse-interaction.entity';
import { CreateVerseInteractionDto } from './dto/create-verse-interaction.dto';
import { UpdateVerseInteractionDto } from './dto/update-verse-interaction.dto';

@Injectable()
export class VerseInteractionsService {
  constructor(
    @InjectRepository(VerseInteraction)
    private verseInteractionsRepository: Repository<VerseInteraction>,
  ) {}

  async create(
    createVerseInteractionDto: CreateVerseInteractionDto,
  ): Promise<VerseInteraction> {
    const interaction = this.verseInteractionsRepository.create(
      createVerseInteractionDto,
    );
    return this.verseInteractionsRepository.save(interaction);
  }

  async findAll(): Promise<VerseInteraction[]> {
    return this.verseInteractionsRepository.find({
      relations: ['verse', 'user'],
    });
  }

  async findOne(id: number): Promise<VerseInteraction | null> {
    return this.verseInteractionsRepository.findOne({
      where: { id },
      relations: ['verse', 'user'],
    });
  }

  async findByUser(userId: string): Promise<VerseInteraction[]> {
    return this.verseInteractionsRepository.find({
      where: { user_id: userId },
      relations: ['verse', 'user'],
    });
  }

  async findByVerse(verseId: number): Promise<VerseInteraction[]> {
    return this.verseInteractionsRepository.find({
      where: { verse_id: verseId },
      relations: ['verse', 'user'],
    });
  }

  async findUserFavorites(userId: string): Promise<VerseInteraction[]> {
    return this.verseInteractionsRepository.find({
      where: { user_id: userId, interaction_type: 'favorite' },
      relations: ['verse', 'user'],
    });
  }

  async findUserReadVerses(userId: string): Promise<VerseInteraction[]> {
    return this.verseInteractionsRepository.find({
      where: { user_id: userId, interaction_type: 'read' },
      relations: ['verse', 'user'],
      order: { read_at: 'DESC' },
    });
  }

  async update(
    id: number,
    updateVerseInteractionDto: UpdateVerseInteractionDto,
  ): Promise<VerseInteraction | null> {
    await this.verseInteractionsRepository.update(
      id,
      updateVerseInteractionDto,
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.verseInteractionsRepository.delete(id);
  }

  async markAsRead(verseId: number, userId: string): Promise<VerseInteraction> {
    let interaction = await this.verseInteractionsRepository.findOne({
      where: { verse_id: verseId, user_id: userId, interaction_type: 'read' },
    });

    if (!interaction) {
      interaction = this.verseInteractionsRepository.create({
        verse_id: verseId,
        user_id: userId,
        interaction_type: 'read',
        read_at: new Date(),
      });
    } else {
      interaction.read_at = new Date();
    }

    return this.verseInteractionsRepository.save(interaction);
  }

  async toggleFavorite(
    verseId: number,
    userId: string,
  ): Promise<VerseInteraction> {
    let interaction = await this.verseInteractionsRepository.findOne({
      where: {
        verse_id: verseId,
        user_id: userId,
        interaction_type: 'favorite',
      },
    });

    if (!interaction) {
      interaction = this.verseInteractionsRepository.create({
        verse_id: verseId,
        user_id: userId,
        interaction_type: 'favorite',
      });
      return this.verseInteractionsRepository.save(interaction);
    } else {
      // Remove favorite (delete the interaction)
      await this.verseInteractionsRepository.delete(interaction.id);
      return interaction;
    }
  }

  async addComment(
    verseId: number,
    userId: string,
    comment: string,
  ): Promise<VerseInteraction> {
    let interaction = await this.verseInteractionsRepository.findOne({
      where: {
        verse_id: verseId,
        user_id: userId,
        interaction_type: 'comment',
      },
    });

    if (!interaction) {
      interaction = this.verseInteractionsRepository.create({
        verse_id: verseId,
        user_id: userId,
        interaction_type: 'comment',
        comment,
      });
    } else {
      interaction.comment = comment;
    }

    return this.verseInteractionsRepository.save(interaction);
  }

  async addObservation(
    verseId: number,
    userId: string,
    observation: string,
  ): Promise<VerseInteraction> {
    let interaction = await this.verseInteractionsRepository.findOne({
      where: {
        verse_id: verseId,
        user_id: userId,
        interaction_type: 'observation',
      },
    });

    if (!interaction) {
      interaction = this.verseInteractionsRepository.create({
        verse_id: verseId,
        user_id: userId,
        interaction_type: 'observation',
        observation,
      });
    } else {
      interaction.observation = observation;
    }

    return this.verseInteractionsRepository.save(interaction);
  }
}
