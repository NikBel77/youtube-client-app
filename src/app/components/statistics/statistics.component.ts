import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() icon: string;
  @Input() value: string;

  constructor() { }

  ngOnInit() {
    this.value = this.convertValue(this.value);
  }

  convertValue(value: string) {
    const [m, k] = [1000000, 1000];
    if(+value > m) return Math.floor(+value / m) + 'M';
    else if(+value > k) return Math.floor(+value / k) + 'K';
    return value;
  }

}
