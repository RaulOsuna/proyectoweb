import { TestBed } from '@angular/core/testing';

import { EliminarRatingsService } from './eliminar-ratings.service';

describe('EliminarRatingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarRatingsService = TestBed.get(EliminarRatingsService);
    expect(service).toBeTruthy();
  });
});
