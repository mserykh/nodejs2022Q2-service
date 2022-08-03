import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];
}
