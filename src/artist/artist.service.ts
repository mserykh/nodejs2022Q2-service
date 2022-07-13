import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { DbService } from 'src/db/db.service';
import { CreateArtistDto, EditArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  async getArtists() {
    const artists = await this.db.artists.findMany();
    const result = [...artists];

    return result;
  }

  async getArtistById(id: string) {
    const artist = await this.db.artists.findUnique(id);
    if (!artist)
      throw new NotFoundException(`Artist with id ${id} does not exist`);

    const result = { ...artist };
    return result;
  }

  async createArtist(dto: CreateArtistDto) {
    const Artist = await this.db.artists.create(dto);
    const result = { ...Artist };

    return result;
  }

  async editArtist(id: string, dto: EditArtistDto) {
    const Artist = await this.db.artists.findUnique(id);
    if (!Artist)
      throw new NotFoundException(`Artist with id ${id} does not exist`);

    const updateArtist = await this.db.artists.update(id, dto);
    const result = { ...updateArtist };

    return result;
  }

  async deleteArtist(id: string) {
    const Artist = await this.db.artists.findUnique(id);
    if (!Artist)
      throw new NotFoundException(`Artist with id ${id} does not exist`);

    const isDeleted = await this.db.artists.delete(id);
    if (!isDeleted)
      throw new InternalServerErrorException(
        'Something went wrong. Try again later',
      );

    return null;
  }
}
