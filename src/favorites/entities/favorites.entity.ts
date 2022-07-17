import { Album, Artist, Track } from 'src/db/db.schema';

export class FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
