import { TestBed } from '@angular/core/testing';

import { CardsCollectionService } from './cards-collection.service';

describe('CardsColectionService', () => {
  let service: CardsCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
