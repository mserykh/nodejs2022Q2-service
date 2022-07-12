import { Injectable } from '@nestjs/common';
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
  users: User[] = [
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

  constructor() {}

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async findUnique(id: string): Promise<User> {
    const user = this.users.find((user) => id === user.id);
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
