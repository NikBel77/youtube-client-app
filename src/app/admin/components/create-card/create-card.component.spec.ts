import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardComponent } from './create-card.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;
  let store: MockStore;
  let fakeSnakBar: object = {}

  let initialState: State = {
    userStore: { activeUser: null },
    collectionStore: {
      items: [],
      customItems: []
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCardComponent ],
      providers: [
        { provide: SnackBarService, useValue: fakeSnakBar },
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
