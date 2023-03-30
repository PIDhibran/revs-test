import { TestBed } from '@angular/core/testing';

import { DoubleAuthGuard } from './double-auth.guard';

describe('DoubleAuthGuard', () => {
  let guard: DoubleAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoubleAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
