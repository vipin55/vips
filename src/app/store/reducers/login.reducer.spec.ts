import { reducer, initialState } from './login.reducer';
import * as UserLoginActions from '../actions/login.actions';
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from '../../core/models/login';
import { TEST_USER } from '../../core/services/user.service';

describe('UserLogin Reducer', () => {

  let login: Login = new Login();
  beforeEach(() => {
    login = TEST_USER;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducer)],
      providers: [
        { provide: Store, useClass: Store }
      ]
    })
      .compileComponents();
  });

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('AUTHENTICATE action', () => {
    it('should set loading to true', () => {
      const userData = { email: 'vips@domain.com', password: 'Vips@123' };
      const action = new UserLoginActions.AuthenticateAction(userData);
      const state = reducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(undefined);
    });
  });

  describe('AUTHENTICATE_ERROR action', () => {
    it('should return some error', () => {
      const action = new UserLoginActions.AuthenticationErrorAction();
      const state = reducer(initialState, action);
      expect(state.authenticated).toEqual(false);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual('Invalid email or password');
    });
  });

  describe('AUTHENTICATED_ERROR action', () => {
    it('should return some error', () => {
      const action = new UserLoginActions .AuthenticatedErrorAction();
      const state = reducer(initialState, action);
      expect(state.authenticated).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.error).toEqual('Invalid email or password');
    });
  });


});
