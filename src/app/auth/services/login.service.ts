import { Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/user.model';

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
      this.router.navigate(['youtube']);
    }
  }

  public tryRegister(user: User): void {
    const { name, email, password } = user;
    const isRegister: boolean = this.userService.saveUserToLocalStorage(name, email, password);
    if (!isRegister) {
      this.openSnackBar(`user: ${name} has alredy registered`);
    } else {
      this.openSnackBar(`user ${name} registered`);
      this.userService.loginUser(name, password);
      this.router.navigate(['youtube']);
    }
  }
}
