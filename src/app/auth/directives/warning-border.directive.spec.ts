import { WarningBorderDirective } from './warning-border.directive';
import { ElementRef } from '@angular/core';

describe('WarningBorderDirective', () => {
  let directive: WarningBorderDirective;

  beforeEach(() => {
    directive = new WarningBorderDirective(new ElementRef('input'));
    directive.type = 'LOGIN';
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
