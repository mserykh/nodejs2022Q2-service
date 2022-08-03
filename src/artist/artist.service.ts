import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto, EditArtistDto } from './dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getArtists() {
    const artists = await this.artistsRepository.find();

    return artists;
  }

  async getArtistById(id: string) {
    const artist = this.artistsRepository.findOneBy({ id });
    if (!artist)
      throw new NotFoundException(`Artist with id ${id} does not exist`);

    return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    const artist = this.artistsRepository.create(dto);

    return this.artistsRepository.save(artist);
  }

  async editArtist(id: string, dto: EditArtistDto) {
    const artist = this.artistsRepository.findOneBy({ id });
    if (!artist)
      throw new NotFoundException(`Artist with id ${id} does not exist`);
    await this.artistsRepository.update(id, dto);

    return this.getArtistById(id);
  }

  async deleteArtist(id: string) {
    const artist = this.artistsRepository.findOneBy({ id });
    if (!artist)
      throw new NotFoundException(`Artist with id ${id} does not exist`);

    await this.artistsRepository.delete({ id });

    return null;
  }
}
