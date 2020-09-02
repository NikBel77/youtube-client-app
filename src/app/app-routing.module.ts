import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';

import paths from './constants/router.paths';

export const routes: Routes = [
  { path: '', redirectTo: paths.MAIN_PAGE, pathMatch: 'full'},
  {
    path: paths.MAIN_PAGE,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/youtube/youtube.module').then(m => m.YoutubeModule),
  },
  {
    path: paths.AUTH_PAGE,
    loadChildren: () =>
      import('src/app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: paths.ADMIN,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/admin/admin.module').then(m => m.AdminModule),
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
