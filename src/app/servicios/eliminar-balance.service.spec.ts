import { TestBed } from '@angular/core/testing';

import { EliminarBalanceService } from './eliminar-balance.service';

describe('EliminarBalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarBalanceService = TestBed.get(EliminarBalanceService);
    expect(service).toBeTruthy();
  });
});
