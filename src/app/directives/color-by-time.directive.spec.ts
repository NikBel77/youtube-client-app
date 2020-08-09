import { ColorByTimeDirective } from './color-by-time.directive';
import { ElementRef } from '@angular/core';

describe('ColorByTimeDirective', () => {
  it('should create an instance', () => {
    const directive = new ColorByTimeDirective(new ElementRef('div'));
    expect(directive).toBeTruthy();
  });
});
