import { TestBed } from '@angular/core/testing';

import { ObtenerBalanceService } from './obtener-balance.service';

describe('ObtenerBalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerBalanceService = TestBed.get(ObtenerBalanceService);
    expect(service).toBeTruthy();
  });
});
