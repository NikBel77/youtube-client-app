import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICustomItem } from 'src/app/shared/models/сustom-item.model';
import { MAX_TITLE_LEN, PLACEHOLDER } from '../../../constants/common';

@Component({
  selector: 'app-custom-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-item.component.html',
  styleUrls: ['./custom-item.component.scss']
})
export class CustomItemComponent implements OnInit {

  @Input() public item: ICustomItem;
  @Output() public goToDetail
    : EventEmitter<{ id: string, isCustom: boolean }>
    = new EventEmitter<{ id: string, isCustom: boolean }>();

  public title: string;

  constructor() { }

  public ngOnInit(): void {
    this.title = this.checkTitle(this.item?.snippet?.title);
  }

  public checkTitle(title: string): string | undefined {
    if (!title) { return; }
    if (title.length > MAX_TITLE_LEN) {
      return title.slice(0, MAX_TITLE_LEN) + '...';
    }
    return title;
  }

  public errorHandle(event: ErrorEvent): void {
    const img: HTMLImageElement = event.target as HTMLImageElement;
    img.src = PLACEHOLDER;
  }

}
