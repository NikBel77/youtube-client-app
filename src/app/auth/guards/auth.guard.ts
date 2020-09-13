import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isLogin } from '../../redux/selectors/user.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {  }

  public canActivate(): Observable<boolean | UrlTree> {
      return  this.store.select(isLogin)
        .pipe(
          map(value => {
            return value ? value : this.router.parseUrl('auth');
          }),
          take(1)
        );
  }

}
