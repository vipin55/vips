import { routerReducer } from '@ngrx/router-store';
import { createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as fromUserLogin from '../login.reducer';

export interface State {
  [fromUserLogin.userLoginFeatureKey]: fromUserLogin.State;
}

export const reducer = {
  [fromUserLogin.userLoginFeatureKey]: fromUserLogin.reducer,
  router: routerReducer
};

export const getUsersState = (state: State) => state[fromUserLogin.userLoginFeatureKey];
export const getAuthenticatedUser = createSelector(getUsersState, state => state.user);
export const getAuthenticationError = createSelector(getUsersState, state => state.error);
export const isAuthenticated = createSelector(getUsersState, state => state.authenticated);
export const isAuthenticatedLoaded = createSelector(getUsersState, state => state.loaded);
export const isAuthenticationLoading = createSelector(getUsersState, state => state.loading);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
