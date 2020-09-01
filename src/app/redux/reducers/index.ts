import { State } from '../state.models';
import { ActionReducerMap } from '@ngrx/store';
import { collectionReducer } from './collection.reducer';
import { userReducer } from './user.reducer';

export const reducers: ActionReducerMap<State> = {
    userStore: userReducer,
    collectionStore: collectionReducer
};
