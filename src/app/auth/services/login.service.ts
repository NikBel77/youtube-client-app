import { Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public openSnackBar(massage: string): void {
    this.snackBar.open(massage, '', {
      duration: 2000
    });
  }

  public tryLogin(name: string, psw: string): void {
    const isLogin: boolean = this.userService.loginUser(name, psw);
    if (!isLogin) {
      this.openSnackBar('incorrect name or password');
    } else {
      this.openSnackBar(`loign as ${name}`);
      this.router.navigate(['home']);
    }
  }

  public register(name: string, email: string, psw: string): void {
    const isRegister: boolean = this.userService.saveUserToLocalStorage(name, email, psw);
    if (!isRegister) {
      this.openSnackBar(`user: ${name} has alredy registered`);
    } else {
      this.openSnackBar(`user ${name} registered`);
      this.userService.loginUser(name, psw);
      this.router.navigate(['home']);
    }
  }
}
