import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private userService: UserService) { }

  public register(name: string, email: string, psw: string): boolean {
    return this.userService.saveUserToLocalStorage(name, email, psw);
  }
}
