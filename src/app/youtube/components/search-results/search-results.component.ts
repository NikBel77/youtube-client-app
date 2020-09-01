import { Component, OnInit } from '@angular/core';
import { IItem } from '../../../shared/models/search-item.model';
import { IFilterSettings } from '../../../shared/models/filter-settings.model';
import { FilterSettingsService } from 'src/app/core/services/filter-settings.service';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';
import { Router } from '@angular/router';
import pathes from '../../../constants/router.pathes';
import { Store } from '@ngrx/store';
import { getCollection } from '../../../redux/selectors/collection.selectors';
import { pushToCollection } from '../../../redux/actions/collection.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public items$: Observable<IItem[]>;
  public hasContent: boolean;
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

    this.items$ = this.store.select(getCollection)
      .pipe(
        tap(items => this.hasContent = !!items.length)
      )

    this.youtubeApiService.loadMoreObs$
      .subscribe((moreVideos) => {
        if(moreVideos && moreVideos.length) {
          this.store.dispatch(pushToCollection({ items: moreVideos }))
        }
        this.toggleSpinner(false);
      });
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
