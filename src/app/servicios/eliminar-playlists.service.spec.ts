import { TestBed } from '@angular/core/testing';

import { EliminarPlaylistsService } from './eliminar-playlists.service';

describe('EliminarPlaylistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarPlaylistsService = TestBed.get(EliminarPlaylistsService);
    expect(service).toBeTruthy();
  });
});
