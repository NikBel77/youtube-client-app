import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import paths from '../constants/router.paths';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: paths.REGISTER, component: RegisterComponent }
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
export class AuthRoutingModule { }
