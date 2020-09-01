import { ICollectionStore } from '../state.models';
import * as collectionActions from '../actions/collection.actions';
import { createReducer, ActionReducer, on, Action } from '@ngrx/store';

const initialState: ICollectionStore = {
    collection: []
};

const reducer: ActionReducer<ICollectionStore> = createReducer(
    initialState,
    on(
        collectionActions.pushToCollection,
        (store, { items }) => ({ collection: [...store.collection, ...items] })
    ),
    on(
        collectionActions.setNewCollection,
        (_, { items }) => ({ collection: items })
    )
);

export function collectionReducer(state: ICollectionStore, action: Action): ICollectionStore {
    return reducer(state, action);
}
