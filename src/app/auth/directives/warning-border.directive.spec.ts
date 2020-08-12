import { WarningBorderDirective } from './warning-border.directive';
import { ElementRef } from '@angular/core';

describe('WarningBorderDirective', () => {
  it('should create an instance', () => {
    const directive: WarningBorderDirective = new WarningBorderDirective(new ElementRef('div'));
    expect(directive).toBeTruthy();
  });
});
