import { Component, Input, OnInit } from '@angular/core';
import { IStatistics } from 'src/app/shared/models/search-item.model';
import { Statistics } from '../../models/statistics.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() public statistics: IStatistics;

  public statisticsMap: Statistics[];

  constructor() { }

  public ngOnInit(): void {

    this.statisticsMap = [];

    if (this.statistics?.viewCount) {
      this.statisticsMap
        .push(new Statistics('visibility', this.convertValue(this.statistics?.viewCount)));
    }
    if (this.statistics?.likeCount) {
      this.statisticsMap
        .push(new Statistics('thumb_up_alt', this.convertValue(this.statistics?.likeCount)));
    }
    if (this.statistics?.dislikeCount) {
      this.statisticsMap
        .push(new Statistics('thumb_down_alt', this.convertValue(this.statistics?.dislikeCount)));
    }
    if (this.statistics?.commentCount) {
      this.statisticsMap
        .push(new Statistics('mode_comment', this.convertValue(this.statistics?.commentCount)));
    }
  }

  public convertValue(value: string): string {
    const [m, k] = [1000000, 1000];
    if (+value > m) {
      return Math.floor(+value / m) + 'M';
    } else if (+value > k) {
      return Math.floor(+value / k) + 'K';
    }
    return value;
  }

}
