import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { hot, cold } from 'jasmine-marbles';

import { Login } from '../../core/models/login';
import { UserLoginEffects } from './login.effects';
import { UserService, TEST_USER } from '../../core/services/user.service';
import * as userLoginAction from '../actions/login.actions';

describe('UserLoginEffects', () => {
  let actions$: Observable<any>;
  let effects: UserLoginEffects;
  const Login: Login = {
    email: 'vips@domain.com',
    password: 'Vips@123'
  };
  const error: any = { status: 401, message: '401 Unauthorized Error' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        UserLoginEffects,
        UserService,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserLoginEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should work', () => {
    const action = new userLoginAction.AuthenticateAction({
      email: 'vips@domain.com',
      password: 'Vips@123'
    });
    const completion = new userLoginAction.AuthenticationSuccessAction({ login: TEST_USER });
    actions$ = hot('a|', { a: action });
    const expected = cold('b|', { b: completion });

    expect(effects.authenticate).toBeObservable(expected);
  });
});
