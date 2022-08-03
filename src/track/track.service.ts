import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbService } from 'src/db/db.service';
import { FavoriteItemType } from 'src/favorites/favorites.types';
import { Repository } from 'typeorm';
import { threadId } from 'worker_threads';
import { CreateTrackDto, EditTrackDto } from './dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async getTracks() {
    const tracks = await this.tracksRepository.find();

    return tracks;
  }

  async getTrackById(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track)
      throw new NotFoundException(`Track with id ${id} does not exist`);

    // const result = { ...track };
    return track;
  }

  async createTrack(dto: CreateTrackDto) {
    const track = this.tracksRepository.create(dto);

    return await this.tracksRepository.save(track);
  }

  async editTrack(id: string, dto: EditTrackDto) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track)
      throw new NotFoundException(`Track with id ${id} does not exist`);

    await this.tracksRepository.update(id, dto);

    return await this.getTrackById(id);
  }

  async deleteTrack(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track)
      throw new NotFoundException(`Track with id ${id} does not exist`);

    // const isFavorite = this.tracksRepository.isFavorite(id);
    // if (isFavorite) await this.tracksRepository.delete(FavoriteItemType.track, id);

    // const isDeleted = await this.db.tracks.delete(id);
    // if (!isDeleted)
    //   throw new InternalServerErrorException(
    //     'Something went wrong. Try again later',
    //   );
    await this.tracksRepository.delete({ id });

    return null;
  }
}
