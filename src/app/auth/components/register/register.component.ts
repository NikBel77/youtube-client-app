import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { allowedColor } from '../../models/warning.border.model';
import { User } from 'src/app/shared/models/user.model';

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
      .every(color => color === allowedColor);

    [name, email, psw] = elements.map(input => input.value);
    if (isAllowed) {
      this.loginService.tryRegister(new User(name, email, psw));
    } else {
      this.loginService.openSnackBar('all fields must be filled');
    }
  }

}
