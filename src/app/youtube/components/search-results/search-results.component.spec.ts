import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterCardsPipe } from '../../../shared/pipes/filter-cards.pipe';
import { SearchResultsComponent } from './search-results.component';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../../app-routing.module';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';


describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let location: Location;
  let router: Router;
  let store: MockStore;

  let initialState: State = {
    userStore: { activeUser: null },
    collectionStore: { collection: [] },
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      declarations: [
        SearchResultsComponent,
        FilterCardsPipe
      ],
      providers: [
        YoutubeApiService,
        { provide: HttpClient, useValue: HttpClientTestingModule },
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
