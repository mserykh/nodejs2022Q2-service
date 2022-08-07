import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

describe('albumController', () => {
  let albumController: AlbumController;

  const mockAlbumService = {
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [AlbumService],
    })
      .overrideProvider(AlbumService)
      .useValue(mockAlbumService)
      .compile();

    albumController = module.get<AlbumController>(AlbumController);
  });

  it('should be defined', () => {
    expect(albumController).toBeDefined();
  });

});
describe('Method create of the Album Controller', () => {
  let albumController: AlbumController;

  const mockAlbumService = {
    createAlbum: jest.fn(async (dto) => {
      return {
        id: uuidv4(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [AlbumService],
    })
      .overrideProvider(AlbumService)
      .useValue(mockAlbumService)
      .compile();

    albumController = module.get<AlbumController>(AlbumController);
  });

  it('should create a new album', async () => {
    const dto = {
      name: 'Hard Bop',
      year: 1957,
      artistId: null,
    };

    const album = await albumController.createAlbum(dto);

    expect(album).toEqual({
      id: expect.any(String),
      ...dto,
    });
  });

  it('should be called', async () => {
    const dto = {
      name: 'Hard Bop',
      year: 1957,
      artistId: null,
    };

    const album = await albumController.createAlbum(dto);

    expect(mockAlbumService.createAlbum).toHaveBeenCalled();
  });

  it('should be called with the passed dto', async () => {
    const dto = {
      name: 'Hard Bop',
      year: 1957,
      artistId: null,
    };

    const album = await albumController.createAlbum(dto);

    expect(mockAlbumService.createAlbum).toHaveBeenCalledWith(dto);

    expect(mockAlbumService.createAlbum).toHaveBeenCalledWith({
      name: 'Hard Bop',
      year: 1957,
      artistId: null,
    });
  });

  it('should return an object with id', async () => {
    const dto = {
      name: 'Hard Bop',
      year: 1957,
      artistId: null,
    };

    const album = await albumController.createAlbum(dto);

    expect(album).toHaveProperty('id');
    expect(album).toHaveProperty('id', expect.any(String));
  });
});
