import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { setActiveUser } from '../../redux/actions/user.actions';

import sha256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store: Store) {
    this.tryLoginFromSession();
  }

  private encode = (msg: string): string => sha256(msg).toString();

  private getUsersFromLocalStorage(): User[] | null {
    if (!window.localStorage.length) { return null; }

    const usersFromLS: string = window.localStorage.getItem('users');
    if (!usersFromLS) { return null; }
    return JSON.parse(usersFromLS);
  }

  private saveSession(user: User): void {
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  private tryLoginFromSession(): boolean {
    if (!window.sessionStorage.length) { return false; }
    const user: User = JSON.parse(window.sessionStorage.getItem('user'));
    if (!user.name || !user.password) { return false; }

    const users: User[] = this.getUsersFromLocalStorage();
    const activeUser: User | undefined = users.find(({ name, password }) => {
      return name === user.name && password === user.password;
    });
    if (activeUser) {
      this.store.dispatch(setActiveUser({ user: activeUser }));
      return true;
    }
    return false;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.store.dispatch(setActiveUser({ user: null }));
  }

  public saveUserToLocalStorage(name: string, email: string, psw: string): boolean {
    if (!name || !email || !psw) { return false; }

    const user: User = new User(name, email, this.encode(psw));
    const users: User[] | null = this.getUsersFromLocalStorage();

    if (!users) {
      window.localStorage.setItem('users', JSON.stringify([user]));
      return true;
    } else {
      if (!!users.find(userData => userData.name === name)) {
        return false;
      }
      users.push(user);
      window.localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
  }

  public loginUser(name: string, password: string): User | null {
    const users: User[] = this.getUsersFromLocalStorage();
    if (!users) { return null; }

    const currentUser: User | undefined = users.find((user) => user.name === name);

    if (!currentUser) { return null; }
    if (currentUser.password !== this.encode(password)) { return null; }

    this.saveSession(currentUser);
    this.store.dispatch(setActiveUser({ user: currentUser }));
    return currentUser;
  }

}
