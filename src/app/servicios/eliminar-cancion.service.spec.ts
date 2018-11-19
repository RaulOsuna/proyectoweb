import { TestBed } from '@angular/core/testing';

import { EliminarCancionService } from './eliminar-cancion.service';

describe('EliminarCancionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarCancionService = TestBed.get(EliminarCancionService);
    expect(service).toBeTruthy();
  });
});
