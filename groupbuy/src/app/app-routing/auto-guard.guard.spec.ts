import { TestBed, async, inject } from '@angular/core/testing';

import { AutoGuardGuard } from './auto-guard.guard';

describe('AutoGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoGuardGuard]
    });
  });

  it('should ...', inject([AutoGuardGuard], (guard: AutoGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
