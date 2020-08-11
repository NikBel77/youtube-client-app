import { TestBed } from '@angular/core/testing';

import { CardsColectionService } from './cards-colection.service';

describe('CardsColectionService', () => {
  let service: CardsColectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsColectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
