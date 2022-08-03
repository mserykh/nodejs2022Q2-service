import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { FavoritesEntity } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
  ) {}

  async getFavorites() {
    const favorites = await this.favoritesRepository.find({
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    return favorites[0] || { albums: [], artists: [], tracks: [] };
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) throw new NotFoundException(`Album with ${id} does not exist`);

    const isFavorite = await this.favoritesRepository
      .createQueryBuilder('favorites')
      .leftJoinAndSelect('favorites.albums', 'albums')
      .where('albums.id = :id', { id })
      .getOne();

    if (isFavorite)
      throw new UnprocessableEntityException(
        `Favorite album with id ${id} already added`,
      );

    const favorites = await this.getFavorites();
    favorites.albums.push(album);
    this.favoritesRepository.save(favorites);

    return { message: 'Added successfully' };
  }

  async deleteAlbumFromFavorites(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album)
      throw new UnprocessableEntityException(`Album with ${id} does not exist`);

    const isFavorite = await this.favoritesRepository
      .createQueryBuilder('favorites')
      .leftJoinAndSelect('favorites.albums', 'albums')
      .where('albums.id = :id', { id })
      .getOne();

    if (!isFavorite)
      throw new NotFoundException(
        `Favorite artist with id ${id} was not in Favorites. Unable to delete`,
      );

    const favorites = await this.getFavorites();
    favorites.albums.filter((album) => album.id !== id);
    this.favoritesRepository.save(favorites);

    return null;
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist)
      throw new NotFoundException(`Artist with ${id} does not exist`);

    const isFavorite = await this.favoritesRepository
      .createQueryBuilder('favorites')
      .leftJoinAndSelect('favorites.artists', 'artists')
      .where('artists.id = :id', { id })
      .getOne();

    if (isFavorite)
      throw new UnprocessableEntityException(
        `Favorite artist with id ${id} already added`,
      );

    const favorites = await this.getFavorites();
    favorites.artists.push(artist);
    this.favoritesRepository.save(favorites);

    return { message: 'Added successfully' };
  }

  async deleteArtistFromFavorites(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist)
      throw new UnprocessableEntityException(
        `Artist with ${id} does not exist`,
      );

    const isFavorite = this.favoritesRepository.findOne({
      where: {
        id,
      },
      relations: {
        artists: true,
      },
    });

    if (!isFavorite)
      throw new NotFoundException(
        `Favorite artist with id ${id} was not in Favorites. Unable to delete`,
      );

    const favorites = await this.getFavorites();
    favorites.artists.filter((artist) => artist.id !== id);
    this.favoritesRepository.save(favorites);

    return null;
  }

  async addTrackToFavorites(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) throw new NotFoundException(`Track with ${id} does not exist`);

    const isFavorite = await this.favoritesRepository
      .createQueryBuilder('favorites')
      .leftJoinAndSelect('favorites.tracks', 'tracks')
      .where('tracks.id = :id', { id })
      .getOne();

    if (isFavorite)
      throw new UnprocessableEntityException(
        `Favorite track with id ${id} already added`,
      );

    const favorites = await this.getFavorites();
    favorites.tracks.push(track);
    this.favoritesRepository.save(favorites);

    return { message: 'Added successfully' };
  }

  async deleteTrackFromFavorites (id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track)
      throw new UnprocessableEntityException(`Track with ${id} does not exist`);

    const isFavorite = this.favoritesRepository.findOne({
      where: {
        id,
      },
      relations: {
        tracks: true,
      },
    });

    if (!isFavorite)
      throw new NotFoundException(
        `Favorite track with id ${id} was not in Favorites. Unable to delete`,
      );

    const favorites = await this.getFavorites();
    favorites.tracks.filter((track) => track.id !== id);
    this.favoritesRepository.save(favorites);

    return null;
  }
}
