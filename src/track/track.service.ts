import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FavoriteItemType } from 'src/favorites/favorites.types';
import { CreateTrackDto, EditTrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  async getTracks() {
    const tracks = await this.db.tracks.findMany();
    const result = [...tracks];

    return result;
  }

  async getTrackById(id: string) {
    const track = await this.db.tracks.findUnique(id);
    if (!track)
      throw new NotFoundException(`Track with id ${id} does not exist`);

    const result = { ...track };
    return result;
  }

  async createTrack(dto: CreateTrackDto) {
    const track = await this.db.tracks.create(dto);
    const result = { ...track };

    return result;
  }

  async editTrack(id: string, dto: EditTrackDto) {
    const track = await this.db.tracks.findUnique(id);
    if (!track)
      throw new NotFoundException(`Track with id ${id} does not exist`);

    const updateTrack = await this.db.tracks.update(id, dto);
    const result = { ...updateTrack };

    return result;
  }

  async deleteTrack(id: string) {
    const track = await this.db.tracks.findUnique(id);
    if (!track)
      throw new NotFoundException(`Track with id ${id} does not exist`);

    const isFavorite = this.db.favorites.isFavorite(id);
    if (isFavorite) await this.db.favorites.delete(FavoriteItemType.track, id);

    const isDeleted = await this.db.tracks.delete(id);
    if (!isDeleted)
      throw new InternalServerErrorException(
        'Something went wrong. Try again later',
      );

    return null;
  }
}
