import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IFilterSettings, filters } from 'src/app/models/filter-settings.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {

  @Output() public setFilterSettings: EventEmitter<IFilterSettings> = new EventEmitter();
  @Input() public filterSettings: IFilterSettings;
  public filterDate: string = filters.date;
  public filterView: string = filters.view;

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

  public changeKeyWord(keyWord: string): void {
    if (!keyWord.trim()) { return; }
    const newSettings: IFilterSettings = { ...this.filterSettings, keyWord: keyWord.trim() };
    this.setFilterSettings.emit(newSettings);
  }

}
