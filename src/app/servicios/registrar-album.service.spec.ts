import { TestBed } from '@angular/core/testing';

import { RegistrarAlbumService } from './registrar-album.service';

describe('RegistrarAlbumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarAlbumService = TestBed.get(RegistrarAlbumService);
    expect(service).toBeTruthy();
  });
});
