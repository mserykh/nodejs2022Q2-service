import { Exclude } from 'class-transformer';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('favourite')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => ArtistEntity, { cascade: true })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { cascade: true })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { cascade: true })
  @JoinTable()
  tracks: TrackEntity[];
}

import { Album, Artist, Track } from 'src/db/db.schema';

export class FavoritesRepsonse {
  @Exclude()
  id: string;
  
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
