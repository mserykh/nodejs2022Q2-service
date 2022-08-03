import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserEntity } from './user/entities/user.entity';
import { AlbumEntity } from './album/entities/album.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { TrackEntity } from './track/entities/track.entity';
import { FavoritesEntity } from './favorites/entities/favorites.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION') as 'postgres',
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        post: config.get<number>('POSTGRES_PORT'),
        entities: [
          UserEntity,
          AlbumEntity,
          ArtistEntity,
          TrackEntity,
          FavoritesEntity,
        ],
        synchronize: true,
      }),
    }),
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    DbModule,
  ],
})
export class AppModule {}
