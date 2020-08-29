import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {  }

  public canActivate(): Observable<boolean | UrlTree> {
      const isAllowed: boolean = this.userService.isLogin();
      if (isAllowed) { return of(true); }

      return of(this.router.parseUrl('auth'));
  }

}
