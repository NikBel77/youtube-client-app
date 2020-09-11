import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../app-routing.module';
import { SnackBarService } from '../../shared/services/snack-bar.service';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';
import { User } from 'src/app/shared/models/user.model';

describe('LoginService', () => {
  let service: LoginService;
  let location: Location;
  let router: Router;
  let fakeComponent: object = {
    open: () => {}
  };
  let store: MockStore;

  let initialState: State = {
    userStore: { activeUser: null },
    collectionStore: {
      items: [],
      customItems: []
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        LoginService,
        provideMockStore({ initialState }),
        { provide: SnackBarService, useValue: fakeComponent }
      ]
    });
    service = TestBed.inject(LoginService);
    store = TestBed.inject(MockStore);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    window.localStorage.clear();
    window.sessionStorage.clear();
   });
  
  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retun null with incorrect name and psw', () => {
    const isLogin: User | null = service.tryLogin('any name', '1234');
    expect(isLogin).toBeNull();
  });
  
  it('tryRegister should return User', () => {
    const user : User = new User('name', 'mail', 'psw')
    const isLogin: User | null = service.tryRegister(user);
    expect(isLogin).toEqual(user);
  });
});
