import { ICollectionStore } from '../state.models';
import * as collectionActions from '../actions/collection.actions';
import { createReducer, ActionReducer, on, Action } from '@ngrx/store';

const initialState: ICollectionStore = {
    items: [],
    customItems: []
};

const reducer: ActionReducer<ICollectionStore> = createReducer(
    initialState,
    on(
        collectionActions.pushToCollection,
        (store, { items }) => ({
            ...store,
            items: [...store.items, ...items]
        })
    ),
    on(
        collectionActions.setNewCollection,
        (store, { items }) => ({
            ...store,
            items
        })
    ),
    on(
        collectionActions.pushCustomItem,
        (store, { item }) => ({
            ...store,
            customItems: [...store.customItems, item]
        })
    ),
);

export function collectionReducer(state: ICollectionStore, action: Action): ICollectionStore {
    return reducer(state, action);
}
