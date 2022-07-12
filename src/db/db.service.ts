import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAlbumDto, EditAlbumDto } from 'src/album/dto';
import { CreateArtistDto, EditArtistDto } from 'src/artist/dto';

import { CreateUserDto, UpdatePasswordDto } from 'src/user/dto';
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

  async create(dto: CreateUserDto): Promise<User> {
    const user = {
      ...dto,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    this.users.push(user);
    return user;
  }

  async update(id: string, dto: UpdatePasswordDto) {
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
    this.artists = [];
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
    const updatedArtist = this.artists.filter((user) => user.id !== id);
    this.artists = updatedArtist;
    return true;
  }
}

class DbTracks {
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  findMany() {
    return this.tracks;
  }
}

class DbAlbums {
  albums: Album[];

  constructor() {
    this.albums = [];
  }

  findMany() {
    return this.albums;
  }

  async findUnique(id: string): Promise<Album> {
    const album = this.albums.find((album) => id === album.id);

    return album;
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = {
      ...dto,
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
    const updatedArtist = this.albums.filter((user) => user.id !== id);
    this.albums = updatedArtist;
    return true;
  }
}

class DbFavorites {
  favorites: Favorites[];

  constructor() {
    this.favorites = [];
  }

  findMany() {
    return this.favorites;
  }
}
