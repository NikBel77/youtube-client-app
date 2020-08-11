import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
  private MAX_TITLE_LEN: number = 100;

  @Input() public item: IItem;

  public statisticsMap: Array<{ icon: string, value: string }>;
  public title: string;
  // below is for debug
  public debugDate: string;
  // -----------------

  constructor() { }

  public ngOnInit(): void {
    if (!this.item) { return; }
    this.statisticsMap = [
      { icon: 'visibility', value: this.item?.statistics?.viewCount },
      { icon: 'thumb_up_alt', value: this.item?.statistics?.likeCount },
      { icon: 'thumb_down_alt', value: this.item?.statistics?.dislikeCount },
      { icon: 'mode_comment', value: this.item?.statistics?.commentCount },
    ];
    this.title = this.checkTitle(this.item?.snippet?.title);

    this.debugDate = new Date(this.item.snippet.publishedAt).toLocaleDateString();
  }

  public checkTitle(title: string): string {
    if (title.length > this.MAX_TITLE_LEN) {
      return title.slice(0, this.MAX_TITLE_LEN) + '...';
    }
    return title;
  }

}
