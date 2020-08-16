import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../app-routing.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
    });
    guard = TestBed.inject(AuthGuard);

    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
