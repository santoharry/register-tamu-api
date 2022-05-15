import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';
import { Repository } from 'typeorm';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entities/guest.entity';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async createDataGuest(body: any) {
    const cardExsits = await this.cardRepository.findOne({
      where: {
        cardId: body.cardId,
      },
    });
    if (!cardExsits)
      throw new HttpException('Card ID Not Found', HttpStatus.NOT_FOUND);
    await this.cardRepository.update(
      { cardId: body.cardId },
      { status: false },
    );
    const query = {
      name: body.name,
      nik: body.nik,
      address: body.address,
      phone: body.phone,
      visitDate: body.visitDate,
      timeIn: body.timeIn,
      card: body.cardId,
    };
    const guest = await this.guestRepository.create(query);
    await this.guestRepository.save(guest);
    return guest;
  }

  async getAllDataGuest() {
    const guests = await this.guestRepository
      .createQueryBuilder('guest')
      .leftJoinAndSelect('guest.card', 'card')
      .select(['guest', 'card'])
      .getMany();
    return guests;
  }

  async getDataGuestById(id: number) {
    const guest = await this.guestRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!guest) throw new InternalServerErrorException('guest not found');
    return guest;
  }

  async updateDataGuest(id: number, body: any) {
    const guest = await this.guestRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!guest) throw new InternalServerErrorException('guest not found');
    if (body.name) guest.name = body.name;
    if (body.nik) guest.nik = body.nik;
    if (body.address) guest.address = body.address;
    if (body.phone) guest.phone = body.phone;
    if (body.visitDate) guest.visitDate = body.visitDate;
    if (body.timeIn) guest.timeIn = body.timeIn;
    if (body.timeOut) guest.card = body.timeOut;
    await this.guestRepository.save(guest);
    return guest;
  }

  async deleteDataGuest(id: number) {
    const guest = await this.guestRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!guest) throw new InternalServerErrorException('guest not found');
    await this.guestRepository.delete({ id: id });
    return guest;
  }
}
