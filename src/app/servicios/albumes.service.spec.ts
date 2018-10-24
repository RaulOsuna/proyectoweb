import { TestBed } from '@angular/core/testing';

import { AlbumesService } from './albumes.service';

describe('AlbumesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumesService = TestBed.get(AlbumesService);
    expect(service).toBeTruthy();
  });
});
