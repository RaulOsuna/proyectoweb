import { TestBed } from '@angular/core/testing';

import { RegistroMusicoService } from './registro-musico.service';

describe('RegistroMusicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroMusicoService = TestBed.get(RegistroMusicoService);
    expect(service).toBeTruthy();
  });
});
