import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private duration: number = 2000;

  constructor(private snackBar: MatSnackBar) { }

  public open(msg: string): void {
    this.snackBar.open(msg, 'close', {
      duration: this.duration
    });
  }
}
