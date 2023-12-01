
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PortfolioListComponent } from './portfolio/portfolio-grid/portfolio-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SummaryPipe } from './pipes/summary.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import {  MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { PortfolioDetailsComponent } from './portfolio/portfolio-details/portfolio-details.component';
import { routes } from './app.routes';
import { SpinnerComponent } from './shared/spinner.component';

import { MatSidenavModule } from "@angular/material/sidenav";
import { ToastrModule } from "ngx-toastr";



@NgModule({
  declarations: [
    AppComponent,
    PortfolioListComponent,
    PortfolioDetailsComponent,
    SpinnerComponent,
 
 

    //Pipes
    SummaryPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    ToastrModule.forRoot({ preventDuplicates: true }),

    ReactiveFormsModule,
    MatSidenavModule,

    MatButtonModule,
    FlexLayoutModule,


    // AppRoutingModule,
    RouterModule.forRoot(routes),



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'hello-world';
}
