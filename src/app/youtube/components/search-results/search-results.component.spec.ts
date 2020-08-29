import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterCardsPipe } from '../../../shared/pipes/filter-cards.pipe';
import { SearchResultsComponent } from './search-results.component';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
