import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { YoutubeApiService } from './youtube-api.service';

describe('YoutubeApiService', () => {
  let service: YoutubeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeApiService]
    });
    service = TestBed.get(YoutubeApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
