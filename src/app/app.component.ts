import { Component } from '@angular/core';
import tempData from './temporaryData';
import { IItem } from './models/search-item.model';
import { IResponce } from './models/search-response.model';
import { IFilterSettings, filters } from './models/filter-settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'youtube-client-app';
  public isFilterBlockVisible: boolean = true;
  public youtubeResponce: IResponce = tempData;
  public items: IItem[] = tempData.items;
  public filterSettings: IFilterSettings = {
    keyWord: '',
    isReverse: false,
    filterBy: filters.date,
  };

  public toggleFilterBlock(): void {
    this.isFilterBlockVisible = !this.isFilterBlockVisible;
  }

  public handleNewFilterSettings(settings: IFilterSettings): void {
    this.filterSettings = settings;
  }
}
