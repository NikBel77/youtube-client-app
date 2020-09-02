import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { State, ICollectionStore } from '../state.models';
import { IItem } from 'src/app/shared/models/search-item.model';
import { ICustomItem } from 'src/app/shared/models/сustom-item.model';

const collectionSelector:
    MemoizedSelector<State, ICollectionStore> = createFeatureSelector('collectionStore');

export const getItems: MemoizedSelector<State, IItem[]> = createSelector(
    collectionSelector,
    ({ items }) => items
);

export const getCustomItems: MemoizedSelector<State, ICustomItem[]> = createSelector(
    collectionSelector,
    ({ customItems }) => customItems
);
