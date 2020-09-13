import { TestBed } from '@angular/core/testing';

import { FilterSettingsService } from './filter-settings.service';
import { Observable, Subscription } from 'rxjs';
import { IFilterSettings, filterMap } from 'src/app/shared/models/filter-settings.model';

describe('FilterSettingsService', () => {
  let service: FilterSettingsService;
  let settings$: Observable<IFilterSettings>;
  let filterSettings: IFilterSettings;
  let subscribtion: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSettingsService);

    settings$ = service.getFilterSettingsObservable();
    subscribtion = settings$.subscribe(
      (settings) => filterSettings = settings
    );
  });

  afterEach(() => {
    subscribtion.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fiter settings should be equal initial settings', () => {
    expect(filterSettings.filterBy).toBe(filterMap.empty);
    expect(filterSettings.isReverse).toBeFalse();
    expect(filterSettings.keyWord).toBe('');
  });

  it('should change key word', () => {
    service.changeKeyWord('some word');
    expect(filterSettings.keyWord).toBe('some word');
  });

  it('should change filter', () => {
    service.changeFilter(filterMap.view);
    expect(filterSettings.filterBy).toBe(filterMap.view);
  });

  it('should change direction', () => {
    service.changeFilter(filterMap.view);
    expect(filterSettings.isReverse).toBeFalse();
    service.changeFilter(filterMap.view);
    expect(filterSettings.isReverse).toBeTrue();
  });
});
