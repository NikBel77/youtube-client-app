import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/search-item.model';
import { IFilterSettings } from '../models/filter-settings.model';
import { ICollectionItem } from 'src/app/redux/state.models';

@Pipe({
  name: 'filterCards'
})
export class FilterCardsPipe implements PipeTransform {

  private sortByKeyWord(cards: ICollectionItem[], keyWord: string): ICollectionItem[] {
    if (!keyWord.trim()) { return cards; }
    const lowerKeyWord: string = keyWord.trim().toLocaleLowerCase();

    return cards.filter(({ item }) => {

      function isIncludes(str: string): boolean {
        return str.toLocaleLowerCase().includes(lowerKeyWord);
      }

      const onCheck: string[] = [
        item.snippet.title,
        item.snippet.description,
      ];

      return onCheck.some(isIncludes);
    });
  }

  private filterByDate(cards: ICollectionItem[], isReverse: boolean): ICollectionItem[] {
    const sortedCards: ICollectionItem[] = cards;
    if (!isReverse) {
      return sortedCards.sort((prev, next) => {
        return new Date(next.item.snippet.publishedAt).getTime()
          - new Date(prev.item.snippet.publishedAt).getTime();
      });
    } else {
      return sortedCards.sort((prev, next) => {
        return new Date(prev.item.snippet.publishedAt).getTime()
          - new Date(next.item.snippet.publishedAt).getTime();
      });
    }
  }

  private fiterByViews(cards: ICollectionItem[], isReverse: boolean): ICollectionItem[] {
    let sortedCards: ICollectionItem[];
    let customItems: ICollectionItem[] = cards.filter(item => item.isCustom);
    let youtubeItems: IItem[] = cards.filter(item => !item.isCustom).map(item => item.item as IItem);
    if (!isReverse) {
      youtubeItems = youtubeItems.sort((prev, next) => {
        return (+next.statistics.viewCount) - (+prev.statistics.viewCount);
      });
    } else {
      youtubeItems = youtubeItems.sort((prev, next) => {
        return (+prev.statistics.viewCount) - (+next.statistics.viewCount);
      });
    }

    sortedCards = youtubeItems.map(item => ({ item, isCustom: false }));
    return [...sortedCards, ...customItems];
  }

  public transform(cards: ICollectionItem[], settings: IFilterSettings): ICollectionItem[] {
    let filteredCards: ICollectionItem[];

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
