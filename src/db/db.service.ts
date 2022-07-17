import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateAlbumDto, EditAlbumDto } from 'src/album/dto';
import { CreateArtistDto, EditArtistDto } from 'src/artist/dto';
import { CreateTrackDto, EditTrackDto } from 'src/track/dto';
import { UpdatePasswordDto } from 'src/user/dto';
import { Album, Artist, Favorites, Track, User } from './db.schema';

@Injectable()
export class DbService {
  users = new DbUsers();
  artists = new DbArtists();
  tracks = new DbTracks();
  albums = new DbAlbums();
  favorites = new DbFavorites();
}

class DbUsers {
  users: User[];
  constructor() {
    this.users = [
      {
        login: 'admin',
        password: 'password',
        id: '2e1cb7fc-7ce6-4424-b60e-7c546979da5f',
        createdAt: 1657641236708,
        updatedAt: 1657641236708,
        version: 1,
      },
      {
        login: 'marie',
        password: 'secret',
        id: '9f9ff081-863d-4710-a0d2-8c0d95aa994b',
        createdAt: 1657641236708,
        updatedAt: 1657641236708,
        version: 1,
      },
    ];
  }

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async findUnique(id: string): Promise<User> {
    const user = this.users.find((user) => id === user.id);

    return user;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);

    this.users[index] = {
      ...this.users[index],
      password: dto.newPassword,
      updatedAt: Date.now(),
      version: this.users[index].version + 1,
    };

    const updatedUser = this.users[index];

    return updatedUser;
  }

  async delete(id: string) {
    const updatedUsers = this.users.filter((user) => user.id !== id);
    this.users = updatedUsers;
    return true;
  }
}

class DbArtists {
  artists: Artist[];

  constructor() {
    this.artists = [
      {
        id: '401a19e8-654d-4bc1-9101-0dd2808da1c1',
        name: 'name',
        grammy: true,
      },
      {
        id: '426c8850-1cce-4f47-8128-bd2ddf0cea3a',
        name: 'new name',
        grammy: false,
      },
    ];
  }

  findMany() {
    return this.artists;
  }

  async findUnique(id: string): Promise<Artist> {
    const artist = this.artists.find((artist) => id === artist.id);

    return artist;
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = {
      ...dto,
      id: randomUUID(),
    };

    this.artists.push(artist);
    return artist;
  }

  async update(id: string, dto: EditArtistDto) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = {
      ...this.artists[index],
      ...dto,
    };
    const updatedArtist = this.artists[index];

    return updatedArtist;
  }

  async delete(id: string) {
    const updatedArtists = this.artists.filter((artist) => artist.id !== id);
    this.artists = updatedArtists;

    return true;
  }
}

class DbTracks {
  tracks: Track[];

  constructor() {
    this.tracks = [
      {
        id: '5765d811-990f-4c5d-8350-317df976d043',
        name: 'track',
        artistId: '401a19e8-654d-4bc1-9101-0dd2808da1c1',
        albumId: '27180c8b-dae9-4c46-9f16-047300fe30a5',
        duration: 5,
      },
    ];
  }

  findMany() {
    return this.tracks;
  }

  async findUnique(id: string): Promise<Track> {
    const track = this.tracks.find((track) => id === track.id);

    return track;
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = {
      ...dto,
      artistId: dto.artistId ? dto.artistId : null,
      albumId: dto.albumId ? dto.albumId : null,
      id: randomUUID(),
    };

    this.tracks.push(track);
    return track;
  }

  async update(id: string, dto: EditTrackDto) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = {
      ...this.tracks[index],
      ...dto,
    };
    const updatedTrack = this.tracks[index];

    return updatedTrack;
  }

  async delete(id: string) {
    const updatedTracks = this.tracks.filter((track) => track.id !== id);
    this.tracks = updatedTracks;
    return true;
  }
}

class DbAlbums {
  albums: Album[];

  constructor() {
    this.albums = [
      {
        id: '27180c8b-dae9-4c46-9f16-047300fe30a5',
        name: 'album',
        year: 1966,
        artistId: '401a19e8-654d-4bc1-9101-0dd2808da1c1',
      },
    ];
  }

  findMany() {
    return this.albums;
  }

  async findUnique(id: string) {
    const album = this.albums.find((album) => id === album.id);

    return album;
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = {
      ...dto,
      artistId: dto.artistId ? dto.artistId : null,
      id: randomUUID(),
    };

    this.albums.push(album);
    return album;
  }

  async update(id: string, dto: EditAlbumDto) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums[index] = {
      ...this.albums[index],
      ...dto,
    };
    const updatedAlbum = this.albums[index];

    return updatedAlbum;
  }

  async delete(id: string) {
    const updatedAlbum = this.albums.filter((album) => album.id !== id);
    this.albums = updatedAlbum;
    return true;
  }
}

class DbFavorites {
  favorites: Favorites;

  constructor() {
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  findMany() {
    return this.favorites;
  }

  isFavorite(id: string): boolean {
    const isFavorite = Object.values(this.favorites).find((ids: string[]) =>
      ids.some((i) => i === id),
    );

    return isFavorite;
  }

  async create(favoriteType: string, id: string): Promise<void | Favorites> {
    this.favorites[favoriteType].push(id);
    return this.favorites;
  }

  async delete(favoriteType: string, id: string): Promise<void | Favorites> {
    const favorites = this.favorites[favoriteType] as string[];
    const result = favorites.filter((itemId) => itemId !== id);

    this.favorites[favoriteType] = [];
    this.favorites[favoriteType] = [...result];

    return this.favorites;
  }
}
