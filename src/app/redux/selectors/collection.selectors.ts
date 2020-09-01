import { createSelector, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { State, ICollectionStore } from '../state.models';
import { IItem } from '../../shared/models/search-item.model';

const collectionSelector:
    MemoizedSelector<State, ICollectionStore> = createFeatureSelector('collectionStore');

export const getCollection: MemoizedSelector<State, IItem[]> = createSelector(
    collectionSelector,
    ({ collection }) => collection
);
