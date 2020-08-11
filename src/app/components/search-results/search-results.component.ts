import { Component, OnInit } from '@angular/core';
import { IItem } from '../../models/search-item.model';
import { CardsColectionService } from '../../services/cards-colection.service';
import { IFilterSettings } from '../../models/filter-settings.model';
import { FilterSettingsService } from 'src/app/services/filter-settings.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public items: IItem[];

  public filterSettings: IFilterSettings;

  constructor(
    private cardsColectionService: CardsColectionService,
    private filterSettingsService: FilterSettingsService
  ) { }

  public ngOnInit(): void {
    this.items = this.cardsColectionService.getCards();
    this.filterSettingsService.getFilterSettingsObservable()
      .subscribe((filterSettings) => this.filterSettings = filterSettings);
  }

}
