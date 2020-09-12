import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';
import { Observable } from 'rxjs';
import { routes } from 'src/app/app-routing.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let location: Location;
  let router: Router;
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
        AuthGuard,
        provideMockStore({ initialState }),
      ],
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('can activate to return Observable', () => {
    const obs: Observable<boolean | UrlTree> = guard.canActivate();
    expect(obs).toBeInstanceOf(Observable);

    obs.subscribe(
      (value) => expect(value).toBeInstanceOf(UrlTree)
    );
  });
});
