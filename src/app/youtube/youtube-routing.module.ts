import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { DetailComponent } from './components/detail/detail.component';
import { YoutubePageComponent } from './pages/youtube-page.component';
import paths from '../constants/router.paths';

const routes: Routes = [
  {
    path: '',
    component: YoutubePageComponent,
    children: [
      { path: '', component: SearchResultsComponent, pathMatch: 'full' },
      { path: paths.DETAIL + '/:id', component: DetailComponent, pathMatch: 'full' },
      { path: paths.DETAIL + '/' + paths.CUSTOM + '/:id', component: DetailComponent }
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
