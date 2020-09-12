import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { warningType, borderColors, IBorderColors } from '../models/warning.border.model';

@Directive({
  selector: '[appWarningBorder]'
})
export class WarningBorderDirective {

  private colors: IBorderColors = borderColors;

  @Input('appWarningBorder') public type: warningType;

  constructor(private element: ElementRef) { }

  private checkByType(value: string): string {
    if (!value.trim()) { return this.colors.empty; }

    switch (this.type) {
      case 'EMAIL': {
        if (this.checkMail(value)) {
          return this.colors.allowed;
        } else {
          return this.colors.warning;
        }
      }
      case 'PSW': {
        if (this.checkPassword(value)) {
          return this.colors.allowed;
        } else {
          return this.colors.warning;
        }
      }
      case 'LOGIN': {
        if (this.checkUser(value)) {
          return this.colors.allowed;
        } else {
          return this.colors.warning;
        }
      }
      default: return this.colors.empty;
    }
  }

  private checkMail(email: string): boolean {
    const mailRegExpTest: RegExp = /\S+@\S+\.\S+/;
    return mailRegExpTest.test(email);
  }

  private checkUser(user: string): boolean {
    const regExpOnlyString: RegExp = /^[a-zA-Z]+$/;
    return regExpOnlyString.test(user);
  }

  private checkPassword(psw: string): boolean {
    if (psw.length < 6) { return false; }
    return true;
  }

  @HostListener('input') public onInput(): void {
    const value: string = this.element.nativeElement.value;
    const color: string = this.checkByType(value);

    this.element.nativeElement.style.borderColor = color;
  }

}
