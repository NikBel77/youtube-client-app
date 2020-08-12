import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SearchResultsComponent } from './youtube/components/search-results/search-results.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { SingInComponent } from './auth/components/sing-in/sing-in.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  { path: '', component: SearchResultsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'auth',
    component: SingInComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'reg', component: RegisterComponent }
    ]
  },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
