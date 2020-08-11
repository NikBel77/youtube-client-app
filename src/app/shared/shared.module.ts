import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorByTimeDirective } from './directives/color-by-time.directive';
import { FilterCardsPipe } from './pipes/filter-cards.pipe';

@NgModule({
  declarations: [
    ColorByTimeDirective,
    FilterCardsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ColorByTimeDirective,
    FilterCardsPipe
  ]
})
export class SharedModule { }
