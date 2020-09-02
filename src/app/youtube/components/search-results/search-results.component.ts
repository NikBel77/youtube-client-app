import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFilterSettings } from '../../../shared/models/filter-settings.model';
import { FilterSettingsService } from 'src/app/core/services/filter-settings.service';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';
import { Router } from '@angular/router';
import pathes from '../../../constants/router.paths';
import { Store } from '@ngrx/store';
import { getCustomItems, getItems } from '../../../redux/selectors/collection.selectors';
import { pushToCollection } from '../../../redux/actions/collection.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IItem } from 'src/app/shared/models/search-item.model';
import { ICustomItem } from 'src/app/shared/models/сustom-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public items$: Observable<IItem[]>;
  public customItems$: Observable<ICustomItem[]>;
  public hasContent: boolean;
  public hasCustomItems: boolean;
  public filterSettings: IFilterSettings;
  public isSpinnerShown: boolean = false;

  constructor(
    private filterSettingsService: FilterSettingsService,
    private youtubeApiService: YoutubeApiService,
    private router: Router,
    private store: Store
  ) { }

  public ngOnInit(): void {
    this.filterSettingsService.getFilterSettingsObservable()
      .subscribe((filterSettings) => this.filterSettings = filterSettings);

    this.items$ = this.store.select(getItems)
      .pipe(
        tap(items => this.hasContent = !!items.length)
      );

    this.customItems$ = this.store.select(getCustomItems)
      .pipe(
        tap(items => this.hasCustomItems = !!items.length)
      )

    this.youtubeApiService.loadMoreObs$
      .subscribe((moreVideos) => {
        if (moreVideos && moreVideos.length) {
          this.store.dispatch(pushToCollection({ items: moreVideos }));
        }
        this.toggleSpinner(false);
      });
  }

  public ngOnDestroy(): void {

  }

  public loadMore(): void {
    this.toggleSpinner(true);
    this.youtubeApiService.loadMoreEmmiter.next();
  }

  public toggleSpinner(showSpinner: boolean): void {
    this.isSpinnerShown = showSpinner;
  }

  public goToDetail(id: string): void {
    this.router.navigate([pathes.MAIN_PAGE, 'detail', id]);
  }

}
