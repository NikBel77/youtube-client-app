import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsCollectionService } from './services/cards-collection.service';
import { FilterSettingsService } from './services/filter-settings.service';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FilterComponent,
    NotFoundComponent
  ],
  providers: [
    CardsCollectionService,
    FilterSettingsService,
  ],
  imports: [
    MaterialModule,
    SharedModule,
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    FilterComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
