import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  public register(
    firstName: string,
    lastName: string,
    password: string,
    email: string
    ) {
    console.log(`register: ${firstName} ${lastName} mail: ${email}, pas: ${password}`);
  }
}
