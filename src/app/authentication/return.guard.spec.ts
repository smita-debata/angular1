import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { returnGuard } from './return.guard';

describe('returnGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => returnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
