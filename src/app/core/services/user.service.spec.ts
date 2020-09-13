import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';
import { User } from 'src/app/shared/models/user.model';

describe('UserService', () => {
  let service: UserService;
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
      providers: [
        UserService,
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(UserService);
    store = TestBed.inject(MockStore);

    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if no user in localStorage', () => {
    const user: User = service.loginUser('name', '1234');
    expect(user).toBeNull();
  });

  it('should save user to LocalStorage', () => {
    const isLogin: boolean = service.saveUserToLocalStorage('name', 'mail@ya.ru', '1234');
    expect(isLogin).toBeTruthy();
  });

  it('should return user from Local storage', () => {
    const user: User = new User('name', 'mail', 'psw');
    service.saveUserToLocalStorage(user.name, user.email, user.password);
    service.logOut();
    const userFromStorage: User = service.loginUser(user.name, user.password);
    expect(user.name).toEqual(userFromStorage.name);
  });
});
