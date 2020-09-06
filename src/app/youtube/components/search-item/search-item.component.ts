import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IItem } from 'src/app/shared/models/search-item.model';
import { MAX_TITLE_LEN } from '../../../constants/common';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() public item: IItem;
  @Output() public goToDetail
    :EventEmitter<{ id: string, isCustom: boolean }>
    = new EventEmitter<{ id: string, isCustom: boolean }>();

  public title: string;
  public thumbnail: string;

  constructor() { }

  public ngOnInit(): void {
    this.title = this.checkTitle(this.item.snippet.title);
    this.thumbnail = this.extractImageUrl(this.item);
  }

  public checkTitle(title: string): string | undefined {
    if (!title) { return; }
    if (title.length > MAX_TITLE_LEN) {
      return title.slice(0, MAX_TITLE_LEN) + '...';
    }
    return title;
  }

  private extractImageUrl(item: IItem): string {
    if(item.snippet.thumbnails.maxres) return item.snippet.thumbnails.maxres.url;
    if(item.snippet.thumbnails.standard) return item.snippet.thumbnails.standard.url;
    if(item.snippet.thumbnails.default) return item.snippet.thumbnails.default.url;
    return '';
  }

}
