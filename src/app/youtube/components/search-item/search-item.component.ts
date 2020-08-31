import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
  private MAX_TITLE_LEN: number = 70;

  @Input() public item: IItem;
  @Output() public goToDetail: EventEmitter<string> = new EventEmitter<string>();

  public title: string;

  constructor() { }

  public ngOnInit(): void {
    this.title = this.checkTitle(this.item?.snippet?.title);
  }

  public checkTitle(title: string): string | undefined {
    if (!title) { return; }
    if (title.length > this.MAX_TITLE_LEN) {
      return title.slice(0, this.MAX_TITLE_LEN) + '...';
    }
    return title;
  }

}
