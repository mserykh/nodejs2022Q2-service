import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  @Column()
  duration: number;
}
