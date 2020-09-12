import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let fakeSnakBar: { open: void } = jasmine.createSpyObj(['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: fakeSnakBar }
      ]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open should call snack bar open method', () => {
    service.open('message');
    expect(fakeSnakBar.open).toHaveBeenCalled();
    expect(fakeSnakBar.open).toHaveBeenCalledWith('message', 'close', {
      duration: 2000
    });
  });
});
