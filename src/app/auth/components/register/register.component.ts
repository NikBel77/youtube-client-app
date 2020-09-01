import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { allowedColor } from '../../models/warning.border.model';
import { Store } from '@ngrx/store';
import { setActiveUser } from '../../../redux/actions/user.actions';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService, private store: Store) { }

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
      const user: User | null = this.loginService.tryRegister(new User(name, email, psw));
      if (user) {
        this.store.dispatch(setActiveUser({ user }));
      }
    } else {
      this.loginService.openSnackBar('all fields must be filled');
    }
  }

}
