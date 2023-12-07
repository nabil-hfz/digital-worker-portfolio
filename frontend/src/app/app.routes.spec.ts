import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PortfolioFormComponent } from './portfolio/portfolio-form/portfolio-form.component';
import { PortfolioDetailsComponent } from './portfolio/portfolio-details/portfolio-details.component';
import { PortfolioListComponent } from './portfolio/portfolio-grid/portfolio-grid.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { routes } from './app.routes';

describe('Route tests', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ]
    });

    router = TestBed.inject(Router);
  });

  it('should route to PortfolioFormComponent for "portfolios/add"', () => {
    expect(router.config.find(r => r.path === 'portfolios/add')?.component).toBe(PortfolioFormComponent);
  });
  
  it('should route to PortfolioFormComponent for "portfolios/:id/edit"', () => {
    expect(router.config.find(r => r.path === 'portfolios/:id/edit')?.component).toBe(PortfolioFormComponent);
  });
  
  it('should route to PortfolioDetailsComponent for "portfolios/:id/:title"', () => {
    expect(router.config.find(r => r.path === 'portfolios/:id/:title')?.component).toBe(PortfolioDetailsComponent);
  });
  
  it('should route to PortfolioListComponent for "portfolios"', () => {
    expect(router.config.find(r => r.path === 'portfolios')?.component).toBe(PortfolioListComponent);
  });
  
  it('should redirect an empty path to "/portfolios"', () => {
    const route = router.config.find(r => r.path === '');
    expect(route?.redirectTo).toBe('/portfolios');
    expect(route?.pathMatch).toBe('full');
  });
  
  it('should route to NotFoundComponent for "**"', () => {
    expect(router.config.find(r => r.path === '**')?.component).toBe(NotFoundComponent);
  });
  
});
