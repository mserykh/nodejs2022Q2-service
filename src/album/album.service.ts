import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async deleteAlbum(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album)
      throw new NotFoundException(`Album with id ${id} does not exist`);

    await this.albumsRepository.delete({ id });

    return null;
  }
}
