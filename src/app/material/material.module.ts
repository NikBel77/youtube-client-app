import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materialComponents: Array<object> = [
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
})

export class MaterialModule { }
