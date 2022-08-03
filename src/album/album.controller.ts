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

import { Album } from 'src/db/db.schema';
import { CreateAlbumDto, EditAlbumDto } from './dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums();
  }

  @Post()
  async createAlbum(@Body() dto: CreateAlbumDto) {
    return await this.albumService.createAlbum(dto);
  }

  @Get(':id')
  async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.getAlbumById(id);
  }

  @Put(':id')
  async editAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: EditAlbumDto,
  ) {
    return await this.albumService.editAlbum(id, dto);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.deleteAlbum(id);
  }
}
