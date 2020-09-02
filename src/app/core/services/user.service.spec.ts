import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';

describe('UserService', () => {
  let service: UserService;
  let store: MockStore;

  let initialState: State = {
    userStore: { activeUser: null },
    collectionStore: { collection: [] },
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
