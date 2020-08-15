import { Component, OnInit } from '@angular/core';
import { CardsCollectionService } from '../../../core/services/cards-collection.service';
import { IItem } from 'src/app/shared/models/search-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Statistics } from '../../models/statistics.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public item: IItem;
  public id: string;
  public publishTime: Date;
  public statisticsMap: Statistics[];

  constructor(
    private cardsCollectionService: CardsCollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    const item: IItem = this.cardsCollectionService.findById(this.id);
    if(!item) {
      this.router.navigate(['404']);
    } else {
      this.item = item;
      this.publishTime = new Date(this.item.snippet.publishedAt);
      
      this.statisticsMap = [
        new Statistics('visibility', this.item?.statistics?.viewCount),
        new Statistics('thumb_up_alt', this.item?.statistics?.likeCount),
        new Statistics('thumb_down_alt', this.item?.statistics?.dislikeCount),
        new Statistics('mode_comment', this.item?.statistics?.commentCount),
      ];
    }
  }

  public goBack(): void {
    this.location.back();
  }

}
