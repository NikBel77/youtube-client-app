import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IFilterSettings, filtersMap, IFilters, filters } from 'src/app/models/filter-settings.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {

  @Output() public setFilterSettings: EventEmitter<IFilterSettings> = new EventEmitter();
  @Input() public filterSettings: IFilterSettings;
  public filtersMap: IFilters = filtersMap;

  constructor() { }

  public changeFilter(filterBy: filters): void {
    let newSettings: IFilterSettings;
    if (this.filterSettings.filterBy === filterBy) {
      newSettings = { ...this.filterSettings, filterBy, isReverse: !this.filterSettings.isReverse };
    } else {
      newSettings = { ...this.filterSettings, filterBy, isReverse: false };
    }
    this.setFilterSettings.emit(newSettings);
  }

  public changeKeyWord(element: HTMLInputElement): void {
    if(!element) return;

    const keyWord: string = element.value.trim();
    element.value = '';
    element.placeholder = keyWord;
    
    const newSettings: IFilterSettings = { ...this.filterSettings, keyWord };
    this.setFilterSettings.emit(newSettings);
  }

}
