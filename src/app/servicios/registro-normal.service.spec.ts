import { TestBed } from '@angular/core/testing';

import { RegistroNormalService } from './registro-normal.service';

describe('RegistroNormalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroNormalService = TestBed.get(RegistroNormalService);
    expect(service).toBeTruthy();
  });
});
