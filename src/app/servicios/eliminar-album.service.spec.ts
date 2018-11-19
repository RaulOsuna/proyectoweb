import { TestBed } from '@angular/core/testing';

import { EliminarAlbumService } from './eliminar-album.service';

describe('EliminarAlbumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarAlbumService = TestBed.get(EliminarAlbumService);
    expect(service).toBeTruthy();
  });
});
