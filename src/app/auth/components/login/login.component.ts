import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private loginService: LoginService) { }

  public handleLogin(name: string, pasword: string): void {
    const user: User | null = this.loginService.tryLogin(name, pasword);
  }

}
