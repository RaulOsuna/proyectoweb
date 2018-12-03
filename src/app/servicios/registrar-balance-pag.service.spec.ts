import { TestBed } from '@angular/core/testing';

import { RegistrarBalancePagService } from './registrar-balance-pag.service';

describe('RegistrarBalancePagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarBalancePagService = TestBed.get(RegistrarBalancePagService);
    expect(service).toBeTruthy();
  });
});
