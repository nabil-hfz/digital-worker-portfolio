
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PortfolioListComponent } from './portfolio/portfolio-grid/portfolio-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SummaryPipe } from './pipes/summary.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    PortfolioListComponent,
    //Pipes
    SummaryPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    FormsModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,

    MatButtonModule,
    FlexLayoutModule,


        // AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'hello-world';
}
