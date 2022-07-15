import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FavoriteItemType } from 'src/favorites/favorites.types';
import { CreateAlbumDto, EditAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  async getAlbums() {
    const albums = await this.db.albums.findMany();
    const result = [...albums];

    return result;
  }

  async getAlbumById(id: string) {
    const album = await this.db.albums.findUnique(id);
    if (!album)
      throw new NotFoundException(`Album with id ${id} does not exist`);

    const result = { ...album };
    return result;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const album = await this.db.albums.create(dto);
    const result = { ...album };

    return result;
  }

  async editAlbum(id: string, dto: EditAlbumDto) {
    const album = await this.db.albums.findUnique(id);
    if (!album)
      throw new NotFoundException(`Album with id ${id} does not exist`);

    const updateAlbum = await this.db.albums.update(id, dto);
    const result = { ...updateAlbum };

    return result;
  }

  async deleteAlbum(id: string) {
    const album = await this.db.albums.findUnique(id);
    if (!album)
      throw new NotFoundException(`Album with id ${id} does not exist`);

    const isFavorite = this.db.favorites.isFavorite(id);
    if (isFavorite) await this.db.favorites.delete(FavoriteItemType.album, id);

    const isDeleted = await this.db.albums.delete(id);
    if (!isDeleted)
      throw new InternalServerErrorException(
        'Something went wrong. Try again later',
      );

    return null;
  }
}
