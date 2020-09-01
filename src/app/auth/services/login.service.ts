import { Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/user.model';
import paths from 'src/app/constants/router.paths';

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

  public tryLogin(name: string, psw: string): User | null {
    const user: User | null = this.userService.loginUser(name, psw);
    if (!user) {
      this.openSnackBar('incorrect name or password');
      return null;
    } else {
      this.openSnackBar(`loign as ${name}`);
      this.router.navigate([paths.MAIN_PAGE]);
      return user;
    }
  }

  public tryRegister(user: User): User | null {
    const { name, email, password } = user;
    const isRegister: boolean = this.userService.saveUserToLocalStorage(name, email, password);
    if (!isRegister) {
      this.openSnackBar(`user: ${name} has alredy registered`);
      return null;
    } else {
      this.openSnackBar(`user ${name} registered`);
      this.userService.loginUser(name, password);
      this.router.navigate([paths.MAIN_PAGE]);
      return user;
    }
  }
}
