import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit{

  @Input() item: IItem;
  private MAX_TITLE_LEN = 100;

  public statisticsMap: Array<{ icon: string, value: string }>;
  public title: string;

  constructor() { }

  ngOnInit() {
    this.statisticsMap = [
      { icon: "visibility", value: this.item.statistics.viewCount },
      { icon: "thumb_up_alt", value: this.item.statistics.likeCount },
      { icon: "thumb_down_alt", value: this.item.statistics.dislikeCount },
      { icon: "mode_comment", value: this.item.statistics.commentCount },
    ];
    this.title = this.checkTitle(this.item.snippet.title);
  }

  checkTitle(title: string) {
    if(title.length > this.MAX_TITLE_LEN) {
      return title.slice(0, this.MAX_TITLE_LEN) + '...';
    }
    return title
  }

}
