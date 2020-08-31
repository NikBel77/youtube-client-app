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

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let location: Location;
  let router: Router;

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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
