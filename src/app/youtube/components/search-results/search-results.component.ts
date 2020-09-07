import { Component, OnInit } from '@angular/core';
import { IItem } from '../../../shared/models/search-item.model';
import { CardsCollectionService } from '../../../core/services/cards-collection.service';
import { IFilterSettings } from '../../../shared/models/filter-settings.model';
import { FilterSettingsService } from 'src/app/core/services/filter-settings.service';

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
    private filterSettingsService: FilterSettingsService
  ) { }

  public ngOnInit(): void {
    this.items = this.cardsCollectionService.getCards();
    this.filterSettingsService.getFilterSettingsObservable()
      .subscribe((filterSettings) => this.filterSettings = filterSettings);
  }

}
