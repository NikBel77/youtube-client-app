import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public ngOnInit(): void {
  }

  public handleLogin(name: string, pasword: string): void {
    this.loginService.loginAs(name, pasword);
  }

}
