import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public loginAs(name: string, password: string) {
    console.log('login: ' + name + 'pass' + password);
  }
}
