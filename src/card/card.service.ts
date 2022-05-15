import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRespository: Repository<Card>,
  ) {}

  async createDataCard(body: any) {
    const cardExists = await this.cardRespository.findOne({
      where: {
        cardId: body.cardId,
      },
    });
    if (cardExists)
      throw new InternalServerErrorException('Card already exists');
    const query = {
      cardId: body.cardId,
      status: body.status,
    };
    const card = await this.cardRespository.create(query);
    await this.cardRespository.save(card);
    return card;
  }

  async getAllDataCard() {
    const cards = await this.cardRespository.find();
    return cards;
  }

  async getDataCardById(id: string) {
    const card = await this.cardRespository.findOne({
      where: {
        cardId: id,
      },
    });
    if (!card) throw new InternalServerErrorException('Card not found');
    return card;
  }

  async updateDataCard(id: string, body: any) {
    const card = await this.cardRespository.findOne({
      where: {
        cardId: id,
      },
    });
    if (!card) throw new InternalServerErrorException('Card not found');
    if (body.status) card.status = body.status;
    await this.cardRespository.save(card);
    return card;
  }

  async deleteDataCard(id: string) {
    const card = await this.cardRespository.findOne({
      where: {
        cardId: id,
      },
    });
    if (!card) throw new InternalServerErrorException('Card not found');
    await this.cardRespository.delete({ cardId: id });
    return card;
  }
}
