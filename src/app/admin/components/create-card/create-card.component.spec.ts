import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardComponent } from './create-card.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { State } from 'src/app/redux/state.models';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;
  let store: MockStore;

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
      providers: [provideMockStore({ initialState })]
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
