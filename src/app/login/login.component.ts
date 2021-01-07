import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as RouterAction from '../shared/route-actions';

// rxjs
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';

// actions
import { AuthenticateAction  } from '../store/actions/login.actions';

// reducers
import {
  getAuthenticationError,
  isAuthenticated,
  State
} from '../store/reducers/root-reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  title = 'User Login';
  loginForm: FormGroup;
  submitted = false;
  public error: Observable<string | any>;
  private alive = true;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

    this.error = this.store.select(getAuthenticationError);
    console.log(this.error);
    this.store.select(isAuthenticated)
      .takeWhile(() => this.alive)
      .subscribe(value => {
        this.store.dispatch(new RouterAction.Go({ path: '/landing' }));
      });
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const email: string = this.loginForm?.get('email')?.value;
      const password: string = this.loginForm?.get('password')?.value;
      // trim values
      email.trim();
      password.trim();

      // set payload
      const payload = {
        email,
        password
      };

      this.store.dispatch(new AuthenticateAction(payload));
    } else {
      return;
    }

  }
  public ngOnDestroy(): void {
    this.alive = false;
  }

}
