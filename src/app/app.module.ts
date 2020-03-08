import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { RideService } from './services/ride.service';
import { AddRideFormBuilder } from './components/add-ride/add-ride.formbuilder';
import { BookRideComponent } from './components/book-ride/book-ride.component';
import { SeachFormbuilder } from './components/book-ride/search.formbuilder';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    AddRideComponent,
    BookRideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    RideService,
    AddRideFormBuilder,
    SeachFormbuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
