import { Injectable } from '@nestjs/common';
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
  users: User[] = [
    {
      login: 'admin',
      password: 'password',
      id: '1',
      createdAt: 1657641236708,
      updatedAt: 1657641236708,
      version: 1,
    },
    {
      login: 'marie',
      password: 'secret',
      id: '2',
      createdAt: 1657641236708,
      updatedAt: 1657641236708,
      version: 1,
    },
  ];

  constructor() {}

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async findUnique(id: string): Promise<User> {
    const user = this.users.find((user) => id === user.id);
    return user;
  }
}

class DbArtists {
  artists: Artist[] = [];

  constructor() {}

  findMany() {
    return this.artists;
  }
}

class DbTracks {
  tracks: Track[] = [];

  constructor() {}

  findMany() {
    return this.tracks;
  }
}

class DbAlbums {
  albums: Album[] = [];

  constructor() {}

  findMany() {
    return this.albums;
  }
}

class DbFavorites {
  favorites: Favorites[] = [];

  constructor() {}

  findMany() {
    return this.favorites;
  }
}
