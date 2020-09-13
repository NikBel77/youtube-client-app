import { FilterCardsPipe } from './filter-cards.pipe';
import { IFilterSettings } from '../models/filter-settings.model';
import { ICollectionItem } from 'src/app/redux/state.models';

describe('FilterCardsPipe', () => {
  let filterSettings: IFilterSettings;
  let pipe: FilterCardsPipe;
  beforeEach(() => {
    filterSettings = {
      filterBy: 'NONE',
      isReverse: false,
      keyWord: ''
    };
    pipe = new FilterCardsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter by key word', () => {
    const cards: ICollectionItem[] = [
      { item: { snippet: { title: 'title1', description: 'description1' } } } as ICollectionItem,
      { item: { snippet: { title: 'title2', description: 'description2' } } } as ICollectionItem,
      { item: { snippet: { title: 'title3', description: 'description3' } } } as ICollectionItem,
    ];
    filterSettings.keyWord = 'title1';
    const filtered: ICollectionItem[] = pipe.transform(cards, filterSettings);

    expect(filtered).toEqual([cards[0]]);
  });

  it('should do nothing with initial settings', () => {
    const cards: ICollectionItem[] = [
      { item: { snippet: { title: 'title1', description: 'description1' } } } as ICollectionItem,
      { item: { snippet: { title: 'title2', description: 'description2' } } } as ICollectionItem,
      { item: { snippet: { title: 'title3', description: 'description3' } } } as ICollectionItem,
    ];
    const filtered: ICollectionItem[] = pipe.transform(cards, filterSettings);

    expect(filtered).toEqual(cards);
  });

  it('should sort by time', () => {
    const cards: ICollectionItem[] = [
      { item: { snippet: { publishedAt: new Date(30).toDateString() } } } as ICollectionItem,
      { item: { snippet: { publishedAt: new Date(10).toDateString() } } } as ICollectionItem,
      { item: { snippet: { publishedAt: new Date(20).toDateString() } } } as ICollectionItem,
    ];
    filterSettings.filterBy = 'DATE';
    const filtered: ICollectionItem[] = pipe.transform(cards, filterSettings);

    expect(filtered).toEqual([cards[1], cards[2], cards[0]]);
  });

  it('should reverse sort by time', () => {
    const cards: ICollectionItem[] = [
      { item: { snippet: { publishedAt: new Date(30).toDateString() } } } as ICollectionItem,
      { item: { snippet: { publishedAt: new Date(10).toDateString() } } } as ICollectionItem,
      { item: { snippet: { publishedAt: new Date(20).toDateString() } } } as ICollectionItem,
    ];
    filterSettings.filterBy = 'DATE';
    filterSettings.isReverse = true;
    const filtered: ICollectionItem[] = pipe.transform(cards, filterSettings);

    expect(filtered).toEqual([cards[0], cards[2], cards[1]]);
  });

  it('should sort by view', () => {
    const cards: ICollectionItem[] = [
      { item: {}, isCustom: true } as ICollectionItem,
      { item: { statistics: { viewCount: '50' } }, isCustom: false } as ICollectionItem,
      { item: { statistics: { viewCount: '20'} }, isCustom: false } as ICollectionItem,
      { item: { statistics: { viewCount: '100' } }, isCustom: false } as ICollectionItem,
    ];
    filterSettings.filterBy = 'VIEW';
    const filtered: ICollectionItem[] = pipe.transform(cards, filterSettings);

    expect(filtered).toEqual([cards[3], cards[1], cards[2], cards[0]]);
  });

});
