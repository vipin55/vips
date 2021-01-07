import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { reducer, metaReducers } from './store/reducers/root-reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; import { StoreRouterConnectingModule, routerReducer, RouterState } from '@ngrx/router-store';

import { UserService } from './core/services/user.service';
import { AuthenticationGuard } from './shared/authentication.guard';
import { EffectsModule } from '@ngrx/effects';
import { UserLoginEffects } from './store/effects/login.effects';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    StoreModule.forRoot(reducer),
    StoreRouterConnectingModule.forRoot(),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserLoginEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    })
  ],
  providers: [
    AuthenticationGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
