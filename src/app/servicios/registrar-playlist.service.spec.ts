import { TestBed } from '@angular/core/testing';

import { RegistrarPlaylistService } from './registrar-playlist.service';

describe('RegistrarPlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarPlaylistService = TestBed.get(RegistrarPlaylistService);
    expect(service).toBeTruthy();
  });
});
