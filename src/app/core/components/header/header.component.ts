import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // true for dev, change on fasle when build app
  public isFilterBlockVisible: boolean = true;

  public activeUserName: User | null = null;

  constructor(private userServise: UserService, private router: Router) {}

  public ngOnInit(): void {
    this.userServise.getUserObservable()
      .subscribe(newUser => {
        this.activeUserName = newUser;
      });
  }

  public logOut(): void {
    this.userServise.logOut();
    this.router.navigate(['auth']);
  }

  public goToAuth(): void {
    this.router.navigate(['auth']);
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }

}
