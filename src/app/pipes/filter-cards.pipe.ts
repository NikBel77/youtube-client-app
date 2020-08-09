import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/search-item.model';
import { IFilterSettings } from '../models/filter-settings.model';

@Pipe({
  name: 'filterCards'
})
export class FilterCardsPipe implements PipeTransform {

  public transform(cards: IItem[], settings: IFilterSettings): IItem[] {
    console.log(settings);
    const filteredCards: IItem[] = cards;
    return filteredCards;
  }

}
