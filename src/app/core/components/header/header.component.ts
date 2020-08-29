import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, filter, catchError } from 'rxjs/operators';
import { CardsCollectionService } from '../../services/cards-collection.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('mainInput') public mainInput: ElementRef<HTMLInputElement>;

  // true for dev, change on fasle when build app
  public isFilterBlockVisible: boolean = true;

  public activeUserName: User | null = null;

  constructor(
    private userServise: UserService,
    private router: Router,
    private youtubeApiService: YoutubeApiService,
    private cardsCollectionService: CardsCollectionService,
    private snackBar: MatSnackBar) {}

  private handleHttpError(error: HttpErrorResponse): void {
    this.snackBar.open(`fail to load from youtube: code ${error.status}`, 'close', {
      duration: 5000
    });
  }

  public ngOnInit(): void {
    this.userServise.getUserStream()
      .subscribe(newUser => {
        this.activeUserName = newUser;
      });
  }

  public ngAfterViewInit(): void {
    const input: HTMLInputElement = this.mainInput.nativeElement;

    const inputStream$: Observable<string> = new Observable((observer) => {
      input.oninput = () => observer.next(input.value);
    });

    inputStream$
      .pipe(
        filter(value => !!value.trim()),
        debounceTime(700),
        distinctUntilChanged(),
        tap(() => console.log('loading')),
        switchMap(query => this.youtubeApiService.fetchVideosByQuery(query)
          .pipe(
            catchError(error => {
              this.handleHttpError(error);
              return [];
            })
          )),
        tap(() => console.log('loading complite'))
      )
      .subscribe(
        (items) => {
          if (items.length) {
            this.cardsCollectionService.addNewItemsToStore(items);
          }
        }
      );
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
