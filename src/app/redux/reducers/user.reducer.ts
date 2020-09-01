import { IUserStore } from '../state.models';
import * as userActions from '../actions/user.actions';
import { ActionReducer, createReducer, on, Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

const getUserFromLS = (): User[] => {
    let users: User[] | null;
    users = JSON.parse(window.localStorage.getItem('users'));
    return users || [];
}

const initialState: IUserStore = {
    users: getUserFromLS(),
    activeUser: null
};

const reducer: ActionReducer<IUserStore> = createReducer(
    initialState,
    on(
        userActions.removeUser,
        (state, { user }) => ({
            ...state,
            users: state.users.filter(userInState => userInState.name !== user.name)
        })
    ),
    on(
        userActions.addUser,
        (state, { user }) => ({
            ...state, users: [...state.users, user]
        })
    ),
    on(
        userActions.setActiveUser,
        (state, { user }) => ({
            ...state, activeUser: user
        })
    )
);

export function userReducer(state: IUserStore, action: Action): IUserStore {
    return reducer(state, action);
}
