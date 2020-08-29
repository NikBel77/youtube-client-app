import { IItem, ISearchItem } from './search-item.model';

export interface IVideoListResponce {
    kind: 'youtube#videoListResponse';
    etag: string;
    items: Array<IItem>;
}

export interface IVideoSearchResponce {
    kind: 'youtube#searchListResponse';
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: IPageInfo;
    items: Array<ISearchItem>;
}

export interface IPageInfo {
    totalResults: number;
    resultsPerPage: number;
}
