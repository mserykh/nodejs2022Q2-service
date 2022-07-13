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

import { Artist } from 'src/db/db.schema';
import { CreateArtistDto, EditArtistDto } from './dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getArtists(): Promise<Artist[]> {
    return await this.artistService.getArtists();
  }

  @Post()
  async createAtrist(@Body() dto: CreateArtistDto) {
    return await this.artistService.createArtist(dto);
  }

  @Get(':id')
  async getArtistById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    return await this.artistService.getArtistById(id);
  }

  @Put(':id')
  async editArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: EditArtistDto,
  ): Promise<Artist> {
    return await this.artistService.editArtist(id, dto);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.artistService.deleteArtist(id);
  }
}
