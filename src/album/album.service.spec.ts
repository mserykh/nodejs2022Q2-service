import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';

describe('albumService', () => {
  let service: AlbumService;

  const mockAlbumsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((album) =>
        Promise.resolve({ id: uuidv4(), ...album }),
      ),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: getRepositoryToken(AlbumEntity),
          useValue: mockAlbumsRepository,
        },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new album record and return it', async () => {
    const dto = {
      name: 'Hard Bop',
      year: 1957,
      artistId: null,
    };

    const album = await service.createAlbum(dto);
    expect(album).toEqual({
      id: expect.any(String),
      ...dto,
    });
  });
});
