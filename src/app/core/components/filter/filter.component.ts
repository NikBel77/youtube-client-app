import { Component, OnInit } from '@angular/core';
import { FilterSettingsService } from 'src/app/core/services/filter-settings.service';
import { IFilters, filters, filterMap, IFilterSettings } from 'src/app/shared/models/filter-settings.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filtersMap: IFilters = filterMap;
  public actualFilterSettings: IFilterSettings;

  constructor(private filterSettingsService: FilterSettingsService) { }

  public ngOnInit(): void {
    this.filterSettingsService.getFilterSettingsObservable()
      .subscribe((filterSettings) => this.actualFilterSettings = filterSettings);
  }

  public setFilter(filter: filters): void {
    this.filterSettingsService.changeFilter(filter);
  }

  public getCurrentArrowPos(filter: filters): string {
    if (this.actualFilterSettings.filterBy === filter) {
      return this.actualFilterSettings.isReverse ? 'arrow_drop_up' : 'arrow_drop_down';
    } else {
      return 'arrow_right';
    }
  }

  public setKeyWord(input: HTMLInputElement): void {
    const keyWord: string = input.value.trim().toLocaleLowerCase();
    input.placeholder = keyWord;
    input.value = '';

    this.filterSettingsService.changeKeyWord(keyWord);
  }

}
