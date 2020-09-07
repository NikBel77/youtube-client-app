export interface IFilterSettings {
    keyWord: string;
    isReverse: boolean;
    filterBy: filters;
}

export interface IFilters { [key: string]: filters; }

export type filters = ('NONE' |'VIEW' | 'DATE');

export const filtersMap: IFilters = {
    date: 'DATE',
    view: 'VIEW',
    empty: 'NONE',
};
