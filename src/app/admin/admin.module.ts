import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminPageComponent, CreateCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
