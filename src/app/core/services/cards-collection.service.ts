import { Injectable } from '@angular/core';
import { IItem } from '../../shared/models/search-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsCollectionService {

  private cardsStream$: BehaviorSubject<IItem[]> = new BehaviorSubject([]);

  constructor() { }

  public addNewItemsToStore(cards: IItem[]): void {
    this.cardsStream$.next(cards);
  }

  public getCardsStream(): BehaviorSubject<IItem[]> {
      return this.cardsStream$;
  }

  public pushItemsToStore(items: IItem[]): void {
    const newItemsCollection: IItem[] = [...this.cardsStream$.value, ...items];
    this.cardsStream$.next(newItemsCollection);
  }

}
