import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { DetailComponent } from './components/detail/detail.component';
import { YoutubePageComponent } from './pages/youtube-page.component';
import pathes from '../constants/router.pathes';

const routes: Routes = [
  {
    path: '',
    component: YoutubePageComponent,
    children: [
      { path: '', component: SearchResultsComponent, pathMatch: 'full' },
      { path: pathes.DETAIL, component: DetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class YoutubeRoutingModule { }
