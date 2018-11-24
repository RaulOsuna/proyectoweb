import { TestBed } from '@angular/core/testing';

import { RegistrarBalanceService } from './registrar-balance.service';

describe('RegistrarBalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarBalanceService = TestBed.get(RegistrarBalanceService);
    expect(service).toBeTruthy();
  });
});
