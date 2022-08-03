import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('favourited')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => ArtistEntity, { cascade: true })
  @JoinColumn()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { cascade: true })
  @JoinColumn()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { cascade: true })
  @JoinColumn()
  tracks: TrackEntity[];
}

import { Album, Artist, Track } from 'src/db/db.schema';

export class FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
