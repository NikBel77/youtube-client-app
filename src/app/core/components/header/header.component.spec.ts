import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from '../../../app-routing.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { YoutubeApiService } from '../../services/youtube-api.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      declarations: [ HeaderComponent ],
      providers: [ YoutubeApiService, { provide: HttpClient, useValue: HttpClientTestingModule }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
