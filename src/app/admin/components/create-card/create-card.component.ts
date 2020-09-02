import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICustomItem, ICustomSnippet } from 'src/app/shared/models/сustom-item.model';
import { pushCustomItem } from '../../../redux/actions/collection.actions';

class CustomItem implements ICustomItem {
  public id: string;
  public snippet: ICustomSnippet;
  constructor(
    title: string,
    desc: string,
    imageUrl: string,
    link: string
  ) {
    this.snippet = {
      description: desc,
      publishedAt: new Date().toDateString(),
      thumbnail: imageUrl,
      title: title,
      link: link
    }
    this.id = Date.now() + '';
  }
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  constructor(private store: Store) { }

  public ngOnInit(): void {
  }

  public createCustomItem(
    title: string,
    desc: string,
    imageUrl: string,
    link: string
  ): void {
    const item: ICustomItem = new CustomItem(title, desc, imageUrl, link);
    this.store.dispatch(pushCustomItem({ item }))
  }

}
