import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {

  @Input() item: IItem;

  constructor() { }

}
