
import { ErrorHandler, NgModule } from '@angular/core';

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
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { MatSidenavModule } from "@angular/material/sidenav";
import { ToastrModule } from "ngx-toastr";
import { ImageSelectorComponent } from './shared/image-selector/image-selector.component';
import { EntriesService } from './stores/portfolio/api/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PortfolioFormComponent } from './portfolio/portfolio-form/portfolio-form.component';
import { AppErrorHandler } from './common/app-error-handler';
import { AbsoluteUrlPipe } from './pipes/url.pipe';



@NgModule({
  declarations: [
    AppComponent,
    PortfolioListComponent,
    PortfolioDetailsComponent,
    SpinnerComponent,
    ImageSelectorComponent,
    NotFoundComponent,
    PortfolioFormComponent,

    //Pipes
    SummaryPipe,
    AbsoluteUrlPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    ToastrModule.forRoot({ preventDuplicates: true }),

    MatSidenavModule,

    MatButtonModule,
    FlexLayoutModule,
    HttpClientModule,

    // AppRoutingModule,
    RouterModule.forRoot(routes),



  ],
  providers: [
    EntriesService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'hello-world';
}
