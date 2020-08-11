import { FilterCardsPipe } from './filter-cards.pipe';

describe('FilterCardsPipe', () => {
  it('create an instance', () => {
    const pipe: FilterCardsPipe = new FilterCardsPipe();
    expect(pipe).toBeTruthy();
  });
});
