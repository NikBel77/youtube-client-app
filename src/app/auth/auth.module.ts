import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginService } from './services/login.service';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { WarningBorderDirective } from './directives/warning-border.directive';
import { AuthPageComponent } from './pages/auth-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WarningBorderDirective,
    AuthPageComponent
  ],
  providers: [
    LoginService,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
