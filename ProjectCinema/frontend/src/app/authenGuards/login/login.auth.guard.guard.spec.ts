import { TestBed } from '@angular/core/testing';

import { LoginAuthGuardGuard } from './login.auth.guard.guard';

describe('LoginAuthGuardGuard', () => {
  let guard: LoginAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
