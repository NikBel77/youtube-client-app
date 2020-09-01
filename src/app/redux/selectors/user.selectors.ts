import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IUserStore, State } from '../state.models';
import { User } from '../../shared/models/user.model';

const selectUsers: MemoizedSelector<State, IUserStore> = createFeatureSelector('userStore');

export const getActiveUser: MemoizedSelector<State, User> = createSelector(
    selectUsers,
    (userStore) => userStore.activeUser
)

export const getAllUsers: MemoizedSelector<State, User[]> = createSelector(
    selectUsers,
    (userStore) => userStore.users
)