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
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Response } from 'express';

@Controller('api/guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post('/create')
  async createDataGuest(
    @Res() res: Response,
    @Body() body: any,
  ): Promise<Response<any>> {
    const data = await this.guestService.createDataGuest(body);
    return res.status(HttpStatus.CREATED).json({
      message: 'Guest has been successfully created',
      data,
    });
  }

  @Get('/list')
  async getAllDataGuest(@Res() res: Response): Promise<Response<any>> {
    const data = await this.guestService.getAllDataGuest();
    return res.status(HttpStatus.OK).json({
      message: 'Get Data successfully',
      data,
    });
  }

  @Get('/list/:id')
  async getDataGuestById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const data = await this.guestService.getDataGuestById(id);
    return res.status(HttpStatus.OK).json({
      message: 'Get Data By ID successfully',
      data,
    });
  }

  @Patch('/update/:id')
  async updateDataGuest(
    @Param('id') id: number,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const data = await this.guestService.updateDataGuest(id, body);
    return res.status(HttpStatus.OK).json({
      message: 'Update Data successfully',
      data,
    });
  }

  @Delete('/delete/:id')
  async deleteDataGuest(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const data = await this.guestService.deleteDataGuest(id);
    return res.status(HttpStatus.OK).json({
      message: 'Delete Data successfully',
      data,
    });
  }
}
