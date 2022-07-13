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

import { FavoritesRepsonse } from './entities/favorites.entity';
import { FavoritesService } from './favorites.service';
import { FavoriteItemType } from './favorites.types';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(): Promise<FavoritesRepsonse> {
    return await this.favoritesService.getFavorites();
  }

  @Post('artist/:id')
  async addFavoritesArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const result = await this.favoritesService.createFavorites(
      FavoriteItemType.artist,
      id,
    );
    return result;
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('artist/:id')
  async deleteFavoritesArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteFavorites(
      FavoriteItemType.artist,
      id,
    );
  }

  @Post('album/:id')
  async addFavoritesAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const result = await this.favoritesService.createFavorites(
      FavoriteItemType.album,
      id,
    );
    return result;
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('album/:id')
  async deleteFavoritesAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteFavorites(
      FavoriteItemType.album,
      id,
    );
  }

  @Post('track/:id')
  async addFavoritesTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const result = await this.favoritesService.createFavorites(
      FavoriteItemType.track,
      id,
    );
    return result;
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('track/:id')
  async deleteFavoritesTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteFavorites(
      FavoriteItemType.track,
      id,
    );
  }
}
