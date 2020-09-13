import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './components/detail/detail.component';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { YoutubePageComponent } from './pages/youtube-page.component';
import { CustomItemComponent } from './components/custom-item/custom-item.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    StatisticsComponent,
    DetailComponent,
    YoutubePageComponent,
    CustomItemComponent,
  ],
  imports: [
    YoutubeRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class YoutubeModule { }
