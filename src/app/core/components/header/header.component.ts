import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // true for dev, change on fasle when build app
  public isFilterBlockVisible: boolean = true;

  constructor() { }

}
