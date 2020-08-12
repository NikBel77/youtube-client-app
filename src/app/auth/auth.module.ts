import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    SingInComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    LoginService,
    RegisterService
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    SingInComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
