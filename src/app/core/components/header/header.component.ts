import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, filter, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import paths from '../../../constants/router.paths';
import { setNewCollection } from '../../../redux/actions/collection.actions';
import { getActiveUser } from '../../../redux/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { IItem } from 'src/app/shared/models/search-item.model';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  private typingClass: string = 'search__input_typing';

  @ViewChild('mainInput') public mainInput: ElementRef<HTMLInputElement>;

  public isFilterBlockVisible: boolean = false;
  public activeUser: User | null = null;
  public isSpinnerShown: boolean = false;

  constructor(
    private userServise: UserService,
    private router: Router,
    private youtubeApiService: YoutubeApiService,
    private store: Store,
    private snackBar: SnackBarService) { }

  private handleHttpError(error: HttpErrorResponse): void {
    this.toggleSpinner(false);
    this.snackBar.open(`Fail to load from youtube: code ${error.status}`);
  }

  public ngOnInit(): void {
    this.store.select(getActiveUser)
      .subscribe(
        (user) => this.activeUser = user
      );
  }

  public ngAfterViewInit(): void {
    const input: HTMLInputElement = this.mainInput.nativeElement;

    const inputStream$: Observable<string> = new Observable((observer) => {
      input.oninput = () => observer.next(input.value);
    });

    inputStream$
      .pipe(
        tap(() => this.toggleTypingClass(true)),
        debounceTime(700),
        tap(() => this.toggleTypingClass(false)),
        filter(value => !!value.trim()),
        distinctUntilChanged(),
        tap(() => this.toggleSpinner(true)),
        switchMap(query => this.youtubeApiService.fetchVideosByQuery(query)
          .pipe(
            catchError(error => {
              this.handleHttpError(error);
              return [];
            })
          )),
        tap(() => this.toggleSpinner(false))
      )
      .subscribe(
        (items: IItem[]) => {
          if (items.length) {
            this.store.dispatch(setNewCollection({ items }));
          }
        }
      );

    this.mainInput.nativeElement.onfocus = () => {
      if (this.router.url !== '/youtube') {
        this.goToHome();
      }
    };
  }

  public toggleTypingClass(isTyping: boolean): void {
    const input: HTMLInputElement = this.mainInput.nativeElement;
    const typingClass: string = this.typingClass;

    if (isTyping && !input.classList.contains(typingClass)) {
      input.classList.add(typingClass);
    } else if (!isTyping && input.classList.contains(typingClass)) {
      input.classList.remove(typingClass);
    }
  }

  public toggleSpinner(shouldBeVisible: boolean): void {
    this.isSpinnerShown = shouldBeVisible;
  }

  public logOut(): void {
    this.userServise.logOut();
    this.router.navigate([paths.AUTH_PAGE]);
  }

  public goToAuth(): void {
    this.router.navigate([paths.AUTH_PAGE]);
  }

  public goToHome(): void {
    this.router.navigate([paths.MAIN_PAGE]);
  }

}
