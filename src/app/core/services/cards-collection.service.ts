import { Injectable } from '@angular/core';
import { IItem } from '../../shared/models/search-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsCollectionService {

  private cardsStream$: BehaviorSubject<IItem[]> = new BehaviorSubject([]);

  constructor() { }

  public setNewCardsStore(cards: IItem[]): void {
    this.cardsStream$.next(cards);
  }

  public getCardsStream(): BehaviorSubject<IItem[]> {
      return this.cardsStream$;
  }

}
