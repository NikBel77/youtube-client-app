import { createAction, props } from '@ngrx/store';
import { IItem } from 'src/app/shared/models/search-item.model';
import { ICustomItem } from 'src/app/shared/models/сustom-item.model';

export const pushToCollection = createAction(
    'ADD_ITEMS',
    props<{ items: IItem[] }>()
);
export const setNewCollection = createAction(
    'SET_NEW_COLLECTION',
    props<{ items: IItem[] }>()
);
export const pushCustomItem = createAction(
    'ADD_CUSTOM_ITEMS',
    props<{ item: ICustomItem }>()
);
