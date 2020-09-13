import { IUserStore } from '../state.models';
import * as userActions from '../actions/user.actions';
import { ActionReducer, createReducer, on, Action } from '@ngrx/store';

const initialState: IUserStore = {
    activeUser: null
};

const reducer: ActionReducer<IUserStore> = createReducer(
    initialState,
    on(
        userActions.setActiveUser,
        (_, { user }) => ({ activeUser: user })
    )
);

export function userReducer(state: IUserStore, action: Action): IUserStore {
    return reducer(state, action);
}
