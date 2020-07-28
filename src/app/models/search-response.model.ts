import IItem from './search-item.model'

export default interface IResponce {
    kind: string,
    etag: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number,
    },
    items: Array<IItem>,
}

