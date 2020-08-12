import { Injectable } from '@angular/core';
import { IItem } from '../../shared/models/search-item.model';
import { IResponce } from '../../shared/models/search-response.model';
import tempData from '../../temporaryData';

@Injectable({
  providedIn: 'root'
})
export class CardsCollectionService {

  private responce: IResponce = tempData;

  private cards: IItem[] = this.responce.items;

  constructor() { }

  public getCards(): IItem[] {
      return this.cards;
  }

}
