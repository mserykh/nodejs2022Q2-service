import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm/data-source';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: config.get('TYPEORM_CONNECTION') as 'postgres',
      username: config.get<string>('POSTGRES_USER'),
      password: config.get<string>('POSTGRES_PASSWORD'),
      database: config.get<string>('POSTGRES_DB'),
      port: config.get<number>('POSTGRES_PORT'),
      entities: [
        UserEntity,
        AlbumEntity,
        ArtistEntity,
        TrackEntity,
        FavoritesEntity,
      ],
     // entities: [__dirname + './../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true
    };
  },
};