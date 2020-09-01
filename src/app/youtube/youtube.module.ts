import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './components/detail/detail.component';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { YoutubePageComponent } from './pages/youtube-page.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    StatisticsComponent,
    DetailComponent,
    YoutubePageComponent,
  ],
  imports: [
    YoutubeRoutingModule,
    MaterialModule,
    SharedModule,
    CommonModule
  ]
})
export class YoutubeModule { }
