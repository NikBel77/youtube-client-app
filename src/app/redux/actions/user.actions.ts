import { createAction, props, ActionCreator } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import { TypedAction } from '@ngrx/store/src/models';

export const setActiveUser
    : ActionCreator<'SET_ACTIVE_USER',
        (props: { user: User | null }) => { user: User | null } & TypedAction<'SET_ACTIVE_USER'>>
    = createAction(
        'SET_ACTIVE_USER',
        props<{ user: User | null }>()
    );
