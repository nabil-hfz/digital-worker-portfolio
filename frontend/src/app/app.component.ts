import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'digital-worker-portfolio';
  constructor(private router: Router) { }

  navigateToForm() {
    console.log('navigateToForm /portfolio-form');
    
    this.router.navigate(['/portfolio-form']);
  }
}
