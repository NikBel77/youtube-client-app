import { Injectable } from '@angular/core';
import { IVideoSearchResponce, IVideoListResponce } from 'src/app/shared/models/search-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/shared/models/search-item.model';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  private apiKey: string = 'AIzaSyCeQUgJ_q3-nIOah7mWxf7LteODbSTllgc';
  private rootUrl: string = 'https://www.googleapis.com';
  private additionalPathForSearch = '/youtube/v3/search?';
  private additionalPathForVideos = '/youtube/v3/videos?';

  constructor(private http: HttpClient) { }

  private getSearchListByQuery(query: string): Observable<IVideoSearchResponce> {
    const params: HttpParams = new HttpParams()
      .set('key', this.apiKey)
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', '15')
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

  public fetchVideosByQuery(query: string): Observable<IItem[]> {
    return this.getSearchListByQuery(query)
      .pipe(
        switchMap((responce) => this.getVideosById(this.exactIdsFromSearchList(responce))),
        map(responce => responce.items)
      );
  }
}
