import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service';

import {
  AuthActionTypes,
  AuthenticatedErrorAction,
  AuthenticatedSuccessAction,
  AuthenticationErrorAction,
  AuthenticationSuccessAction
} from '../actions/login.actions';


@Injectable()
export class UserLoginEffects {
  constructor(private actions$: Actions, private userService: UserService, private router: Router) { }

  @Effect()
  public authenticate: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTHENTICATE),
    // .debounceTime(500)
    switchMap((payload: any) => {
      return this.userService.authenticate(payload.payload.email, payload.payload.password).pipe(
        map(login => new AuthenticationSuccessAction({ login })),
        tap(() => this.router.navigate(['/home'])),
        catchError(error => of(new AuthenticationErrorAction({ error }))));
    }));

}
