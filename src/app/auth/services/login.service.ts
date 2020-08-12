import { Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService: UserService, private router: Router) { }

  public tryLogin(name: string, psw: string): boolean {
    const isLogin: boolean = this.userService.loginUser(name, psw);
    if(isLogin) this.router.navigate(['home']);
    return isLogin;
  }
}
