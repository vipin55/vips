import * as AuthActionTypes from './login.actions';

describe('UserLogin', () => {
  it('should create an instance', () => {
    expect(AuthActionTypes).toBeTruthy();
  });
});

describe('AuthenticateAction', () => {
  it('should create an instance', () => {
    expect(AuthActionTypes.AuthenticateAction).toBeTruthy();
  });
});

describe('AuthenticatedAction', () => {
  it('should create an instance', () => {
    expect(AuthActionTypes.AuthenticatedAction).toBeTruthy();
  });
});

describe('AuthenticatedSuccessAction', () => {
  it('should create an instance', () => {
    expect(AuthActionTypes.AuthenticatedSuccessAction).toBeTruthy();
  });
});

describe('AuthenticatedErrorAction', () => {
  it('should create an instance', () => {
    expect(AuthActionTypes.AuthenticatedErrorAction).toBeTruthy();
  });
});

describe('AuthenticationErrorAction', () => {
  it('should create an instance', () => {
    expect(AuthActionTypes.AuthenticationErrorAction).toBeTruthy();
  });
});

describe('AuthenticationSuccessAction', () => {
  it('should create an instance', () => {
    expect(AuthActionTypes.AuthenticationSuccessAction).toBeTruthy();
  });
});

describe('UserLogin actions', () => {
  it('shold create an action', () => {
    const action = new AuthActionTypes.AuthenticateAction({ email: 'vips@domain.com', password: 'Vips@123' });
    expect(action.type).toEqual('[Auth] Authenticate');
  });
});

describe('UserLogin actions', () => {
  it('shold create an action', () => {
    const action = new AuthActionTypes.AuthenticatedSuccessAction({ authenticated: true, login: { email: 'vips@domain.com', password: 'Vips@123' } });
    expect(action.type).toEqual('[Auth] Authenticated success');
  });
});
