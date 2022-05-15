import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CardService } from './card.service';
import { Response } from 'express';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('api/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/create')
  async createDataCard(
    @Res() res: Response,
    @Body() body: any,
  ): Promise<Response<any>> {
    const data = await this.cardService.createDataCard(body);
    return res.status(HttpStatus.CREATED).json({
      message: 'Card has been successfully created',
      data,
    });
  }

  @Get('/list')
  async getAllDataCard(@Res() res: Response): Promise<Response<any>> {
    const data = await this.cardService.getAllDataCard();
    return res.status(HttpStatus.OK).json({
      message: 'Get Data successfully',
      data,
    });
  }

  @Get('/list/:id')
  async getDataCardById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const data = await this.cardService.getDataCardById(id);
    return res.status(HttpStatus.OK).json({
      message: 'Get Data By ID successfully',
      data,
    });
  }

  @Patch('/update/:id')
  async updateDataCard(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const data = await this.cardService.updateDataCard(id, body);
    return res.status(HttpStatus.OK).json({
      message: 'Update Data successfully',
      data,
    });
  }

  @Delete('/delete/:id')
  async deleteDataCard(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const data = await this.cardService.deleteDataCard(id);
    return res.status(HttpStatus.OK).json({
      message: 'Delete Data successfully',
      data,
    });
  }
}
