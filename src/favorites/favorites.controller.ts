import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getFavorites() {
    const result = await this.favoritesService.getFavorites();

    return result;
  }

  @Post('artist/:id')
  async addFavoritesArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const result = await this.favoritesService.addArtistToFavorites(id);
    return result;
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('artist/:id')
  async deleteFavoritesArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteArtistFromFavorites(id);
  }

  @Post('album/:id')
  async addFavoritesAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const result = await this.favoritesService.addAlbumToFavorites(id);
    return result;
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('album/:id')
  async deleteFavoritesAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('track/:id')
  async addFavoritesTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const result = await this.favoritesService.addTrackToFavorites(id);
    return result;
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('track/:id')
  async deleteFavoritesTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteTrackFromFavorites(id);
  }
}
