import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/shared/models/search-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
  private MAX_TITLE_LEN: number = 100;

  @Input() public item: IItem;

  public title: string;

  constructor(private router: Router) { }

  public ngOnInit(): void {
    if (!this.item) { return; }

    this.title = this.checkTitle(this.item?.snippet?.title);
  }

  public checkTitle(title: string): string {
    if (title.length > this.MAX_TITLE_LEN) {
      return title.slice(0, this.MAX_TITLE_LEN) + '...';
    }
    return title;
  }

  public goToDetail(): void {
    this.router.navigate(['detail', this.item.id]);
  }

}
