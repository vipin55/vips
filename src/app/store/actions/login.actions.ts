import { Action } from '@ngrx/store';
import { Login } from '../../core/models/login';

export enum AuthActionTypes {
  AUTHENTICATE = '[Auth] Authenticate',
  AUTHENTICATE_ERROR = '[Auth] Authentication error',
  AUTHENTICATE_SUCCESS = '[Auth] Authentication success',
  AUTHENTICATED = '[Auth] Authenticated',
  AUTHENTICATED_ERROR = '[Auth] Authenticated error',
  AUTHENTICATED_SUCCESS = '[Auth] Authenticated success'
}

export class AuthenticateAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATE;

  constructor(public payload: { email: string, password: string }) { }
}

export class AuthenticatedAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATED;
  constructor(public payload?: { token?: string }) { }
}

export class AuthenticatedSuccessAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATED_SUCCESS;
  constructor(public payload: { authenticated: boolean, login: Login }) { }
}

export class AuthenticatedErrorAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATED_ERROR;
  constructor(public payload?: any) { }
}

export class AuthenticationErrorAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATE_ERROR;
  constructor(public payload?: any) { }
}

export class AuthenticationSuccessAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATE_SUCCESS;
  constructor(public payload: { login: Login }) { }
}

export type UserLoginActions = AuthenticateAction 
  | AuthenticatedAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction;
