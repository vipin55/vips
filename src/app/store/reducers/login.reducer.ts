import { UserLoginActions, AuthActionTypes } from '../actions/login.actions';
import { Login } from '../../core/models/login';

export const userLoginFeatureKey = 'userLogin';

export interface State {
  authenticated: boolean;
  error?: string;
  loaded: boolean;
  loading: boolean;
  user?: Login;
}

export const initialState: State = {
  authenticated: false,
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: UserLoginActions): State {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE:
      return Object.assign({}, state, {
        error: undefined,
        loading: true
      });

    case AuthActionTypes.AUTHENTICATED_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action?.payload?.error?.message || 'Invalid email or password',
        loaded: true
      });

    case AuthActionTypes.AUTHENTICATED_SUCCESS:
      return Object.assign({}, state, {
        authenticated: action.payload.authenticated,
        loaded: true,
        login: action.payload.user
      });

    case AuthActionTypes.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action?.payload?.error?.message || 'Invalid email or password',
        loading: false
      });

    case AuthActionTypes.AUTHENTICATE_SUCCESS:
      const login: Login = action.payload.user;
      if (login === null) {
        return state;
      }

      return Object.assign({}, state, {
        authenticated: true,
        error: undefined,
        loading: false,
        login
      });

    default:
      return state;
  }
}
