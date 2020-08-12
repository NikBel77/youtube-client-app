import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private encode(psw: string): string {
    return SHA256(psw).toString();
  }

  public loginAs(name: string, password: string): void {

  }

}
