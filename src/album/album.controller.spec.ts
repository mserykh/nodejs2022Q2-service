import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

describe('albumController', () => {
  let albumController: AlbumController;

  const mockAlbumService = {
    createAlbum: jest.fn(async (dto) => {
      return {
        id: uuidv4(),
        ...dto,
      };
    }),
    editAlbum: jest.fn(async (id: string, dto) => {
      return {
        id: id,
        ...dto,
      };
    }),
    deleteAlbum: jest.fn(async (id: string) => {
      return null;
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(albumController).toBeDefined();
  });

  describe('Method create of the Album Controller', () => {
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

  describe('Method update of the Album Controller', () => {
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

    it('should update an album', async () => {
      const dto = {
        name: 'Ritual',
        year: 1957,
        artistId: null,
      };

      const album = await albumController.editAlbum(uuidv4(), dto);

      expect(album).toEqual({
        id: expect.any(String),
        ...dto,
      });
    });

    it('should be called', async () => {
      const dto = {
        name: 'Ritual',
        year: 1957,
        artistId: null,
      };

      const album = await albumController.editAlbum(uuidv4(), dto);

      expect(mockAlbumService.editAlbum).toHaveBeenCalled();
    });

    it('should update an album with new album name', async () => {
      const dto = {
        name: 'Hard Bop',
        year: 1957,
        artistId: null,
      };

      const newDto = {
        name: 'Ritual',
        year: 1957,
        artistId: null,
      };

      const album = await albumController.createAlbum(dto);
      const updateAlbum = await albumController.editAlbum(album.id, newDto);

      expect(updateAlbum).toEqual({
        id: album.id,
        ...newDto,
      });
    });
  });

  describe('Method delete of the Album Controller', () => {
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

    it('should delete an album', async () => {
      const dto = {
        name: 'Ritual',
        year: 1957,
        artistId: null,
      };

      const album = await albumController.editAlbum(uuidv4(), dto);

      expect(album).toEqual({
        id: expect.any(String),
        ...dto,
      });
    });

    it('should be called', async () => {
      const dto = {
        name: 'Ritual',
        year: 1957,
        artistId: null,
      };

      const album = await albumController.editAlbum(uuidv4(), dto);

      expect(mockAlbumService.editAlbum).toHaveBeenCalled();
    });

  });
});
