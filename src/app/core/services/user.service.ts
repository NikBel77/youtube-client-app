import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null;

  private userSubject: BehaviorSubject<User> = new BehaviorSubject(this.user);

  constructor() {
    this.tryLoginFromSession();
  }

  private getUsersFromLocalStorage(): User[] | null {
    if(!window.localStorage.length) return null

    const usersFromLS: string = window.localStorage.getItem('users');
    if(!usersFromLS) return null;
    return JSON.parse(usersFromLS);
  }

  private saveSession(user: User): void {
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  private tryLoginFromSession(): boolean {
    if(!window.sessionStorage.length) return false;
    const user: User = JSON.parse(window.sessionStorage.getItem('user'));
    if(!user.name || !user.password) return false;

    let isLogin: boolean;
    isLogin = this.loginUser(user.name, user.password);
    return isLogin
  }

  public logOut() {
    window.sessionStorage.clear();
    this.userSubject.next(null);
    this.user = null;
  }

  public saveUserToLocalStorage(name: string, email: string, psw: string): boolean {
    if(!name || !email || !psw) return false;

    const user: User = new User(name, email, psw);
    const users: User[] | null = this.getUsersFromLocalStorage();
    
    if(!users) {
      window.localStorage.setItem('users', JSON.stringify([user]));
      return true;
    } else {
      users.push(user);
      window.localStorage.setItem('users', JSON.stringify(users));
      return true
    }
  }

  public loginUser(name: string, password: string): boolean {
    const users: User[] = this.getUsersFromLocalStorage();
    if(!users) return false;

    const currentUser = users.find((user) => user.name === name);
    if(!currentUser) return false;
    if(currentUser.password !== password) return false;

    this.saveSession(currentUser);

    this.user = currentUser;
    this.userSubject.next(currentUser);

    return true
  }

  public isLogin(): boolean { 
    return !!this.user;
  }

  public getUserObservable(): Observable<User> {
    return this.userSubject;
  }

}
