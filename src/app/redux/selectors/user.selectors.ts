import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IUserStore, State } from '../state.models';
import { User } from '../../shared/models/user.model';

const selectUsers: MemoizedSelector<State, IUserStore> = createFeatureSelector('userStore');

export const getActiveUser: MemoizedSelector<State, User> = createSelector(
    selectUsers,
    ({ activeUser }) => activeUser
);

export const isLogin: MemoizedSelector<State, boolean> = createSelector(
    selectUsers,
    (userStore) => !!userStore.activeUser
);
