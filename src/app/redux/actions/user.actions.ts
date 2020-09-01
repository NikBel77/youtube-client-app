import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const setActiveUser = createAction(
    'SET_ACTIVE_USER',
    props<{ user: User | null }>()
);
