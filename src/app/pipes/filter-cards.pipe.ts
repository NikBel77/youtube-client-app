import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/search-item.model';
import { IFilterSettings } from '../models/filter-settings.model';

@Pipe({
  name: 'filterCards'
})
export class FilterCardsPipe implements PipeTransform {

  private sortByKeyWord(cards: IItem[], keyWord: string): IItem[] {
    if (!keyWord.trim()) { return cards; }
    const lowerKeyWord: string = keyWord.trim().toLocaleLowerCase();

    return cards.filter((card) => {

      function isIncludes(str: string): boolean {
        return str.toLocaleLowerCase().includes(lowerKeyWord);
      }

      const onCheck: string[] = [
        card.snippet.title,
        card.snippet.description,
        card.snippet.channelTitle,
        ...card.snippet.tags,
      ];

      return onCheck.some(isIncludes);
    });
  }

  private filterByDate(cards: IItem[], isReverse: boolean): IItem[] {
    const sortedCards: IItem[] = cards;
    if (!isReverse) {
      return sortedCards.sort((prev, next) => {
        return new Date(next.snippet.publishedAt).getTime() - new Date(prev.snippet.publishedAt).getTime();
     });
    } else {
      return sortedCards.sort((prev, next) => {
        return new Date(prev.snippet.publishedAt).getTime() - new Date(next.snippet.publishedAt).getTime();
     });
    }
  }

  private fiterByViews(cards: IItem[], isReverse: boolean): IItem[] {
    const sortedCards: IItem[] = cards;
    if (!isReverse) {
      return sortedCards.sort((prev, next) => {
        return (+next.statistics.viewCount) - (+prev.statistics.viewCount);
     });
    } else {
      return sortedCards.sort((prev, next) => {
        return (+prev.statistics.viewCount) - (+next.statistics.viewCount);
     });
    }
  }

  public transform(cards: IItem[], settings: IFilterSettings): IItem[] {
    let filteredCards: IItem[];

    switch (settings.filterBy) {
      case 'DATE': {
        filteredCards = this.filterByDate(cards, settings.isReverse);
        break;
      }
      case 'VIEW': {
        filteredCards = this.fiterByViews(cards, settings.isReverse);
        break;
      }
      default: { filteredCards = cards; }
    }

    return this.sortByKeyWord(filteredCards, settings.keyWord);
  }

}
