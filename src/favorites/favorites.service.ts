import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  async getFavorites() {
    const favorites = await this.db.favorites.findMany();
    if (!favorites)
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later',
      );

    const albums = await Promise.all(
      favorites.albums.map((albumId) => this.db.albums.findUnique(albumId)),
    );
    const artists = await Promise.all(
      favorites.artists.map((artistId) => this.db.artists.findUnique(artistId)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((trackId) => this.db.tracks.findUnique(trackId)),
    );

    const result = {
      albums,
      artists,
      tracks,
    };

    return result;
  }

  async createFavorites(favoriteType: string, id: string) {
    const favorites = await this.db.favorites.create(favoriteType, id);

    if (!favorites)
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later',
      );

    const albums = await Promise.all(
      favorites.albums.map((albumId) => this.db.albums.findUnique(albumId)),
    );
    const artists = await Promise.all(
      favorites.artists.map((artistId) => this.db.artists.findUnique(artistId)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((trackId) => this.db.tracks.findUnique(trackId)),
    );

    const result = {
      albums,
      artists,
      tracks,
    };

    return result;
  }
  /*

  async deleteFavorites(id: string) {
    const favorites = await this.db.favorites.findUnique(id);
    if (!favorites)
      throw new NotFoundException(`Favorites with id ${id} does not exist`);

    const isDeleted = await this.db.favorites.delete(id);
    if (!isDeleted)
      throw new InternalServerErrorException(
        'Something went wrong. Try again later',
      );

    return null;
  }*/
}
