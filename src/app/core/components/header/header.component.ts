import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { Observable } from 'rxjs';
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

  public ngOnInit(): void {
    this.userServise.getUserStream()
      .subscribe(newUser => {
        this.activeUserName = newUser;
      });
  }

  public ngAfterViewInit(): void {
    const delayMS: number = 700;
    const input: HTMLInputElement = this.mainInput.nativeElement;

    const inputStream$: Observable<string> = new Observable((observer) => {
      input.oninput = () => observer.next(input.value);
    });

    inputStream$
      .pipe(
        filter(value => !!value.trim()),
        debounceTime(delayMS),
        distinctUntilChanged(),
        tap(() => console.log('loading')),
        switchMap(query => this.youtubeApiService.fetchVideosByQuery(query)
          .pipe(
            catchError(error => {
              this.handleHttpError(error)
              return [];
            })
          )),
        tap(() => console.log('loading complite'))
      )
      .subscribe(
        (items) => {
          if(items.length) {
            this.cardsCollectionService.setNewCardsStore(items)
          }
        }
      );
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage: string = `fail to load from youtube: code ${error.status}`;

    this.snackBar.open(errorMessage, 'close', {
      duration: 5000
    })
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
