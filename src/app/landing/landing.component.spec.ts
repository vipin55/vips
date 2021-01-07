import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LandingComponent } from './landing.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/root-reducers';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import { Store, StateObservable, ActionsSubject, ReducerManager, ReducerManagerDispatcher } from '@ngrx/store';
class MockCustomStore {
  select(): any {
    return Observable.of(false);
  }
}
describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [
        StoreModule.forRoot(reducer)
      ],
      providers: [
        { provide: Store, useClass: MockCustomStore },
        StateObservable, ActionsSubject, ReducerManager, ReducerManagerDispatcher

      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LandingComponent);

    component = fixture.componentInstance;
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create an instance of ngoninit', () => {
    component.ngOnInit();
  });


});
