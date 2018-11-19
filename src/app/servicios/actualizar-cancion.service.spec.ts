import { TestBed } from '@angular/core/testing';

import { ActualizarCancionService } from './actualizar-cancion.service';

describe('ActualizarCancionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualizarCancionService = TestBed.get(ActualizarCancionService);
    expect(service).toBeTruthy();
  });
});
