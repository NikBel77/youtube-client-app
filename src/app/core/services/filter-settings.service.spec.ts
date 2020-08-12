import { TestBed } from '@angular/core/testing';

import { FilterSettingsService } from './filter-settings.service';

describe('FilterSettingsService', () => {
  let service: FilterSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
