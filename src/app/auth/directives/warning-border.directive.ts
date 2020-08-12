import { Directive, Input, HostListener, ElementRef } from '@angular/core';

type warningType = ('EMAIL' | 'PSW' | 'LOGIN');

@Directive({
  selector: '[appWarningBorder]'
})
export class WarningBorderDirective {

  private colors: { [key: string]: string } = {
    allowed: 'green',
    warning: 'red',
    danger: 'orange',
    empty: '#00000000'
  };

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
        if (this.checkPassword(value) >= 3) {
          return this.colors.allowed;
        } else if (this.checkPassword(value) >= 2) {
          return this.colors.danger;
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

  private checkPassword(psw: string): number {
    let count: number;
    count = 0;

    if (psw.length < 6) { return count; }
    count += /[a-z]/.test(psw) ? 1 : 0;
    count += /[A-Z]/.test(psw) ? 1 : 0;
    count += /\d/.test(psw) ? 1 : 0;

    return count;
  }

  @HostListener('input') public onInput(): void {
    const value: string = this.element.nativeElement.value;
    const color: string = this.checkByType(value);

    this.element.nativeElement.style.borderColor = color;
  }

}
