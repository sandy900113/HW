import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

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
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    Main,
    MovieDetails,
    SeatDetails,
    PersonalInfo,
    WorkResult,
    Check,
    CheckResult,
    BackOrigin,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,   
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],

  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
