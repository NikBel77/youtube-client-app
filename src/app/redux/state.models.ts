import { IItem } from '../shared/models/search-item.model';
import { User } from '../shared/models/user.model';

export interface IUserStore {
    users: User[];
    activeUser: User | null;
}

export interface ICollectionStore {
    collection: IItem[];
}

export interface State {
    userStore: IUserStore;
    collectionStore: ICollectionStore;
}
