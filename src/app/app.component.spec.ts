import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterCardsPipe } from './pipes/filter-cards.pipe';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        FilterCardsPipe
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy();
  });
});
