import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

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
    if(isAllowed) {
      const isReg: boolean = this.registerService.register(name, email, psw);

      //dev
      console.log(isReg);
    }
  }

}
