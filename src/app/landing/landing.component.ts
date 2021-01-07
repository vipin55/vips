import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RouterAction from '../shared/route-actions';

import { Observable } from 'rxjs';
import {
  getAuthenticatedUser,
  State
} from '../store/reducers/root-reducers';

// models
import { Login } from '../core/models/login';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public login: Observable<Login | any>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.login = this.store.select(getAuthenticatedUser) || {};
  }
}
