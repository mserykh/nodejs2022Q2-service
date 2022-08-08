import 'dotenv/config';
import { AlbumEntity } from '../album/entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { FavoritesEntity } from '../favorites/entities/favorites.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { UserEntity } from '../user/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  entities: [
    UserEntity,
    AlbumEntity,
    ArtistEntity,
    TrackEntity,
    FavoritesEntity,
  ],
  migrations: ['/dist/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsTransactionMode: 'each',
  migrationsRun: true,
};

export default databaseConfig;
