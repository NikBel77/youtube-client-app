import { createAction, props, ActionCreator } from '@ngrx/store';
import { IItem } from 'src/app/shared/models/search-item.model';

export const pushToCollection:
ActionCreator<'PUSH_TO_COLLECTION', (props: {items: IItem[]}) => {items: IItem[]}> = createAction(
    'PUSH_TO_COLLECTION',
    props<{ items: IItem[] }>()
);
export const setNewCollection:
ActionCreator<'SET_NEW_COLLECTION', (props: {items: IItem[]}) => {items: IItem[]}> = createAction(
    'SET_NEW_COLLECTION',
    props<{ items: IItem[] }>()
);
