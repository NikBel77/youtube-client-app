import { ColorByTimeDirective } from './color-by-time.directive';
import { ElementRef } from '@angular/core';
import { colors } from '../models/color-by-time.model';

describe('ColorByTimeDirective', () => {
  let directive: ColorByTimeDirective;

  beforeEach(() => {
    directive = new ColorByTimeDirective(new ElementRef('dit'));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('colorByTime should return color depends on time', () => {
    const actualColor: string = directive.getColorByTime(new Date());
    const weekColor: string = directive.getColorByTime(new Date(Date.now() - new Date(0).setDate(10)));
    const monthColor: string = directive.getColorByTime(new Date(Date.now() - new Date(0).setMonth(1)));

    expect(actualColor).toBe(colors.blue);
    expect(weekColor).toBe(colors.green);
    expect(monthColor).toBe(colors.red);
  });
});
