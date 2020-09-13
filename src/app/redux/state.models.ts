import { IItem } from '../shared/models/search-item.model';
import { ICustomItem } from '../shared/models/сustom-item.model';
import { User } from '../shared/models/user.model';

export interface IUserStore {
    activeUser: User | null;
}

export interface ICollectionItem {
    item: IItem | ICustomItem;
    isCustom: boolean;
}

export interface ICollectionStore {
    items: IItem[];
    customItems: ICustomItem[];
}

export interface State {
    userStore: IUserStore;
    collectionStore: ICollectionStore;
}
