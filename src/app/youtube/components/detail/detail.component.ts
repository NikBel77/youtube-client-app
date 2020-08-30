import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/shared/models/search-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';

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
    private youtubeApiService: YoutubeApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.youtubeApiService.getOneById(this.id)
      .subscribe(
        (responce => {
          if (!responce?.items[0]) { this.router.navigate(['404']); }
          this.item = responce?.items[0];
          this.publishTime = new Date(this.item?.snippet?.publishedAt);
        }),
        () => this.router.navigate(['404'])
      );
  }

  public goBack(): void {
    this.location.back();
  }

  public handleLoadError(img: HTMLImageElement): void {
    img.parentElement.remove();
  }

}
