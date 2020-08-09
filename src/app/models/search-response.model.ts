import { IItem } from './search-item.model'

export interface IResponce {
    kind: string,
    etag: string,
    pageInfo: IPageInfo
    items: Array<IItem>,
}

export interface IPageInfo {
    totalResults: number,
    resultsPerPage: number,
}