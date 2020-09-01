import { createAction, props, ActionCreator } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const addUser = createAction(
    'ADD_USER',
    props<{ user: User }>()
);
export const removeUser = createAction(
    'REMOVE_USER',
    props<{ user: User }>()
);
export const setActiveUser = createAction(
    'SET_ACTIVE_USER',
    props<{ user: User | null }>()
);
