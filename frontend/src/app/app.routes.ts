import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioDetailsComponent } from './portfolio/portfolio-details/portfolio-details.component';
import { PortfolioListComponent } from './portfolio/portfolio-grid/portfolio-grid.component';

export const routes: Routes = [
  
  { path: 'portfolio-list', component: PortfolioListComponent },
  { path: 'portfolio-form', component: PortfolioDetailsComponent },
  { path: '', redirectTo: '/portfolio-list', pathMatch: 'full' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

