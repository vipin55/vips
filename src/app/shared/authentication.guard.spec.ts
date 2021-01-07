import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthenticationGuard } from './authentication.guard';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from '../store/reducers/root-reducers';
import * as RouterAction from './route-actions';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';
import { Router } from '@angular/router';

import { isAuthenticated, State } from '../store/reducers/root-reducers';

class MockCustomStore {
  select(): any {
    return Observable.of(false);
  }
}
describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useClass: MockCustomStore },
      { provide: Router, useValue: { navigate: () => null } },
      ],
      imports: [RouterTestingModule, StoreModule.forRoot(reducer)],
    });
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should return false if the user state is not logged in', () => {
    guard.canActivate();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
