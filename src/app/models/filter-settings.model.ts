export interface IFilterSettings {
    keyWord: string;
    isReverse: boolean;
    filterBy: filters;
}

export enum filters {
    view = 'VIEW',
    date = 'DATE',
}
