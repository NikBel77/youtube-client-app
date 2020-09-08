import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { YoutubeApiService } from './youtube-api.service';
import { HttpClient } from '@angular/common/http';
import { IVideoListResponce } from 'src/app/shared/models/search-response.model';
import { IItem } from 'src/app/shared/models/search-item.model';

describe('YoutubeApiService', () => {
  let service: YoutubeApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeApiService]
    });
    service = TestBed.inject(YoutubeApiService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchVideoByQuery', () => {
    service.fetchVideosByQuery('query')
      .subscribe(
        (res) => expect(res).toEqual([{ id: 'someData' } as IItem])
      );

    const req: TestRequest = httpMock
      .expectOne(
        'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=40&q=query'
      );
    expect(req.request.method).toBe('GET');
    req.flush({ items: [{ id: { videoId: 'someId' } }] });

    const sreq: TestRequest = httpMock
      .expectOne('https://www.googleapis.com/youtube/v3/videos?id=someId&part=snippet,statistics');
    sreq.flush({ items: [{ id: 'someData' }] });
  });

  it('getOneById', () => {
    service.getOneById('id')
      .subscribe(
        (res) => expect(res).toEqual({} as IVideoListResponce)
      );

    const req: TestRequest = httpMock
      .expectOne('https://www.googleapis.com/youtube/v3/videos?id=id&part=snippet,statistics');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('tryToLoadMoreVideo return null with initial params', () => {
    service.tryToLoadMoreVideo()
      .subscribe(
        (res) => expect(res).toEqual(null)
      );
  });
});
