import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ColorByTimeDirective } from './directives/color-by-time.directive';
import { FilterCardsPipe } from './pipes/filter-cards.pipe';
import { httpInterceptProviders } from './http-iterceptors/index';
import { SnackBarService } from '../shared/services/snack-bar.service';

@NgModule({
  declarations: [
    ColorByTimeDirective,
    FilterCardsPipe,
  ],
  imports: [
    MaterialModule,
    CommonModule,
  ],
  providers: [
    SnackBarService,
    httpInterceptProviders,
  ],
  exports: [
    MaterialModule,
    ColorByTimeDirective,
    FilterCardsPipe
  ]
})
export class SharedModule { }
