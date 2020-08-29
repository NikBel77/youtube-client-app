import { Component, OnInit } from '@angular/core';
import { CardsCollectionService } from '../../../core/services/cards-collection.service';
import { IItem } from 'src/app/shared/models/search-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public item: IItem;
  public id: string;
  public publishTime: Date;

  constructor(
    private cardsCollectionService: CardsCollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    let card: IItem;

    this.cardsCollectionService.getCardsStream()
      .pipe(
          map(items => items.find(item => item.id === this.id)),
          take(1)
        )
      .subscribe((value) => card = value);

    if (!card) {
      this.router.navigate(['404']);
    } else {
      this.item = card;
      this.publishTime = new Date(this.item?.snippet?.publishedAt);
    }
  }

  public goBack(): void {
    this.location.back();
  }

  public handleLoadError(img: HTMLImageElement): void {
    img.parentElement.remove();
  }

}
