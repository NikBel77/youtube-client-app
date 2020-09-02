import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICustomItem } from 'src/app/shared/models/сustom-item.model';

@Component({
  selector: 'app-custom-item',
  templateUrl: './custom-item.component.html',
  styleUrls: ['./custom-item.component.scss']
})
export class CustomItemComponent implements OnInit {
  private MAX_TITLE_LEN: number = 70;

  @Input() public item: ICustomItem;
  @Output() public goToDetail: EventEmitter<string> = new EventEmitter<string>();

  public title: string;

  constructor() { }

  public ngOnInit(): void {
    this.title = this.checkTitle(this.item.snippet.title);
  }

  public checkTitle(title: string): string | undefined {
    if (!title) { return; }
    if (title.length > this.MAX_TITLE_LEN) {
      return title.slice(0, this.MAX_TITLE_LEN) + '...';
    }
    return title;
  }
}

