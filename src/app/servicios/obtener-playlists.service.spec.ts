import { TestBed } from '@angular/core/testing';

import { ObtenerPlaylistsService } from './obtener-playlists.service';

describe('ObtenerPlaylistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerPlaylistsService = TestBed.get(ObtenerPlaylistsService);
    expect(service).toBeTruthy();
  });
});
