import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICustomItem, CustomItem } from 'src/app/shared/models/сustom-item.model';
import { pushCustomItem } from '../../../redux/actions/collection.actions';

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
