import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    const doesExist = await this.db[favoriteType].findUnique(id);

    if (!doesExist)
      throw new UnprocessableEntityException(
        `${favoriteType} with ${id} does not exist`,
      );

    const isFavorite = this.db.favorites.isFavorite(id);
    if (isFavorite)
      throw new NotFoundException(
        `Favorite ${favoriteType} with id ${id} already added`,
      );

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

  async deleteFavorites(favoriteType: string, id: string) {
    const doesExist = await this.db[favoriteType].findUnique(id);

    if (!doesExist)
      throw new UnprocessableEntityException(
        `${favoriteType} with ${id} does not exist`,
      );

    const favorites = this.db.favorites.isFavorite(id);
    if (!favorites)
      throw new NotFoundException(
        `Favorite ${favoriteType} with id ${id} was not in Favorites. Unable to delete`,
      );

    const isDeleted = await this.db.favorites.delete(favoriteType, id);
    if (!isDeleted)
      throw new InternalServerErrorException(
        'Something went wrong. Try again later',
      );

    return null;
  }
}
