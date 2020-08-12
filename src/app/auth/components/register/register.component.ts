import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  public handleRegister(firstName: string, lastName: string, email: string, pasword: string) {
    this.registerService.register(firstName, lastName, pasword, email);
  }

}
