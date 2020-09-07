import { Injectable } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { User } from 'src/app/shared/models/user.model';
import paths from 'src/app/constants/router.paths';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: SnackBarService) { }

  public openSnackBar(massage: string): void {
    this.snackBar.open(massage);
  }

  public tryLogin(name: string, psw: string): User | null {
    const user: User | null = this.userService.loginUser(name, psw);
    if (!user) {
      this.openSnackBar('Incorrect name or password');
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
      this.openSnackBar(`User: ${name} has already registered`);
      return null;
    } else {
      this.openSnackBar(`User ${name} registered`);
      this.userService.loginUser(name, password);
      this.router.navigate([paths.MAIN_PAGE]);
      return user;
    }
  }
}
