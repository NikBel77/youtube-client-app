import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFilterSettings } from '../../../shared/models/filter-settings.model';
import { FilterSettingsService } from 'src/app/core/services/filter-settings.service';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';
import { Router } from '@angular/router';
import pathes from '../../../constants/router.paths';
import { Store } from '@ngrx/store';
import { getCollection } from '../../../redux/selectors/collection.selectors';
import { pushToCollection } from '../../../redux/actions/collection.actions';
import { Observable, Subscription } from 'rxjs';
import { ICollectionItem } from 'src/app/redux/state.models';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  public collection$: Observable<ICollectionItem[]>;
  public subscriptions: Subscription[] = [];
  public hasContent: boolean;
  public filterSettings: IFilterSettings;
  public isSpinnerShown: boolean = false;

  set subscription(sbc: Subscription) { this.subscriptions.push(sbc); }

  constructor(
    private filterSettingsService: FilterSettingsService,
    private youtubeApiService: YoutubeApiService,
    private router: Router,
    private store: Store
  ) { }

  public ngOnInit(): void {
    this.collection$ = this.store.select(getCollection);

    this.subscription = this.collection$
        .subscribe(items => {
          this.hasContent = !!items.length;
        });

    this.subscription = this.filterSettingsService.getFilterSettingsObservable()
      .subscribe((filterSettings) => this.filterSettings = filterSettings);

    this.subscription = this.youtubeApiService.loadMoreObs$
      .subscribe((moreVideos) => {
        if (moreVideos && moreVideos.length) {
          this.store.dispatch(pushToCollection({ items: moreVideos }));
        }
        this.toggleSpinner(false);
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sbc => sbc.unsubscribe());
  }

  public loadMore(): void {
    this.toggleSpinner(true);
    this.youtubeApiService.loadMoreEmmiter.next();
  }

  public goToAdmin(): void {
    this.router.navigate([pathes.ADMIN]);
  }

  public toggleSpinner(showSpinner: boolean): void {
    this.isSpinnerShown = showSpinner;
  }

  public goToDetail(params: { id: string, isCustom: boolean }): void {
    const { id, isCustom } = params;
    this.router.navigate([pathes.MAIN_PAGE, pathes.DETAIL, id, isCustom]);
  }

}
