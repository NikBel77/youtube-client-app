import { Component, Input } from '@angular/core';
import { IItem } from '../../models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  @Input() public items: IItem[];

  constructor() { }

}
