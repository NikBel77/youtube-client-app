import { createAction, props, ActionCreator } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const addUser:
ActionCreator<'ADD_USER', (props: {user: User}) => {user: User}> = createAction(
    'ADD_USER',
    props<{ user: User }>()
);
export const removeUser:
ActionCreator<'REMOVE_USER', (props: {user: User}) => {user: User}> = createAction(
    'REMOVE_USER',
    props<{ user: User }>()
);
export const setActiveUser:
ActionCreator<'SET_ACTIVE_USER', (props: {user: User}) => {user: User}> = createAction(
    'SET_ACTIVE_USER',
    props<{ user: User | null }>()
);
