import { Component, OnInit } from '@angular/core';
import { IItem } from '../../../shared/models/search-item.model';
import { CardsCollectionService } from '../../../core/services/cards-collection.service';
import { IFilterSettings } from '../../../shared/models/filter-settings.model';
import { FilterSettingsService } from 'src/app/core/services/filter-settings.service';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public items: IItem[];

  public filterSettings: IFilterSettings;

  constructor(
    private cardsCollectionService: CardsCollectionService,
    private filterSettingsService: FilterSettingsService,
    private youtubeApiService: YoutubeApiService,
  ) { }

  public ngOnInit(): void {
    this.filterSettingsService.getFilterSettingsObservable()
      .subscribe((filterSettings) => this.filterSettings = filterSettings);

    this.cardsCollectionService.getCardsStream()
      .subscribe(items => this.items = items);
  }

  public loadMore(): void {
    this.youtubeApiService.loadMoreStream$.next();
  }

}
