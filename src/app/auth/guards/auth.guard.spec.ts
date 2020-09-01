import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../app-routing.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let location: Location;
  let router: Router;
  let store: MockStore;

  let initialState: State = {
    userStore: { activeUser: null },
    collectionStore: { collection: [] },
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        AuthGuard,
        provideMockStore({ initialState }),
      ],
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
