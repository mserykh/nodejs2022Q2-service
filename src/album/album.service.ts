import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbService } from 'src/db/db.service';
import { FavoriteItemType } from 'src/favorites/favorites.types';
import { Repository } from 'typeorm';
import { CreateAlbumDto, EditAlbumDto } from './dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  async getAlbums() {
    const albums = await this.albumsRepository.find();

    return albums;
  }

  async getAlbumById(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album)
      throw new NotFoundException(`Album with id ${id} does not exist`);

    // const result = { ...album };
    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const album = this.albumsRepository.create(dto);

    return this.albumsRepository.save(album);
  }

  async editAlbum(id: string, dto: EditAlbumDto) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album)
      throw new NotFoundException(`Album with id ${id} does not exist`);
    await this.albumsRepository.update(id, dto);

    return this.getAlbumById(id);
  }

  // deleteRef(id: string) {
  //   this.db.tracks.tracks.forEach((item) => {
  //     if (item.albumId === id) item.albumId = null;
  //   });
  // }

  async deleteAlbum(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album)
      throw new NotFoundException(`Album with id ${id} does not exist`);

    // const isFavorite = this.db.favorites.isFavorite(id);
    // if (isFavorite) await this.db.favorites.delete(FavoriteItemType.album, id);

    // this.deleteRef(id);

    await this.albumsRepository.delete({ id });
    // if (!isDeleted)
    //   throw new InternalServerErrorException(
    //     'Something went wrong. Try again later',
    //   );

    return null;
  }
}
