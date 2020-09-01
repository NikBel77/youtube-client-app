import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../app-routing.module';
import { MatSnackBar } from '@angular/material/snack-bar';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';

describe('LoginService', () => {
  let service: LoginService;
  let location: Location;
  let router: Router;
  let fakeComponent: object = {};
  let store: MockStore;

  let initialState: State = {
    userStore: { activeUser: null },
    collectionStore: { collection: [] },
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      providers: [
        LoginService,
        provideMockStore({ initialState }),
        { provide: MatSnackBar, useValue: fakeComponent }
      ]
    });
    service = TestBed.inject(LoginService);
    store = TestBed.inject(MockStore);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
