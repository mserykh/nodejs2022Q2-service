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

    // const result = { ...artist };
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

  // deleteRef(id: string) {
  //   this.db.albums.albums.forEach((item) => {
  //     if (item.artistId === id) item.artistId = null;
  //   });

  //   this.db.tracks.tracks.forEach((item) => {
  //     if (item.artistId === id) item.artistId = null;
  //   });
  // }

  async deleteArtist(id: string) {
    const artist = this.artistsRepository.findOneBy({ id });
    if (!artist)
      throw new NotFoundException(`Artist with id ${id} does not exist`);

    // const isFavorite = this.db.favorites.isFavorite(id);
    // if (isFavorite) await this.db.favorites.delete(FavoriteItemType.artist, id);

    // this.deleteRef(id);

    await this.artistsRepository.delete({ id });
    // if (!isDeleted)
    //   throw new InternalServerErrorException(
    //     'Something went wrong. Try again later',
    //   );

    return null;
  }
}
