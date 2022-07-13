import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { Track } from 'src/db/db.schema';
import { CreateTrackDto, EditTrackDto } from './dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getTracks(): Promise<Track[]> {
    return await this.trackService.getTracks();
  }

  @Post()
  async createTrack(@Body() dto: CreateTrackDto) {
    return await this.trackService.createTrack(dto);
  }

  @Get(':id')
  async getTrackById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Track> {
    return await this.trackService.getTrackById(id);
  }

  @Put(':id')
  async editTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: EditTrackDto,
  ): Promise<Track> {
    return await this.trackService.editTrack(id, dto);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.trackService.deleteTrack(id);
  }
}
