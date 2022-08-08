import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { AlbumEntity } from '../album/entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { FavoritesEntity } from '../favorites/entities/favorites.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { UserEntity } from '../user/entities/user.entity';

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
      migrations: ['/dist/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: true,
      migrationsTransactionMode: 'each',
      migrationsRun: true,
    };
  },
};
