import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioDetailsComponent } from './portfolio/portfolio-details/portfolio-details.component';
import { PortfolioListComponent } from './portfolio/portfolio-grid/portfolio-grid.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PortfolioFormComponent } from './portfolio/portfolio-form/portfolio-form.component';

export const routes: Routes = [
  { path: 'portfolios/add', component: PortfolioFormComponent },
  { path: 'portfolios/:id/edit', component: PortfolioFormComponent },
  { path: 'portfolios/:id/:title', component: PortfolioDetailsComponent },
  { path: 'portfolios', component: PortfolioListComponent },
  { path: '', redirectTo: '/portfolios', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },

];
