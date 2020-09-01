import { createAction, props, ActionCreator } from '@ngrx/store';
import { IItem } from 'src/app/shared/models/search-item.model';

export const pushToCollection = createAction(
    'PUSH_TO_COLLECTION',
    props<{ items: IItem[] }>()
);
export const setNewCollection = createAction(
    'SET_NEW_COLLECTION',
    props<{ items: IItem[] }>()
);
