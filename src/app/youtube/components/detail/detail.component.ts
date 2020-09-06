import { Component, OnInit, OnDestroy } from '@angular/core';
import { IItem, IStatistics } from 'src/app/shared/models/search-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import paths from '../../../constants/router.paths';
import { YoutubeApiService } from 'src/app/core/services/youtube-api.service';
import { Store } from '@ngrx/store';
import { getCustomItems } from '../../../redux/selectors/collection.selectors';
import { ICustomItem } from 'src/app/shared/models/сustom-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public item: IItem | ICustomItem;
  public id: string;
  public publishTime: Date;
  public isCustom: boolean;
  public thumbnailUrl:  string;
  public statistics: IStatistics | null = null;

  constructor(
    private youtubeApiService: YoutubeApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store,
  ) { }

  private extractImageUrl(item: IItem): string {
    if (item.snippet.thumbnails.maxres) { return item.snippet.thumbnails.maxres.url; }
    if (item.snippet.thumbnails.standard) { return item.snippet.thumbnails.standard.url; }
    if (item.snippet.thumbnails.default) { return item.snippet.thumbnails.default.url; }
    return '';
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isCustom = this.route.snapshot.params.isCustom === 'true';

    if (this.isCustom) {

      this.subscription = this.store.select(getCustomItems)
        .subscribe(
          (items) => {
            const customItem: ICustomItem = items.find(item => item.id === this.id);
            if (!customItem) { return this.router.navigate([paths.NOT_FOUND]); }

            this.item = customItem;
            this.publishTime = new Date(this.item.snippet.publishedAt);
            this.thumbnailUrl = this.item.snippet.thumbnail;
          },
          () => this.router.navigate([paths.NOT_FOUND])
        );

    } else {

      this.subscription = this.youtubeApiService.getOneById(this.id)
        .subscribe(
          (responce => {
            if (!responce?.items[0]) { return this.router.navigate([paths.NOT_FOUND]); }
            this.item = responce?.items[0];
            this.publishTime = new Date(this.item?.snippet?.publishedAt);
            this.thumbnailUrl = this.extractImageUrl(this.item);
            this.statistics = this.item.statistics;
          }),
          () => this.router.navigate([paths.NOT_FOUND])
        );

    }

  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }

  public handleLoadError(img: HTMLImageElement): void {
    img.parentElement.remove();
  }

}
