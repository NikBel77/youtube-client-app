import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { DetailComponent } from './detail.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../../app-routing.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';
import { Observable } from 'rxjs';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let location: Location;
  let router: Router;
  let youtubeApiServiceMock: object = createSpyObj(['apiService'], {
    getOneById: () => new Observable()
  });

  let store: MockStore;
  let initialState: State = {
    userStore: { activeUser: null },
    collectionStore: {
      items: [],
      customItems: []
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      declarations: [ DetailComponent ],
      providers: [
        { provide: YoutubeApiService, useValue: youtubeApiServiceMock},
        { provide: HttpClient, useValue: HttpClientTestingModule },
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
