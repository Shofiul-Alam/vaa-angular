import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/guard/auth.guard';
import {DriverService} from "./services/driver.service";
import {ValidationService} from "./services/formValidation.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
      AuthGuard,
      DriverService,
      ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
