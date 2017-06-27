import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { Main } from './main.component';
import { MovieDetails } from './movie-details.component';
import { SeatDetails } from './seat-details.component';
import { PersonalInfo } from './Personal-Info.component';
import { WorkResult } from './Work-Result.component';
import { Check } from './Check.component';
import { CheckResult } from './Check-Result.component';
import { BackOrigin } from './back-origin.component';
import { DataService } from './data.service';

const routes: Routes = [
  {path: 'main',                 component: Main},
  {path: 'movie-details',        component: MovieDetails},
  {path: 'movie-details/:id',    component: MovieDetails },
  {path: 'seat/:id/:id2',        component: SeatDetails },
  {path: 'book',                 component: PersonalInfo },
  {path: 'book-result',          component: WorkResult },
  {path: 'check',                component: Check },
  {path: 'check-result',         component: CheckResult },
  {path: '',                     redirectTo: 'main',           pathMatch: 'full'},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/