import { Component } from '@angular/core';
import { FilterSettingsService } from 'src/app/core/services/filter-settings.service';
import { IFilters, filters, filterMap } from 'src/app/shared/models/filter-settings.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  public filtersMap: IFilters = filterMap;

  constructor(private filterSettingsService: FilterSettingsService) { }

  public setFilter(filter: filters): void {
    this.filterSettingsService.changeFilter(filter);
  }

  public setKeyWord(input: HTMLInputElement): void {
    const keyWord: string = input.value.trim().toLocaleLowerCase();
    input.placeholder = keyWord;
    input.value = '';

    this.filterSettingsService.changeKeyWord(keyWord);
  }

}
