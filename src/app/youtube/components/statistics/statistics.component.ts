import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() public icon: string;
  @Input() public value: string;

  constructor() { }

  public ngOnInit(): void {
    this.value = this.convertValue(this.value);
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
