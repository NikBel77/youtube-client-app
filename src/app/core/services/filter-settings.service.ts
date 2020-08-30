import { Injectable } from '@angular/core';
import { IFilterSettings, filters, IFilters, filterMap } from '../../shared/models/filter-settings.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterSettingsService {

  private filtersMap: IFilters = filterMap;

  private filterSettings: IFilterSettings = {
    keyWord: '',
    isReverse: false,
    filterBy: this.filtersMap.empty,
  };

  private filterStream$: BehaviorSubject<IFilterSettings> = new BehaviorSubject(this.filterSettings);

  constructor() { }

  public changeFilter(filterBy: filters): void {
    let newSettings: IFilterSettings;
    if (this.filterSettings.filterBy === filterBy) {
      newSettings = { ...this.filterSettings, filterBy, isReverse: !this.filterSettings.isReverse };
    } else {
      newSettings = { ...this.filterSettings, filterBy, isReverse: false };
    }
    this.filterSettings = newSettings;
    this.filterStream$.next(newSettings);
  }

  public changeKeyWord(keyWord: string): void {
    const newSettings: IFilterSettings = { ...this.filterSettings, keyWord };
    this.filterSettings = newSettings;
    this.filterStream$.next(newSettings);
  }

  public getFilterSettingsObservable(): Observable<IFilterSettings> {
    return this.filterStream$;
  }

  public getFiltersMap(): IFilters {
    return this.filtersMap;
  }

}
