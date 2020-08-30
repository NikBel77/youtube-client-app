import { Injectable } from '@angular/core';
import { IVideoSearchResponce, IVideoListResponce } from 'src/app/shared/models/search-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { IItem } from 'src/app/shared/models/search-item.model';
import { switchMap, map, tap, catchError, share } from 'rxjs/operators';
import { CardsCollectionService } from './cards-collection.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  private apiKey: string = 'AIzaSyCeQUgJ_q3-nIOah7mWxf7LteODbSTllgc';
  private rootUrl: string = 'https://www.googleapis.com';
  private additionalPathForSearch: string = '/youtube/v3/search?';
  private additionalPathForVideos: string = '/youtube/v3/videos?';

  private ids: string[] = [];
  private counter: number = 1;

  public loadMoreEmmiter: Subject<IItem[] | null> = new Subject();
  public loadMoreObs$: Observable<IItem[] | null> = this.loadMoreEmmiter
    .pipe(
      switchMap(() => this.tryToLoadMoreVideo().pipe(catchError(() => of(null)))),
      share(),
    );

  constructor(private http: HttpClient, private cardsCollectionService: CardsCollectionService) {
    this.loadMoreObs$
      .subscribe(
        (items) => {
          if (items) {
            this.cardsCollectionService.pushItemsToStore(items);
          }
        }
      );
  }

  private getSearchListByQuery(query: string): Observable<IVideoSearchResponce> {
    const params: HttpParams = new HttpParams()
      .set('key', this.apiKey)
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', '40')
      .set('q', query);
    return this.http
      .get<IVideoSearchResponce>(this.rootUrl + this.additionalPathForSearch, { params });
  }

  private getVideosById(idArray: string[]): Observable<IVideoListResponce> {
    const ids: string = idArray.join();
    const params: HttpParams = new HttpParams()
      .set('key', this.apiKey)
      .set('id', ids)
      .set('part', 'snippet,statistics');
    return this.http
      .get<IVideoListResponce>(this.rootUrl + this.additionalPathForVideos, { params });
  }

  private exactIdsFromSearchList(searchList: IVideoSearchResponce): string[] {
    return searchList.items.map(item => item.id.videoId);
  }

  public tryToLoadMoreVideo(): Observable<IItem[]> {
    if (!this.ids.length) { return of(null); }
    const endSlice: number = ((this.counter + 1) * 10);
    const startSlice: number = (this.counter * 10);
    if (startSlice >= this.ids.length) { return of(null); }
    this.counter++;

    if (endSlice > this.ids.length) {
      return this.getVideosById(this.ids.slice(startSlice))
        .pipe(map(responce => responce.items));
    }

    return this.getVideosById(this.ids.slice(startSlice, endSlice))
      .pipe(map(responce => responce.items));
  }

  public fetchVideosByQuery(query: string): Observable<IItem[]> {
    return this.getSearchListByQuery(query)
      .pipe(
        tap((responce) => this.ids = this.exactIdsFromSearchList(responce)),
        tap(() => this.counter = 1),
        switchMap(() => this.getVideosById(this.ids.slice(0, 10))),
        map(responce => responce.items)
      );
  }
}
