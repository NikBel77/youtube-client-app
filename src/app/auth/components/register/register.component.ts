import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public ngOnInit(): void {
  }

  public handleRegister(...elements: HTMLInputElement[]): void {
    let name: string;
    let email: string;
    let psw: string;

    const isAllowed: boolean = elements
      .map(input => input.style.borderColor)
      .every(color => color === 'green');

    [name, email, psw] = elements.map(input => input.value);
    if (isAllowed) {
      this.loginService.register(name, email, psw);
    } else {
      this.loginService.openSnackBar('all fields must be filled');
    }
  }

}
