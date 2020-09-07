import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorByTime]'
})
export class ColorByTimeDirective implements OnInit {

  private colors: { [key: string]: string } = {
    green: 'green',
    red: 'red',
    blue: 'blue',
  };

  @Input('appColorByTime') public time: string;

  constructor(private element: ElementRef) { }

  public ngOnInit(): void {
    const color: string = this.getColorByTime(new Date(this.time));
    this.element.nativeElement.style.borderColor = color;
  }

  public getColorByTime(time: Date): string {
    const oneMonth: number = new Date(0).setMonth(1);
    const sevenDays: number = new Date(0).setDate(7);
    const timeOffset: number = new Date().getTime() - time.getTime();

    if (timeOffset < sevenDays ) {
      return this.colors.blue;
    } else if (timeOffset < oneMonth) {
      return this.colors.green;
    } else {
      return this.colors.red;
    }
  }

}
