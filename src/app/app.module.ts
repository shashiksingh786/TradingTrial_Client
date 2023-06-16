import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardSymbolComponent } from './views/dashboard-symbol/dashboard-symbol.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SymbolDetailsComponent } from './views/symbol-details/symbol-details.component';
import { SplineChartsComponent } from './shared/charts/spline-charts/spline-charts.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardSymbolComponent,
    SymbolDetailsComponent,
    SplineChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
