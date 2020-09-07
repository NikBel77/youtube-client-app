import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../app-routing.module';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('LoginService', () => {
  let service: LoginService;
  let location: Location;
  let router: Router;
  let fakeComponent: object = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      providers: [LoginService, { provide: MatSnackBar, useValue: fakeComponent }]
    });
    service = TestBed.inject(LoginService);

    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
