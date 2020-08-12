import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null = null;

  constructor() { }

  private getUsersFromLocalStorage(): User[] | null {
    if(!window.localStorage.length) return null

    const usersFromLS: string = window.localStorage.getItem('users');
    if(!usersFromLS) return null;
    return JSON.parse(usersFromLS);
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

    this.user = currentUser;
    return true
  }

  public isLogin(): boolean { 
    return !!this.user;
  }

}
