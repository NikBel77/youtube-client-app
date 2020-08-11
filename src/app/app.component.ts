import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'youtube-client-app';
  public isFilterBlockVisible: boolean = true;

  public toggleFilterBlock(): void {
    this.isFilterBlockVisible = !this.isFilterBlockVisible;
  }

}
