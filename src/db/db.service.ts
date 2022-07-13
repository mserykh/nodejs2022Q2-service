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
    const updatedArtist = this.artists.filter((artist) => artist.id !== id);
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

  async findUnique(id: string): Promise<Track> {
    const track = this.tracks.find((track) => id === track.id);

    return track;
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = {
      ...dto,
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
    const updatedTrack = this.tracks.filter((track) => track.id !== id);
    this.tracks = updatedTrack;
    return true;
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
    const updatedAlbum = this.albums.filter((album) => album.id !== id);
    this.albums = updatedAlbum;
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
